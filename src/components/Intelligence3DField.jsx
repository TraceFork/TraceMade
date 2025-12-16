import { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { useMode } from '../context/ModeContext';
import { useIntelligence } from '../context/IntelligenceContext';
import { useBehavior } from '../context/BehaviorContext';
import * as THREE from 'three';
import neuralVertexShader from '../shaders/neural.vert';
import neuralFragmentShader from '../shaders/neural.frag';

const ParticleField = () => {
    const meshRef = useRef();
    const { getModeConfig, currentMode } = useMode();
    const { cognitiveState } = useIntelligence();
    const { gazePattern } = useBehavior();

    const config = getModeConfig();
    const particleCount = config.particles.count;

    const particles = useMemo(() => {
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);
        const velocities = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;

            positions[i3] = (Math.random() - 0.5) * config.particles.spread;
            positions[i3 + 1] = (Math.random() - 0.5) * config.particles.spread;
            positions[i3 + 2] = (Math.random() - 0.5) * config.particles.spread;

            const color = new THREE.Color(config.colors.primary);
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;

            sizes[i] = Math.random() * config.particles.size;

            velocities[i3] = (Math.random() - 0.5) * 0.01;
            velocities[i3 + 1] = (Math.random() - 0.5) * 0.01;
            velocities[i3 + 2] = (Math.random() - 0.5) * 0.01;
        }

        return { positions, colors, sizes, velocities };
    }, [particleCount, config]);

    useFrame((state, delta) => {
        if (!meshRef.current) return;

        const positions = meshRef.current.geometry.attributes.position.array;
        const velocities = particles.velocities;

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;

            positions[i3] += velocities[i3] * config.particles.speed;
            positions[i3 + 1] += velocities[i3 + 1] * config.particles.speed;
            positions[i3 + 2] += velocities[i3 + 2] * config.particles.speed;

            if (Math.abs(positions[i3]) > config.particles.spread / 2) {
                velocities[i3] *= -1;
            }
            if (Math.abs(positions[i3 + 1]) > config.particles.spread / 2) {
                velocities[i3 + 1] *= -1;
            }
            if (Math.abs(positions[i3 + 2]) > config.particles.spread / 2) {
                velocities[i3 + 2] *= -1;
            }
        }

        meshRef.current.geometry.attributes.position.needsUpdate = true;
        meshRef.current.rotation.y += delta * 0.05 * cognitiveState.flow;
    });

    return (
        <points ref={meshRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particleCount}
                    array={particles.positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={particleCount}
                    array={particles.colors}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-size"
                    count={particleCount}
                    array={particles.sizes}
                    itemSize={1}
                />
            </bufferGeometry>
            <pointsMaterial
                size={config.particles.size}
                vertexColors
                transparent
                opacity={0.8}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};

const NeuralMesh = () => {
    const meshRef = useRef();
    const { getModeConfig } = useMode();
    const { cognitiveState } = useIntelligence();

    const shaderMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            vertexShader: neuralVertexShader,
            fragmentShader: neuralFragmentShader,
            uniforms: {
                uTime: { value: 0 },
                uIntensity: { value: cognitiveState.intensity },
                uColor: { value: new THREE.Color(getModeConfig().colors.primary) }
            },
            transparent: true,
            blending: THREE.AdditiveBlending
        });
    }, [getModeConfig, cognitiveState.intensity]);

    useFrame((state, delta) => {
        if (!meshRef.current) return;
        shaderMaterial.uniforms.uTime.value += delta;
        shaderMaterial.uniforms.uIntensity.value = cognitiveState.intensity;
        meshRef.current.rotation.x += delta * 0.1;
        meshRef.current.rotation.y += delta * 0.15;
    });

    return (
        <mesh ref={meshRef} material={shaderMaterial}>
            <icosahedronGeometry args={[2, 4]} />
        </mesh>
    );
};

const CameraController = () => {
    const { camera } = useThree();
    const { getModeConfig } = useMode();
    const { gazePattern } = useBehavior();

    useFrame(() => {
        const config = getModeConfig();
        const targetPosition = new THREE.Vector3(...config.camera.position);

        camera.position.lerp(targetPosition, 0.05);
        camera.fov = THREE.MathUtils.lerp(camera.fov, config.camera.fov, 0.05);
        camera.updateProjectionMatrix();

        const offsetX = (gazePattern.x / window.innerWidth - 0.5) * 0.5;
        const offsetY = (gazePattern.y / window.innerHeight - 0.5) * 0.5;
        camera.position.x += offsetX * gazePattern.intensity * 0.1;
        camera.position.y -= offsetY * gazePattern.intensity * 0.1;
    });

    return null;
};

const Intelligence3DField = () => {
    const { visualState } = useIntelligence();

    return (
        <div className="intelligence-3d-space">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <color attach="background" args={['#000000']} />
                <fog attach="fog" args={['#000000', 5, 15]} />

                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={0.5} color="#00ffff" />
                <pointLight position={[-10, -10, -10]} intensity={0.3} color="#ff00ff" />

                <ParticleField />
                <NeuralMesh />
                <CameraController />

                <EffectComposer>
                    <Bloom
                        intensity={visualState.bloom}
                        luminanceThreshold={0.2}
                        luminanceSmoothing={0.9}
                    />
                    <Vignette
                        offset={visualState.vignette}
                        darkness={0.5}
                    />
                </EffectComposer>
            </Canvas>
        </div>
    );
};

export default Intelligence3DField;
