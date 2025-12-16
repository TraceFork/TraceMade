import { useRef, useEffect } from 'react';

const DataFlowZone = () => {
    return (
        <section id="data-flow" className="data-flow-zone" data-section="dataflow">
            <div className="section-header">
                <h2 className="section-title">Data Flow Streams</h2>
                <p className="section-description">Information flowing through the system</p>
            </div>
            <FlowVisualization />
            <FlowPipeline />
        </section>
    );
};

const FlowVisualization = () => {
    const streams = [
        { title: 'Visual Input Stream', rate: '1.2 GB/s', packets: 5, color: '#00ffff' },
        { title: 'Behavioral Stream', rate: '340 MB/s', packets: 4, color: '#ff00ff' },
        { title: 'Cognitive Stream', rate: '780 MB/s', packets: 3, color: '#ffff00' },
        { title: 'Neural Processing', rate: '2.4 GB/s', packets: 6, color: '#00ff88' }
    ];

    return (
        <div className="flow-visualization">
            {streams.map((stream, i) => (
                <FlowStream key={i} {...stream} index={i} />
            ))}
        </div>
    );
};

const FlowStream = ({ title, rate, packets, color, index }) => {
    return (
        <div className={`flow-stream stream-${index + 1}`}>
            <div className="stream-header">
                <h4 className="stream-title">{title}</h4>
                <span className="stream-rate">{rate}</span>
            </div>
            <div className="stream-data">
                {Array.from({ length: packets }).map((_, i) => (
                    <div
                        key={i}
                        className={`data-packet packet-${i + 1}`}
                        style={{
                            backgroundColor: color,
                            animationDelay: `${i * 0.2}s`
                        }}
                    ></div>
                ))}
            </div>
            <div className="stream-graph">
                <svg viewBox="0 0 400 100" className="stream-svg">
                    <path
                        d={`M0,50 Q20,${30 + index * 5} 40,50 T80,50 T120,50 T160,50 T200,50 T240,50 T280,50 T320,50 T360,50 T400,50`}
                        fill="none"
                        stroke={color}
                        strokeWidth="1"
                    ></path>
                </svg>
            </div>
        </div>
    );
};

const FlowPipeline = () => {
    const stages = [
        {
            title: 'Capture',
            description: 'Raw sensory input acquisition',
            metrics: ['15ms latency', '99.8% uptime']
        },
        {
            title: 'Process',
            description: 'Feature extraction and filtering',
            metrics: ['23ms latency', '94.2% efficiency']
        },
        {
            title: 'Analyze',
            description: 'Pattern recognition and classification',
            metrics: ['45ms latency', '96.7% accuracy']
        },
        {
            title: 'Synthesize',
            description: 'Decision making and output generation',
            metrics: ['18ms latency', '98.1% quality']
        }
    ];

    return (
        <div className="flow-pipeline">
            {stages.map((stage, i) => (
                <div key={i}>
                    <div className={`pipeline-stage stage-${i + 1}`}>
                        <div className="stage-icon"></div>
                        <h4 className="stage-title">{stage.title}</h4>
                        <p className="stage-description">{stage.description}</p>
                        <div className="stage-metrics">
                            {stage.metrics.map((metric, j) => (
                                <span key={j} className="stage-metric">{metric}</span>
                            ))}
                        </div>
                    </div>
                    {i < stages.length - 1 && <div className="pipeline-connector"></div>}
                </div>
            ))}
        </div>
    );
};

export default DataFlowZone;
