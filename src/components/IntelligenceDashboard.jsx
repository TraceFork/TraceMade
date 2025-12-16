import { useRef, useEffect, useState } from 'react';
import { useIntelligence } from '../context/IntelligenceContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const IntelligenceDashboard = () => {
    const dashboardRef = useRef(null);

    useEffect(() => {
        ScrollTrigger.create({
            trigger: dashboardRef.current,
            start: 'top center',
            onEnter: () => {
                gsap.fromTo(
                    '.dashboard-card',
                    { opacity: 0, y: 50, scale: 0.9 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: 'power2.out'
                    }
                );
            }
        });
    }, []);

    return (
        <section ref={dashboardRef} id="intelligence-dashboard" className="dashboard-zone" data-section="dashboard">
            <div className="section-header">
                <h2 className="section-title">Intelligence Dashboard</h2>
                <p className="section-description">Real-time cognitive state visualization</p>
            </div>
            <div className="dashboard-grid">
                <NeuralActivityCard />
                <CognitiveLoadCard />
                <AttentionHeatmapCard />
                <IntentTimelineCard />
                <ModeDistributionCard />
                <SystemHealthCard />
            </div>
        </section>
    );
};

const NeuralActivityCard = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        const nodes = [];
        const connections = [];
        const nodeCount = 50;

        for (let i = 0; i < nodeCount; i++) {
            nodes.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 3 + 2,
                active: Math.random() > 0.7
            });
        }

        for (let i = 0; i < nodeCount; i++) {
            for (let j = i + 1; j < nodeCount; j++) {
                if (Math.random() > 0.95) {
                    connections.push({ from: i, to: j });
                }
            }
        }

        const animate = () => {
            ctx.fillStyle = 'rgba(10, 10, 20, 0.1)';
            ctx.fillRect(0, 0, width, height);

            connections.forEach(conn => {
                const fromNode = nodes[conn.from];
                const toNode = nodes[conn.to];

                ctx.strokeStyle = 'rgba(0, 255, 255, 0.2)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(fromNode.x, fromNode.y);
                ctx.lineTo(toNode.x, toNode.y);
                ctx.stroke();
            });

            nodes.forEach(node => {
                node.x += node.vx;
                node.y += node.vy;

                if (node.x < 0 || node.x > width) node.vx *= -1;
                if (node.y < 0 || node.y > height) node.vy *= -1;

                node.x = Math.max(0, Math.min(width, node.x));
                node.y = Math.max(0, Math.min(height, node.y));

                const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 2);
                gradient.addColorStop(0, node.active ? 'rgba(0, 255, 255, 0.8)' : 'rgba(100, 100, 150, 0.5)');
                gradient.addColorStop(1, 'rgba(0, 255, 255, 0)');

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius * 2, 0, Math.PI * 2);
                ctx.fill();

                if (Math.random() > 0.99) {
                    node.active = !node.active;
                }
            });

            requestAnimationFrame(animate);
        };

        animate();
    }, []);

    return (
        <div className="dashboard-card card-large">
            <div className="card-header">
                <h3 className="card-title">Neural Activity Map</h3>
                <div className="card-actions">
                    <button className="action-btn">Expand</button>
                </div>
            </div>
            <div className="card-content">
                <div className="neural-map-container">
                    <canvas ref={canvasRef} width={800} height={600} className="neural-canvas"></canvas>
                </div>
            </div>
        </div>
    );
};

const CognitiveLoadCard = () => {
    const { cognitiveState } = useIntelligence();
    const [loadPercentage, setLoadPercentage] = useState(75);

    useEffect(() => {
        const percentage = Math.round(cognitiveState.intensity * 100);
        gsap.to({ value: loadPercentage }, {
            value: percentage,
            duration: 1,
            onUpdate: function () {
                setLoadPercentage(Math.round(this.targets()[0].value));
            }
        });
    }, [cognitiveState.intensity]);

    return (
        <div className="dashboard-card">
            <div className="card-header">
                <h3 className="card-title">Cognitive Load</h3>
            </div>
            <div className="card-content">
                <div className="load-gauge">
                    <svg viewBox="0 0 200 200" className="gauge-svg">
                        <circle cx="100" cy="100" r="80" fill="none" stroke="#1a1a2e" strokeWidth="12" className="gauge-bg"></circle>
                        <circle
                            cx="100"
                            cy="100"
                            r="80"
                            fill="none"
                            stroke="url(#gaugeGrad)"
                            strokeWidth="12"
                            strokeDasharray="502"
                            strokeDashoffset={502 - (502 * loadPercentage / 100)}
                            className="gauge-fill"
                            transform="rotate(-90 100 100)"
                        ></circle>
                        <defs>
                            <linearGradient id="gaugeGrad">
                                <stop offset="0%" stopColor="#00ffff"></stop>
                                <stop offset="100%" stopColor="#ff00ff"></stop>
                            </linearGradient>
                        </defs>
                        <text x="100" y="110" textAnchor="middle" className="gauge-value" fontSize="28" fill="#fff">{loadPercentage}%</text>
                    </svg>
                </div>
            </div>
        </div>
    );
};

