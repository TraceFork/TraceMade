import { useMode } from '../context/ModeContext';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const ExperimentalOverlays = () => {
    const { isTransitioning, currentMode } = useMode();
    const transitionRef = useRef(null);

    useEffect(() => {
        if (isTransitioning) {
            gsap.fromTo(
                transitionRef.current,
                { opacity: 0, scale: 0.8 },
                {
                    opacity: 1,
                    scale: 1.2,
                    duration: 0.6,
                    ease: 'power2.out',
                    onComplete: () => {
                        gsap.to(transitionRef.current, {
                            opacity: 0,
                            duration: 0.4
                        });
                    }
                }
            );
        }
    }, [isTransitioning]);

    return (
        <div id="experimental-overlays" className="overlay-system">
            <div className="overlay presence-overlay"></div>
            <div className="overlay focus-overlay"></div>
            <div ref={transitionRef} className="overlay mode-transition-overlay"></div>
        </div>
    );
};

export default ExperimentalOverlays;
