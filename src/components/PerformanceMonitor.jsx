import { useEffect, useState, useRef } from 'react';
import { useIntelligence } from '../context/IntelligenceContext';

const PerformanceMonitor = () => {
    const [fps, setFps] = useState(60);
    const [memory, setMemory] = useState(0);
    const { updateMetrics } = useIntelligence();
    const frameTimesRef = useRef([]);

    useEffect(() => {
        let lastTime = performance.now();
        let frameCount = 0;

        const measurePerformance = () => {
            const currentTime = performance.now();
            const delta = currentTime - lastTime;

            frameTimesRef.current.push(delta);
            if (frameTimesRef.current.length > 60) {
                frameTimesRef.current.shift();
            }

            frameCount++;

            if (frameCount >= 60) {
                const avgFrameTime = frameTimesRef.current.reduce((a, b) => a + b, 0) / frameTimesRef.current.length;
                const currentFps = Math.round(1000 / avgFrameTime);

                setFps(currentFps);

                if (performance.memory) {
                    const memoryMB = Math.round(performance.memory.usedJSHeapSize / 1048576);
                    setMemory(memoryMB);
                }

                updateMetrics({ fps: currentFps, memory });

                frameCount = 0;
            }

            lastTime = currentTime;
            requestAnimationFrame(measurePerformance);
        };

        const rafId = requestAnimationFrame(measurePerformance);

        return () => cancelAnimationFrame(rafId);
    }, [updateMetrics, memory]);

    return (
        <div className="performance-monitor">
            <div className="perf-metric">
                <span className="perf-label">FPS:</span>
                <span className="perf-value">{fps}</span>
            </div>
            {memory > 0 && (
                <div className="perf-metric">
                    <span className="perf-label">Memory:</span>
                    <span className="perf-value">{memory}MB</span>
                </div>
            )}
        </div>
    );
};

export default PerformanceMonitor;
