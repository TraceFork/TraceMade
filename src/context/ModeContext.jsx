import { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react';
import { useIntelligence } from './IntelligenceContext';
import { useBehavior } from './BehaviorContext';

const ModeContext = createContext(null);

export const useMode = () => {
    const context = useContext(ModeContext);
    if (!context) {
        throw new Error('useMode must be used within ModeProvider');
    }
    return context;
};

const MODE_CONFIGS = {
    explorer: {
        colors: {
            primary: '#00ffff',
            secondary: '#0088ff',
            tertiary: '#00ccff',
            background: '#0a0a15',
            accent: '#00ffaa'
        },
        timing: {
            transitionDuration: 1.2,
            easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
            staggerDelay: 0.05
        },
        visual: {
            brightness: 1.1,
            contrast: 1.0,
            saturation: 1.2,
            bloom: 0.4,
            vignette: 0.1
        },
        camera: {
            fov: 75,
            position: [0, 0, 5],
            rotation: [0, 0, 0]
        },
        particles: {
            count: 1000,
            size: 1.5,
            speed: 0.5,
            spread: 10
        }
    },
    focus: {
        colors: {
            primary: '#ff00ff',
            secondary: '#cc00ff',
            tertiary: '#ff00cc',
            background: '#0f0a15',
            accent: '#ff0088'
        },
        timing: {
            transitionDuration: 0.8,
            easing: 'cubic-bezier(0.6, 0.0, 0.4, 1)',
            staggerDelay: 0.03
        },
        visual: {
            brightness: 0.9,
            contrast: 1.3,
            saturation: 0.9,
            bloom: 0.2,
            vignette: 0.3
        },
        camera: {
            fov: 60,
            position: [0, 0, 3],
            rotation: [0, 0, 0]
        },
        particles: {
            count: 500,
            size: 1.0,
            speed: 0.2,
            spread: 5
        }
    },
    flow: {
        colors: {
            primary: '#ffff00',
            secondary: '#ffcc00',
            tertiary: '#ffaa00',
            background: '#15120a',
            accent: '#ff8800'
        },
        timing: {
            transitionDuration: 1.5,
            easing: 'cubic-bezier(0.3, 0.0, 0.3, 1)',
            staggerDelay: 0.08
        },
        visual: {
            brightness: 1.0,
            contrast: 1.1,
            saturation: 1.1,
            bloom: 0.5,
            vignette: 0.15
        },
        camera: {
            fov: 80,
            position: [0, 0, 6],
            rotation: [0, 0, 0]
        },
        particles: {
            count: 1500,
            size: 2.0,
            speed: 0.7,
            spread: 15
        }
    },
    neural: {
        colors: {
            primary: '#00ff88',
            secondary: '#00ffaa',
            tertiary: '#00ffcc',
            background: '#0a1510',
            accent: '#00ff66'
        },
        timing: {
            transitionDuration: 1.0,
            easing: 'cubic-bezier(0.5, 0.0, 0.5, 1)',
            staggerDelay: 0.04
        },
        visual: {
            brightness: 1.0,
            contrast: 1.2,
            saturation: 1.0,
            bloom: 0.35,
            vignette: 0.2
        },
        camera: {
            fov: 70,
            position: [0, 0, 4],
            rotation: [0, 0, 0]
        },
        particles: {
            count: 800,
            size: 1.2,
            speed: 0.3,
            spread: 8
        }
    }
};

export const ModeProvider = ({ children }) => {
    const [currentMode, setCurrentMode] = useState('explorer');
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [modeHistory, setModeHistory] = useState(['explorer']);

    const { updateVisualState } = useIntelligence();
    const { engagement, intentClarity } = useBehavior();

    const switchMode = useCallback((newMode) => {
        if (newMode === currentMode || isTransitioning) return;

        setIsTransitioning(true);
        setModeHistory(prev => [...prev, newMode]);

        const config = MODE_CONFIGS[newMode];

        setTimeout(() => {
            setCurrentMode(newMode);
            updateVisualState(config.visual);
        }, 100);

        setTimeout(() => {
            setIsTransitioning(false);
        }, config.timing.transitionDuration * 1000);
    }, [currentMode, isTransitioning, updateVisualState]);

    const getModeConfig = useCallback((mode) => {
        return MODE_CONFIGS[mode || currentMode];
    }, [currentMode]);

    const suggestMode = useCallback(() => {
        if (engagement > 0.8 && intentClarity > 0.7) {
            return 'focus';
        } else if (engagement > 0.6 && intentClarity < 0.5) {
            return 'flow';
        } else if (engagement < 0.4) {
            return 'neural';
        } else {
            return 'explorer';
        }
    }, [engagement, intentClarity]);

    // Removed suggestion interval - it was running every 5s doing nothing useful

    const value = useMemo(() => ({
        currentMode,
        isTransitioning,
        modeHistory,
        switchMode,
        getModeConfig,
        suggestMode,
        MODE_CONFIGS
    }), [currentMode, isTransitioning, modeHistory, switchMode, getModeConfig, suggestMode]);

    return (
        <ModeContext.Provider value={value}>
            {children}
        </ModeContext.Provider>
    );
};
