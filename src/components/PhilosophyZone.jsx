const PhilosophyZone = () => {
    return (
        <section id="philosophy" className="philosophy-zone" data-section="philosophy">
            <div className="section-header">
                <h2 className="section-title">Philosophy</h2>
                <p className="section-description">The principles behind TraceFork</p>
            </div>
            <div className="philosophy-content">
                <PhilosophyBlock
                    heading="Observation"
                    texts={[
                        "TraceFork is designed as an observing system, one that perceives user presence not through explicit input alone but through the subtle signals of interaction rhythm, gaze patterns, hesitation, and intent. Every movement is a signal. Every pause is data.",
                        "The system does not wait for commands. It anticipates, adapts, and responds to the emanations of human cognition. This is not automation. This is symbiosis."
                    ]}
                />
                <PhilosophyBlock
                    heading="Morphology"
                    texts={[
                        "Digital experiences should not be static containers for content. They should breathe, morph, and reform in response to context. TraceFork implements a liquid UI architecture where panels stretch, distort, and flow. Where transitions are not abrupt cuts but organic metamorphoses.",
                        "We reject the rectangle. We embrace the fluid geometry of thought itself."
                    ]}
                />
                <PhilosophyBlock
                    heading="Forking"
                    texts={[
                        "The name TraceFork represents dual concepts: tracing the path of user behavior, and forking reality into multiple cognitive modes. Each mode is a parallel universe of visual language, interaction tempo, and narrative voice.",
                        "Explorer mode: open, curious, expansive. Focus mode: concentrated, minimal, deliberate. Flow mode: rhythmic, immersive, seamless. Neural mode: deep, complex, interconnected."
                    ]}
                />
                <PhilosophyBlock
                    heading="Intelligence"
                    texts={[
                        "TraceFork operates as an intelligent organism. It maintains internal state, learns from behavioral patterns, adjusts visual intensity based on cognitive load, and presents information with cinematic precision.",
                        "This is not artificial intelligence in the machine learning sense. This is designed intelligence. Intentional. Controlled. Cinematic."
                    ]}
                />
                <PhilosophyBlock
                    heading="Craft"
                    texts={[
                        "Every detail in TraceFork is intentional. Typography is not decoration but a functional system that guides attention and establishes hierarchy. Color is not aesthetic choice but emotional temperature. Motion is not flourish but narrative pacing.",
                        "We architect experiences the way composers write symphonies: with tempo, dynamics, crescendos, and silence."
                    ]}
                />
            </div>
        </section>
    );
};

const PhilosophyBlock = ({ heading, texts }) => {
    return (
        <div className="philosophy-block">
            <h3 className="philosophy-heading">{heading}</h3>
            {texts.map((text, i) => (
                <p key={i} className="philosophy-text">{text}</p>
            ))}
        </div>
    );
};

export default PhilosophyZone;
