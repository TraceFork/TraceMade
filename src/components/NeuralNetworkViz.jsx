import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const NeuralNetworkViz = () => {
    const vizRef = useRef(null);

    useEffect(() => {
        ScrollTrigger.create({
            trigger: vizRef.current,
            start: 'top center',
            onEnter: () => {
                gsap.fromTo(
                    '.layer-column',
                    { opacity: 0, x: -100 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: 'power2.out'
                    }
                );
            }
        });
    }, []);

    return (
        <section ref={vizRef} id="neural-network-viz" className="neural-visualization-zone" data-section="neural">
            <div className="section-header">
                <h2 className="section-title">Neural Network Visualization</h2>
                <p className="section-description">Deep learning architecture in real-time</p>
            </div>
            <div className="neural-viz-container">
                <NeuralLayers />
                <NeuralConnectionsCanvas />
                <NeuralControls />
                <NeuralMetrics />
            </div>
        </section>
    );
};

const NeuralLayers = () => {
    const layers = [
        { title: 'Input Layer', size: '784 neurons', count: 28, type: 'input' },
        { title: 'Hidden Layer 1', size: '128 neurons', count: 20, type: 'hidden' },
        { title: 'Hidden Layer 2', size: '64 neurons', count: 15, type: 'hidden' },
        { title: 'Output Layer', size: '10 neurons', count: 10, type: 'output' }
    ];

    return (
        <div className="neural-layers">
            {layers.map((layer, layerIndex) => (
                <div key={layerIndex} className={`layer-column ${layer.type}-layer`}>
                    <div className="layer-header">
                        <h4 className="layer-title">{layer.title}</h4>
                        <span className="layer-size">{layer.size}</span>
                    </div>
                    <div className="layer-neurons">
                        {Array.from({ length: layer.count }).map((_, neuronIndex) => {
                            const activation = Math.random();
                            return (
                                <div
                                    key={neuronIndex}
                                    className="neuron"
                                    data-activation={activation.toFixed(1)}
                                    style={{
                                        backgroundColor: `rgba(0, 255, 255, ${activation})`,
                                        boxShadow: `0 0 ${10 * activation}px rgba(0, 255, 255, ${activation})`
                                    }}
                                ></div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

const NeuralConnectionsCanvas = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        const layerPositions = [
            { x: 150, neurons: 28 },
            { x: 400, neurons: 20 },
            { x: 650, neurons: 15 },
            { x: 900, neurons: 10 }
        ];

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < layerPositions.length - 1; i++) {
                const fromLayer = layerPositions[i];
                const toLayer = layerPositions[i + 1];

                for (let f = 0; f < fromLayer.neurons; f++) {
                    for (let t = 0; t < toLayer.neurons; t++) {
                        if (Math.random() > 0.98) {
                            const fromY = (height / (fromLayer.neurons + 1)) * (f + 1);
                            const toY = (height / (toLayer.neurons + 1)) * (t + 1);

                            const gradient = ctx.createLinearGradient(fromLayer.x, fromY, toLayer.x, toY);
                            gradient.addColorStop(0, 'rgba(0, 255, 255, 0.1)');
                            gradient.addColorStop(0.5, 'rgba(255, 0, 255, 0.2)');
                            gradient.addColorStop(1, 'rgba(0, 255, 255, 0.1)');

                            ctx.strokeStyle = gradient;
                            ctx.lineWidth = Math.random() * 2;
                            ctx.beginPath();
                            ctx.moveTo(fromLayer.x, fromY);
                            ctx.lineTo(toLayer.x, toY);
                            ctx.stroke();
                        }
                    }
                }
            }

            requestAnimationFrame(animate);
        };

        animate();
    }, []);

    return (
        <div className="neural-connections-overlay">
            <canvas ref={canvasRef} id="neural-connections-canvas" width={1200} height={800}></canvas>
        </div>
    );
};

const NeuralControls = () => {
    const controls = [
        { label: 'Learning Rate', value: 0.003, min: 0, max: 1 },
        { label: 'Batch Size', value: 64, min: 1, max: 128 },
        { label: 'Dropout', value: 0.5, min: 0, max: 1 },
        { label: 'Momentum', value: 0.9, min: 0, max: 1 }
    ];

    return (
        <div className="neural-controls">
            {controls.map((control, i) => (
                <div key={i} className="control-group">
                    <label className="control-label">{control.label}</label>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        defaultValue={(control.value / (control.max || 1)) * 100}
                        className="control-slider"
                    />
                    <span className="control-value">{control.value}</span>
                </div>
            ))}
        </div>
    );
};

const NeuralMetrics = () => {
    const metrics = [
        { label: 'Accuracy', value: '94.7%', trend: '↑ 2.3%' },
        { label: 'Loss', value: '0.053', trend: '↓ 0.012' },
        { label: 'Epoch', value: '127', trend: 'Running' },
        { label: 'Time', value: '2h 34m', trend: 'Est. 45m left' }
    ];

    return (
        <div className="neural-metrics">
            {metrics.map((metric, i) => (
                <div key={i} className="metric-card">
                    <span className="metric-label">{metric.label}</span>
                    <span className="metric-value">{metric.value}</span>
                    <div className="metric-trend">{metric.trend}</div>
                </div>
            ))}
        </div>
    );
};

export default NeuralNetworkViz;