const AttentionHeatmapCard = () => {
    const [heatmapData, setHeatmapData] = useState([]);

    useEffect(() => {
        const data = Array.from({ length: 25 }, () => Math.random());
        setHeatmapData(data);

        const interval = setInterval(() => {
            setHeatmapData(prev => prev.map(v => Math.min(1, Math.max(0, v + (Math.random() - 0.5) * 0.1))));
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="dashboard-card">
            <div className="card-header">
                <h3 className="card-title">Attention Heatmap</h3>
            </div>
            <div className="card-content">
                <div className="heatmap-grid">
                    {heatmapData.map((intensity, i) => (
                        <div
                            key={i}
                            className="heatmap-cell"
                            style={{
                                backgroundColor: `rgba(0, 255, 255, ${intensity})`,
                                transition: 'background-color 2s ease'
                            }}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const IntentTimelineCard = () => {
    const [timelinePoints, setTimelinePoints] = useState([]);

    useEffect(() => {
        const points = Array.from({ length: 15 }, (_, i) => ({
            x: 50 + i * 50,
            y: 150 - Math.random() * 100
        }));
        setTimelinePoints(points);
    }, []);

    return (
        <div className="dashboard-card card-wide">
            <div className="card-header">
                <h3 className="card-title">Intent Timeline</h3>
            </div>
            <div className="card-content">
                <div className="timeline-container">
                    <svg viewBox="0 0 800 200" className="timeline-svg">
                        <defs>
                            <linearGradient id="timelineGrad1">
                                <stop offset="0%" stopColor="#00ffff"></stop>
                                <stop offset="100%" stopColor="#0088ff"></stop>
                            </linearGradient>
                        </defs>
                        <path
                            d={`M${timelinePoints.map((p, i) => `${i === 0 ? '' : 'L'}${p.x},${p.y}`).join(' ')}`}
                            fill="none"
                            stroke="url(#timelineGrad1)"
                            strokeWidth="2"
                            className="timeline-path"
                        ></path>
                        <g className="timeline-points">
                            {timelinePoints.map((p, i) => (
                                <circle key={i} cx={p.x} cy={p.y} r="4" fill="#00ffff"></circle>
                            ))}
                        </g>
                    </svg>
                </div>
            </div>
        </div>
    );
};

const ModeDistributionCard = () => {
    const modes = [
        { name: 'Explorer', percentage: 35 },
        { name: 'Focus', percentage: 28 },
        { name: 'Flow', percentage: 22 },
        { name: 'Neural', percentage: 15 }
    ];

    return (
        <div className="dashboard-card">
            <div className="card-header">
                <h3 className="card-title">Mode Distribution</h3>
            </div>
            <div className="card-content">
                <div className="distribution-chart">
                    {modes.map((mode, i) => (
                        <div key={i} className="dist-bar">
                            <span className="dist-label">{mode.name}</span>
                            <div className="dist-fill" style={{ width: `${mode.percentage}%` }}></div>
                            <span className="dist-value">{mode.percentage}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const SystemHealthCard = () => {
    const healthItems = [
        { label: 'Render Pipeline', status: 'Optimal', color: '#00ff88' },
        { label: 'Neural Net', status: 'Active', color: '#00ffff' },
        { label: 'Behavior Track', status: 'Online', color: '#ffff00' },
        { label: 'Memory Pool', status: '87% Free', color: '#ff00ff' }
    ];

    return (
        <div className="dashboard-card">
            <div className="card-header">
                <h3 className="card-title">System Health</h3>
            </div>
            <div className="card-content">
                <div className="health-indicators">
                    {healthItems.map((item, i) => (
                        <div key={i} className="health-item">
                            <span className="health-icon" style={{ color: item.color }}>●</span>
                            <span className="health-label">{item.label}</span>
                            <span className="health-status">{item.status}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default IntelligenceDashboard;
