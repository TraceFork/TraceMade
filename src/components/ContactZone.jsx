import { useState } from 'react';

const ContactZone = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <section id="contact" className="contact-zone" data-section="contact">
            <div className="section-header">
                <h2 className="section-title">Connect</h2>
                <p className="section-description">Reach out to the ForkTrace team</p>
            </div>
            <div className="contact-content">
                <div className="contact-form">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                name="name"
                                className="form-input"
                                placeholder="Your name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="form-input"
                                placeholder="your@email.com"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Subject</label>
                            <input
                                type="text"
                                name="subject"
                                className="form-input"
                                placeholder="What's this about?"
                                value={formData.subject}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Message</label>
                            <textarea
                                name="message"
                                className="form-textarea"
                                rows="6"
                                placeholder="Tell us more..."
                                value={formData.message}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <button type="submit" className="form-submit">Send Message</button>
                    </form>
                </div>
                <div className="contact-info">
                    <div className="info-block">
                        <h4 className="info-title">ForkTrace</h4>
                        <p className="info-text">A digital organism studio</p>
                        <p className="info-text">Building intelligence-driven experiences</p>
                    </div>
                    <div className="info-block">
                        <h4 className="info-title">Follow</h4>
                        <div className="social-links">
                            <a href="#twitter" className="social-link">Twitter</a>
                            <a href="#github" className="social-link">GitHub</a>
                            <a href="#dribbble" className="social-link">Dribbble</a>
                            <a href="#behance" className="social-link">Behance</a>
                        </div>
                    </div>
                    <div className="info-block">
                        <h4 className="info-title">Built With</h4>
                        <ul className="tech-list">
                            <li className="tech-item">React</li>
                            <li className="tech-item">Three.js</li>
                            <li className="tech-item">GSAP</li>
                            <li className="tech-item">Custom GLSL</li>
                            <li className="tech-item">WebGL</li>
                            <li className="tech-item">Advanced CSS</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactZone;
