import { useEffect, useState, useRef, memo } from 'react';
import { useIntelligence } from '../context/IntelligenceContext';

const PerformanceMonitor = memo(() => {
    const [fps, setFps] = useState(60);
    const [memory, setMemory] = useState(0);
    const { updateMetrics } = useIntelligence();
    const frameTimesRef = useRef([]);
    const lastUpdateRef = useRef(0);

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

            // Only update UI once per second instead of every frame
            if (currentTime - lastUpdateRef.current >= 1000) {
                const avgFrameTime = frameTimesRef.current.reduce((a, b) => a + b, 0) / frameTimesRef.current.length;
                const currentFps = Math.min(Math.round(1000 / avgFrameTime), 60);

                setFps(currentFps);

                if (performance.memory) {
                    const memoryMB = Math.round(performance.memory.usedJSHeapSize / 1048576);
                    setMemory(memoryMB);
                }

                updateMetrics({ fps: currentFps, memory });
                lastUpdateRef.current = currentTime;
                frameCount = 0;
            }

            lastTime = currentTime;
            requestAnimationFrame(measurePerformance);
        };

        const rafId = requestAnimationFrame(measurePerformance);

        return () => cancelAnimationFrame(rafId);
    }, [updateMetrics]);

    return (
        <div className="performance-monitor">
            <div className="perf-metric">
                <span className="perf-label">FPS:</span>
                <span className="perf-value" style={{ color: fps >= 55 ? '#0f0' : fps >= 30 ? '#ff0' : '#f00' }}>{fps}</span>
            </div>
            {memory > 0 && (
                <div className="perf-metric">
                    <span className="perf-label">Memory:</span>
                    <span className="perf-value">{memory}MB</span>
                </div>
            )}
        </div>
    );
});

PerformanceMonitor.displayName = 'PerformanceMonitor';

export default PerformanceMonitor;
