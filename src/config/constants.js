export const MODE_CONFIGURATIONS = {
    explorer: {
        id: 'explorer',
        name: 'Explorer',
        description: 'Open, curious, expansive cognitive state',
        colors: {
            primary: '#00ffff',
            secondary: '#0088ff',
            tertiary: '#00ccff',
            background: '#0a0a15',
            accent: '#00ffaa',
            text: '#ffffff'
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
            hue: 0,
            bloom: 0.4,
            vignette: 0.1,
            noise: 0.05,
            grain: 0.02
        },
        camera: {
            fov: 75,
            position: { x: 0, y: 0, z: 5 },
            rotation: { x: 0, y: 0, z: 0 },
            lookAt: { x: 0, y: 0, z: 0 }
        },
        particles: {
            count: 5000,
            size: 1.5,
            speed: 0.5,
            spread: 10,
            opacity: 0.8
        }
    },
    focus: {
        id: 'focus',
        name: 'Focus',
        description: 'Concentrated, minimal, deliberate cognitive state',
        colors: {
            primary: '#ff00ff',
            secondary: '#cc00ff',
            tertiary: '#ff00cc',
            background: '#0f0a15',
            accent: '#ff0088',
            text: '#ffffff'
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
            hue: 300,
            bloom: 0.2,
            vignette: 0.3,
            noise: 0.03,
            grain: 0.01
        },
        camera: {
            fov: 60,
            position: { x: 0, y: 0, z: 3 },
            rotation: { x: 0, y: 0, z: 0 },
            lookAt: { x: 0, y: 0, z: 0 }
        },
        particles: {
            count: 2000,
            size: 1.0,
            speed: 0.2,
            spread: 5,
            opacity: 0.6
        }
    },
    flow: {
        id: 'flow',
        name: 'Flow',
        description: 'Rhythmic, immersive, seamless cognitive state',
        colors: {
            primary: '#ffff00',
            secondary: '#ffcc00',
            tertiary: '#ffaa00',
            background: '#15120a',
            accent: '#ff8800',
            text: '#ffffff'
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
            hue: 60,
            bloom: 0.5,
            vignette: 0.15,
            noise: 0.06,
            grain: 0.03
        },
        camera: {
            fov: 80,
            position: { x: 0, y: 0, z: 6 },
            rotation: { x: 0, y: 0, z: 0 },
            lookAt: { x: 0, y: 0, z: 0 }
        },
        particles: {
            count: 7000,
            size: 2.0,
            speed: 0.7,
            spread: 15,
            opacity: 0.9
        }
    },
    neural: {
        id: 'neural',
        name: 'Neural',
        description: 'Deep, complex, interconnected cognitive state',
        colors: {
            primary: '#00ff88',
            secondary: '#00ffaa',
            tertiary: '#00ffcc',
            background: '#0a1510',
            accent: '#00ff66',
            text: '#ffffff'
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
            hue: 160,
            bloom: 0.35,
            vignette: 0.2,
            noise: 0.04,
            grain: 0.02
        },
        camera: {
            fov: 70,
            position: { x: 0, y: 0, z: 4 },
            rotation: { x: 0, y: 0, z: 0 },
            lookAt: { x: 0, y: 0, z: 0 }
        },
        particles: {
            count: 4000,
            size: 1.2,
            speed: 0.3,
            spread: 8,
            opacity: 0.7
        }
    }
};

export const ANIMATION_PRESETS = {
    entrance: {
        fadeIn: {
            from: { opacity: 0 },
            to: { opacity: 1, duration: 0.6 }
        },
        slideUp: {
            from: { opacity: 0, y: 50 },
            to: { opacity: 1, y: 0, duration: 0.8 }
        },
        slideDown: {
            from: { opacity: 0, y: -50 },
            to: { opacity: 1, y: 0, duration: 0.8 }
        },
        slideLeft: {
            from: { opacity: 0, x: -50 },
            to: { opacity: 1, x: 0, duration: 0.8 }
        },
        slideRight: {
            from: { opacity: 0, x: 50 },
            to: { opacity: 1, x: 0, duration: 0.8 }
        },
        scaleIn: {
            from: { opacity: 0, scale: 0.8 },
            to: { opacity: 1, scale: 1, duration: 0.6 }
        },
        rotateIn: {
            from: { opacity: 0, rotation: -90 },
            to: { opacity: 1, rotation: 0, duration: 0.8 }
        }
    },
    exit: {
        fadeOut: {
            to: { opacity: 0, duration: 0.4 }
        },
        slideUpOut: {
            to: { opacity: 0, y: -50, duration: 0.6 }
        },
        slideDownOut: {
            to: { opacity: 0, y: 50, duration: 0.6 }
        },
        scaleOut: {
            to: { opacity: 0, scale: 0.8, duration: 0.4 }
        }
    }
};

export const PERFORMANCE_THRESHOLDS = {
    fps: {
        excellent: 58,
        good: 50,
        acceptable: 40,
        poor: 30
    },
    memory: {
        low: 100,
        medium: 250,
        high: 500,
        critical: 1000
    },
    drawCalls: {
        optimal: 100,
        acceptable: 250,
        high: 500,
        critical: 1000
    }
};

export const BEHAVIORAL_THRESHOLDS = {
    intentClarity: {
        veryLow: 0.2,
        low: 0.4,
        medium: 0.6,
        high: 0.8,
        veryHigh: 0.9
    },
    engagement: {
        disengaged: 0.3,
        passive: 0.5,
        engaged: 0.7,
        highlyEngaged: 0.85
    },
    exploration: {
        focused: 0.3,
        balanced: 0.5,
        exploring: 0.7,
        wandering: 0.9
    }
};

export default {
    MODE_CONFIGURATIONS,
    ANIMATION_PRESETS,
    PERFORMANCE_THRESHOLDS,
    BEHAVIORAL_THRESHOLDS
};
