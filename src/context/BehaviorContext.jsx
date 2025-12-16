import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

const BehaviorContext = createContext(null);

export const useBehavior = () => {
    const context = useContext(BehaviorContext);
    if (!context) {
        throw new Error('useBehavior must be used within BehaviorProvider');
    }
    return context;
};

export const BehaviorProvider = ({ children }) => {
    const [gazePattern, setGazePattern] = useState({ x: 0, y: 0, velocity: 0, intensity: 0 });
    const [intentClarity, setIntentClarity] = useState(0.5);
    const [exploration, setExploration] = useState(0.3);
    const [rhythm, setRhythm] = useState(0.6);
    const [hesitation, setHesitation] = useState(0.2);
    const [engagement, setEngagement] = useState(0.7);

    const mouseHistory = useRef([]);
    const scrollHistory = useRef([]);
    const clickHistory = useRef([]);
    const hoverHistory = useRef([]);

    const trackMouse = useCallback((x, y) => {
        const timestamp = Date.now();
        mouseHistory.current.push({ x, y, timestamp });
        if (mouseHistory.current.length > 100) {
            mouseHistory.current.shift();
        }

        if (mouseHistory.current.length > 2) {
            const recent = mouseHistory.current.slice(-3);
            const dx = recent[2].x - recent[0].x;
            const dy = recent[2].y - recent[0].y;
            const dt = recent[2].timestamp - recent[0].timestamp;
            const velocity = Math.sqrt(dx * dx + dy * dy) / (dt || 1);

            setGazePattern({
                x,
                y,
                velocity: velocity * 1000,
                intensity: Math.min(velocity * 500, 1)
            });
        }
    }, []);

    const trackScroll = useCallback((scrollY, delta) => {
        const timestamp = Date.now();
        scrollHistory.current.push({ scrollY, delta, timestamp });
        if (scrollHistory.current.length > 50) {
            scrollHistory.current.shift();
        }

        const avgDelta = scrollHistory.current.reduce((sum, item) => sum + Math.abs(item.delta), 0) / scrollHistory.current.length;
        setRhythm(Math.min(avgDelta / 100, 1));
    }, []);

    const trackClick = useCallback((x, y, target) => {
        const timestamp = Date.now();
        clickHistory.current.push({ x, y, target, timestamp });
        if (clickHistory.current.length > 20) {
            clickHistory.current.shift();
        }

        const recentClicks = clickHistory.current.filter(c => timestamp - c.timestamp < 5000);
        setIntentClarity(Math.min(recentClicks.length / 5, 1));
    }, []);

    const trackHover = useCallback((element, duration) => {
        const timestamp = Date.now();
        hoverHistory.current.push({ element, duration, timestamp });
        if (hoverHistory.current.length > 30) {
            hoverHistory.current.shift();
        }

        const avgDuration = hoverHistory.current.reduce((sum, item) => sum + item.duration, 0) / hoverHistory.current.length;
        setExploration(Math.min(avgDuration / 1000, 1));
    }, []);

    const analyzeHesitation = useCallback(() => {
        if (mouseHistory.current.length < 10) return;

        const recent = mouseHistory.current.slice(-10);
        const distances = [];
        for (let i = 1; i < recent.length; i++) {
            const dx = recent[i].x - recent[i - 1].x;
            const dy = recent[i].y - recent[i - 1].y;
            distances.push(Math.sqrt(dx * dx + dy * dy));
        }

        const avgDistance = distances.reduce((sum, d) => sum + d, 0) / distances.length;
        const variance = distances.reduce((sum, d) => sum + Math.pow(d - avgDistance, 2), 0) / distances.length;
        const hesitationScore = Math.min(variance / 1000, 1);

        setHesitation(hesitationScore);
    }, []);

    const calculateEngagement = useCallback(() => {
        const factors = [intentClarity, exploration, rhythm, 1 - hesitation];
        const avgEngagement = factors.reduce((sum, f) => sum + f, 0) / factors.length;
        setEngagement(avgEngagement);
    }, [intentClarity, exploration, rhythm, hesitation]);

    useEffect(() => {
        const hesitationInterval = setInterval(analyzeHesitation, 500);
        const engagementInterval = setInterval(calculateEngagement, 1000);

        return () => {
            clearInterval(hesitationInterval);
            clearInterval(engagementInterval);
        };
    }, [analyzeHesitation, calculateEngagement]);

    const value = {
        gazePattern,
        intentClarity,
        exploration,
        rhythm,
        hesitation,
        engagement,
        trackMouse,
        trackScroll,
        trackClick,
        trackHover,
        mouseHistory: mouseHistory.current,
        scrollHistory: scrollHistory.current,
        clickHistory: clickHistory.current,
        hoverHistory: hoverHistory.current
    };

    return (
        <BehaviorContext.Provider value={value}>
            {children}
        </BehaviorContext.Provider>
    );
};
