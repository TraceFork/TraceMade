import { useRef, useEffect } from 'react';
import { useMode } from '../context/ModeContext';
import { useBehavior } from '../context/BehaviorContext';
import { useIntelligence } from '../context/IntelligenceContext';
import gsap from 'gsap';

const ChromeLiquidUI = () => {
    const topPanelRef = useRef(null);
    const leftPanelRef = useRef(null);
    const { currentMode, switchMode, getModeConfig } = useMode();
    const { trackClick } = useBehavior();

    const config = getModeConfig();

    useEffect(() => {
        gsap.to(topPanelRef.current, {
            backgroundColor: config.colors.background,
            duration: config.timing.transitionDuration,
            ease: config.timing.easing
        });

        gsap.to(leftPanelRef.current, {
            backgroundColor: config.colors.background,
            duration: config.timing.transitionDuration,
            ease: config.timing.easing
        });
    }, [currentMode, config]);

    const handleModeClick = (e, mode) => {
        e.preventDefault();
        trackClick(e.clientX, e.clientY, e.target);
        switchMode(mode);
    };

    return (
        <div className="chrome-liquid-ui">
            <div ref={topPanelRef} className="chrome-panel panel-top">
                <div className="panel-morph-boundary"></div>
                <div className="panel-content">
                    <div className="branding">
                        <span className="brand-text">TraceFork</span>
                        <span className="brand-year">2024</span>
                    </div>
                    <nav className="primary-nav">
                        <a
                            href="#explorer"
                            className={`nav-item ${currentMode === 'explorer' ? 'active' : ''}`}
                            onClick={(e) => handleModeClick(e, 'explorer')}
                        >
                            <span className="nav-label">Explorer</span>
                            <span className="nav-underline"></span>
                        </a>
                        <a
                            href="#focus"
                            className={`nav-item ${currentMode === 'focus' ? 'active' : ''}`}
                            onClick={(e) => handleModeClick(e, 'focus')}
                        >
                            <span className="nav-label">Focus</span>
                            <span className="nav-underline"></span>
                        </a>
                        <a
                            href="#flow"
                            className={`nav-item ${currentMode === 'flow' ? 'active' : ''}`}
                            onClick={(e) => handleModeClick(e, 'flow')}
                        >
                            <span className="nav-label">Flow</span>
                            <span className="nav-underline"></span>
                        </a>
                        <a
                            href="#neural"
                            className={`nav-item ${currentMode === 'neural' ? 'active' : ''}`}
                            onClick={(e) => handleModeClick(e, 'neural')}
                        >
                            <span className="nav-label">Neural</span>
                            <span className="nav-underline"></span>
                        </a>
                    </nav>
                    <div className="system-indicators">
                        <div className="indicator-item presence">
                            <span className="indicator-dot"></span>
                            <span className="indicator-label">Aware</span>
                        </div>
                        <div className="indicator-item cognitive">
                            <span className="indicator-dot"></span>
                            <span className="indicator-label">Active</span>
                        </div>
                    </div>
                </div>
            </div>
            <div ref={leftPanelRef} className="chrome-panel panel-left">
                <div className="panel-morph-boundary"></div>
                <div className="panel-content">
                    <SystemStateSection />
                    <BehaviorSignalsSection />
                </div>
            </div>
        </div>
    );
};

const SystemStateSection = () => {
    const { cognitiveState } = useIntelligence();

    return (
        <div className="sidebar-section">
            <h3 className="section-title">System State</h3>
            <div className="state-visualization">
                <div className="state-graph">
                    <svg viewBox="0 0 200 100" className="state-svg">
                        <path className="state-path" d="M0,50 Q50,20 100,50 T200,50"></path>
                        <circle className="state-point" cx="50" cy="35" r="2"></circle>
                        <circle className="state-point" cx="100" cy="50" r="2"></circle>
                        <circle className="state-point" cx="150" cy="35" r="2"></circle>
                    </svg>
                </div>
                <div className="state-metrics">
                    <div className="metric">
                        <span className="metric-label">Intensity</span>
                        <span className="metric-value">{cognitiveState.intensity.toFixed(2)}</span>
                    </div>
                    <div className="metric">
                        <span className="metric-label">Coherence</span>
                        <span className="metric-value">{cognitiveState.coherence.toFixed(2)}</span>
                    </div>
                    <div className="metric">
                        <span className="metric-label">Entropy</span>
                        <span className="metric-value">{cognitiveState.entropy.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const BehaviorSignalsSection = () => {
    const { intentClarity, exploration, rhythm } = useBehavior();

    return (
        <div className="sidebar-section">
            <h3 className="section-title">Behavior Signals</h3>
            <div className="signal-list">
                <div className="signal-item">
                    <span className="signal-name">Intent Clarity</span>
                    <div className="signal-bar">
                        <div className="signal-fill" style={{ width: `${intentClarity * 100}%` }}></div>
                    </div>
                </div>
                <div className="signal-item">
                    <span className="signal-name">Exploration</span>
                    <div className="signal-bar">
                        <div className="signal-fill" style={{ width: `${exploration * 100}%` }}></div>
                    </div>
                </div>
                <div className="signal-item">
                    <span className="signal-name">Rhythm</span>
                    <div className="signal-bar">
                        <div className="signal-fill" style={{ width: `${rhythm * 100}%` }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChromeLiquidUI;
