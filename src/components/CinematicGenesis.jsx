import { useEffect, useRef, useState } from 'react';
import { useMode } from '../context/ModeContext';
import gsap from 'gsap';

const CinematicGenesis = ({ onComplete }) => {
    const containerRef = useRef(null);
    const [phase, setPhase] = useState(0);
    const { getModeConfig } = useMode();

    useEffect(() => {
        const timeline = gsap.timeline({
            onComplete: () => {
                setTimeout(onComplete, 500);
            }
        });

        timeline.fromTo(
            '.genesis-void',
            { opacity: 1 },
            { opacity: 0.3, duration: 1.5, ease: 'power2.inOut' }
        );

        timeline.fromTo(
            '.particle-layer',
            { opacity: 0, scale: 0.8 },
            {
                opacity: 1,
                scale: 1,
                duration: 2,
                stagger: 0.2,
                ease: 'power2.out'
            },
            '-=1'
        );

        timeline.fromTo(
            '.genesis-neural-fog',
            { opacity: 0 },
            { opacity: 0.6, duration: 2.5, ease: 'power1.inOut' },
            '-=1.5'
        );

        timeline.fromTo(
            '.narrative-line',
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.3,
                ease: 'power2.out'
            },
            '-=1'
        );

        timeline.to(
            '.indicator',
            {
                opacity: 1,
                scale: 1,
                duration: 0.3,
                stagger: 0.1
            },
            '-=0.5'
        );

        timeline.to(
            '.progress-bar',
            {
                scaleX: 1,
                duration: 2,
                ease: 'power1.inOut'
            },
            '-=2'
        );

        const phaseTimers = [
            setTimeout(() => setPhase(1), 1000),
            setTimeout(() => setPhase(2), 2000),
            setTimeout(() => setPhase(3), 3000),
            setTimeout(() => setPhase(4), 4000)
        ];

        return () => {
            timeline.kill();
            phaseTimers.forEach(clearTimeout);
        };
    }, [onComplete]);

    return (
        <div ref={containerRef} className="genesis-container">
            <div className="genesis-void"></div>
            <div className="genesis-particle-field">
                {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className={`particle-layer layer-${i}`}></div>
                ))}
            </div>
            <div className="genesis-neural-fog"></div>
            <div className="genesis-narrative">
                <div className="narrative-line line-1">
                    <span className="narrative-text">TraceFork initializing</span>
                    <span className="narrative-dots">...</span>
                </div>
                <div className="narrative-line line-2">
                    <span className="narrative-text">Perception layer online</span>
                    <span className="narrative-indicator">{phase >= 2 ? '✓' : ''}</span>
                </div>
                <div className="narrative-line line-3">
                    <span className="narrative-text">Tracing intent</span>
                    <span className="narrative-pulse">{phase >= 3 ? '◉' : ''}</span>
                </div>
                <div className="narrative-line line-4">
                    <span className="narrative-text">Forking reality</span>
                    <span className="narrative-glyph">{phase >= 4 ? '⚡' : ''}</span>
                </div>
            </div>
            <div className="genesis-progress">
                <div className="progress-bar"></div>
                <div className="progress-indicators">
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className={`indicator ind-${i}`}></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CinematicGenesis;
