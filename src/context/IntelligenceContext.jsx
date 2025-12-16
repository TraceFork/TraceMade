import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

const IntelligenceContext = createContext(null);

export const useIntelligence = () => {
    const context = useContext(IntelligenceContext);
    if (!context) {
        throw new Error('useIntelligence must be used within IntelligenceProvider');
    }
    return context;
};

export const IntelligenceProvider = ({ children }) => {
    const [cognitiveState, setCognitiveState] = useState({
        intensity: 0.5,
        coherence: 0.8,
        entropy: 0.3,
        focus: 0.6,
        flow: 0.4,
        awareness: 0.9
    });

    const [visualState, setVisualState] = useState({
        brightness: 1.0,
        contrast: 1.0,
        saturation: 1.0,
        hue: 0,
        bloom: 0.3,
        vignette: 0.2,
        noise: 0.05,
        grain: 0.02
    });

    const [narrativePhase, setNarrativePhase] = useState('initialization');
    const [systemMetrics, setSystemMetrics] = useState({
        fps: 60,
        memory: 0,
        drawCalls: 0,
        triangles: 0
    });

    const updateCognitiveState = useCallback((updates) => {
        setCognitiveState(prev => ({ ...prev, ...updates }));
    }, []);

    const updateVisualState = useCallback((updates) => {
        setVisualState(prev => ({ ...prev, ...updates }));
    }, []);

    const progressNarrative = useCallback((phase) => {
        setNarrativePhase(phase);
    }, []);

    const updateMetrics = useCallback((metrics) => {
        setSystemMetrics(prev => ({ ...prev, ...metrics }));
    }, []);

    const value = {
        cognitiveState,
        visualState,
        narrativePhase,
        systemMetrics,
        updateCognitiveState,
        updateVisualState,
        progressNarrative,
        updateMetrics
    };

    return (
        <IntelligenceContext.Provider value={value}>
            {children}
        </IntelligenceContext.Provider>
    );
};
