import { useRef, useEffect } from 'react';
import { useIntelligence } from '../context/IntelligenceContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroZone = () => {
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const orbRef = useRef(null);

    useEffect(() => {
        const chars = titleRef.current.querySelectorAll('.char');

        gsap.fromTo(
            chars,
            { opacity: 0, y: 100, rotationX: -90 },
            {
                opacity: 1,
                y: 0,
                rotationX: 0,
                duration: 1,
                stagger: 0.05,
                ease: 'power3.out',
                delay: 0.5
            }
        );

        gsap.fromTo(
            '.subtitle-line',
            { opacity: 0, x: -50 },
            {
                opacity: 1,
                x: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power2.out',
                delay: 1
            }
        );

        gsap.fromTo(
            '.orb-layer',
            { scale: 0, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                duration: 1.5,
                stagger: 0.15,
                ease: 'elastic.out(1, 0.5)',
                delay: 1.5
            }
        );

        gsap.to('.orb-layer', {
            rotation: 360,
            duration: 20,
            repeat: -1,
            ease: 'linear',
            stagger: {
                each: 0.5,
                from: 'start'
            }
        });

        ScrollTrigger.create({
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            onUpdate: (self) => {
                gsap.to(orbRef.current, {
                    scale: 1 + self.progress * 0.5,
                    rotation: self.progress * 180,
                    duration: 0.1
                });
            }
        });

    }, []);

    return (
        <section ref={heroRef} id="hero-zone" className="hero-landing-zone" data-section="hero">
            <div className="hero-background">
                <div className="hero-gradient-layer layer-1"></div>
                <div className="hero-gradient-layer layer-2"></div>
                <div className="hero-noise-texture"></div>
            </div>
            <div className="hero-content">
                <div className="hero-title-group">
                    <h1 ref={titleRef} className="hero-title">
                        <span className="title-word word-1">
                            <span className="char">T</span>
                            <span className="char">r</span>
                            <span className="char">a</span>
                            <span className="char">c</span>
                            <span className="char">e</span>
                        </span>
                        <span className="title-word word-2">
                            <span className="char">F</span>
                            <span className="char">o</span>
                            <span className="char">r</span>
                            <span className="char">k</span>
                        </span>
                    </h1>
                    <div className="hero-subtitle">
                        <p className="subtitle-line">A digital organism observing intent</p>
                        <p className="subtitle-line">Morphing with perception</p>
                        <p className="subtitle-line">Forking reality through interaction</p>
                    </div>
                </div>
                <div ref={orbRef} className="hero-visual-element">
                    <div className="visual-orb">
                        <div className="orb-layer layer-1"></div>
                        <div className="orb-layer layer-2"></div>
                        <div className="orb-layer layer-3"></div>
                        <div className="orb-core"></div>
                    </div>
                </div>
                <div className="hero-scroll-indicator">
                    <span className="scroll-text">Begin Exploration</span>
                    <div className="scroll-arrow">
                        <svg viewBox="0 0 24 24" className="arrow-svg">
                            <path d="M12,4 L12,20 M12,20 L6,14 M12,20 L18,14"></path>
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroZone;
