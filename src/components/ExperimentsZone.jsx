import { useRef, useEffect } from 'react';

const ExperimentsZone = () => {
    return (
        <section id="interactive-experiments" className="experiments-zone" data-section="experiments">
            <div className="section-header">
                <h2 className="section-title">Interactive Experiments</h2>
                <p className="section-description">Explore the boundaries of perception</p>
            </div>
            <div className="experiments-grid">
                <ExperimentCard
                    id="exp-particle-field"
                    title="Particle Field Dynamics"
                    description="Observe emergent behavior in generative particle systems"
                    experimentType="particles"
                />
                <ExperimentCard
                    id="exp-wave-interference"
                    title="Wave Interference Patterns"
                    description="Visualize wave propagation and interference"
                    experimentType="waves"
                />
                <ExperimentCard
                    id="exp-fluid-simulation"
                    title="Fluid Simulation"
                    description="Real-time Navier-Stokes simulation"
                    experimentType="fluid"
                />
                <ExperimentCard
                    id="exp-fractal-generation"
                    title="Fractal Generation"
                    description="Recursive pattern generation and exploration"
                    experimentType="fractals"
                />
                <ExperimentCard
                    id="exp-cellular-automata"
                    title="Cellular Automata"
                    description="Conway's Game of Life and variations"
                    experimentType="automata"
                />
                <ExperimentCard
                    id="exp-perlin-noise"
                    title="Perlin Noise Terrain"
                    description="Procedural terrain generation with noise"
                    experimentType="noise"
                />
            </div>
        </section>
    );
};

const ExperimentCard = ({ id, title, description, experimentType }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        switch (experimentType) {
            case 'particles':
                animateParticles(ctx, width, height);
                break;
            case 'waves':
                animateWaves(ctx, width, height);
                break;
            case 'fluid':
                animateFluid(ctx, width, height);
                break;
            case 'fractals':
                animateFractals(ctx, width, height);
                break;
            case 'automata':
                animateAutomata(ctx, width, height);
                break;
            case 'noise':
                animateNoise(ctx, width, height);
                break;
        }
    }, [experimentType]);

    return (
        <div className={`experiment-card exp-${experimentType}`}>
            <div className="experiment-canvas">
                <canvas ref={canvasRef} width={600} height={400}></canvas>
            </div>
            <div className="experiment-info">
                <h3 className="experiment-title">{title}</h3>
                <p className="experiment-description">{description}</p>
                <div className="experiment-controls">
                    <button className="exp-btn">Reset</button>
                    <button className="exp-btn">Modify</button>
                    <button className="exp-btn">Export</button>
                </div>
            </div>
        </div>
    );
};

const animateParticles = (ctx, width, height) => {
    const particles = Array.from({ length: 100 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: Math.random() * 3 + 1
    }));

    const animate = () => {
        ctx.fillStyle = 'rgba(10, 10, 20, 0.1)';
        ctx.fillRect(0, 0, width, height);

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;

            ctx.fillStyle = 'rgba(0, 255, 255, 0.8)';
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
        });

        requestAnimationFrame(animate);
    };

    animate();
};

const animateWaves = (ctx, width, height) => {
    let time = 0;

    const animate = () => {
        ctx.fillStyle = 'rgba(10, 10, 20, 1)';
        ctx.fillRect(0, 0, width, height);

        for (let x = 0; x < width; x += 5) {
            const y = height / 2 + Math.sin(x * 0.02 + time) * 50 + Math.cos(x * 0.03 + time * 0.5) * 30;

            ctx.fillStyle = `rgba(0, 255, 255, ${0.5 + Math.sin(time + x * 0.01) * 0.3})`;
            ctx.fillRect(x, y, 5, 5);
        }

        time += 0.05;
        requestAnimationFrame(animate);
    };

    animate();
};

const animateFluid = (ctx, width, height) => {
    const grid = Array.from({ length: 50 }, () =>
        Array.from({ length: 50 }, () => Math.random())
    );

    const animate = () => {
        const cellWidth = width / 50;
        const cellHeight = height / 50;

        for (let i = 0; i < 50; i++) {
            for (let j = 0; j < 50; j++) {
                grid[i][j] += (Math.random() - 0.5) * 0.1;
                grid[i][j] = Math.max(0, Math.min(1, grid[i][j]));

                ctx.fillStyle = `rgba(255, 0, 255, ${grid[i][j]})`;
                ctx.fillRect(i * cellWidth, j * cellHeight, cellWidth, cellHeight);
            }
        }

        requestAnimationFrame(animate);
    };

    animate();
};

const animateFractals = (ctx, width, height) => {
    let zoom = 1;
    let offsetX = 0;
    let offsetY = 0;

    const drawMandelbrot = () => {
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                let a = (x - width / 2) / (0.5 * zoom * width) + offsetX;
                let b = (y - height / 2) / (0.5 * zoom * height) + offsetY;

                let ca = a;
                let cb = b;

                let n = 0;
                const maxIterations = 100;

                while (n < maxIterations) {
                    let aa = a * a - b * b;
                    let bb = 2 * a * b;

                    a = aa + ca;
                    b = bb + cb;

                    if (a * a + b * b > 16) break;
                    n++;
                }

                const brightness = n / maxIterations;
                ctx.fillStyle = `hsl(${brightness * 360}, 100%, ${brightness * 50}%)`;
                ctx.fillRect(x, y, 1, 1);
            }
        }

        zoom *= 1.01;
        if (zoom > 100) zoom = 1;

        requestAnimationFrame(drawMandelbrot);
    };

    drawMandelbrot();
};

const animateAutomata = (ctx, width, height) => {
    const cellSize = 10;
    const cols = Math.floor(width / cellSize);
    const rows = Math.floor(height / cellSize);

    let grid = Array.from({ length: cols }, () =>
        Array.from({ length: rows }, () => Math.random() > 0.7)
    );

    const animate = () => {
        const newGrid = grid.map((col, i) =>
            col.map((cell, j) => {
                let neighbors = 0;
                for (let di = -1; di <= 1; di++) {
                    for (let dj = -1; dj <= 1; dj++) {
                        if (di === 0 && dj === 0) continue;
                        const ni = (i + di + cols) % cols;
                        const nj = (j + dj + rows) % rows;
                        if (grid[ni][nj]) neighbors++;
                    }
                }

                if (cell && (neighbors === 2 || neighbors === 3)) return true;
                if (!cell && neighbors === 3) return true;
                return false;
            })
        );

        grid = newGrid;

        ctx.fillStyle = '#0a0a14';
        ctx.fillRect(0, 0, width, height);

        grid.forEach((col, i) => {
            col.forEach((cell, j) => {
                if (cell) {
                    ctx.fillStyle = '#00ffff';
                    ctx.fillRect(i * cellSize, j * cellSize, cellSize - 1, cellSize - 1);
                }
            });
        });

        setTimeout(() => requestAnimationFrame(animate), 100);
    };

    animate();
};

const animateNoise = (ctx, width, height) => {
    let time = 0;

    const noise = (x, y) => {
        return Math.sin(x * 0.1 + time) * Math.cos(y * 0.1 + time * 0.7);
    };

    const animate = () => {
        for (let x = 0; x < width; x += 4) {
            for (let y = 0; y < height; y += 4) {
                const value = (noise(x, y) + 1) / 2;
                const color = Math.floor(value * 255);
                ctx.fillStyle = `rgb(${color}, ${color * 0.5}, ${255 - color})`;
                ctx.fillRect(x, y, 4, 4);
            }
        }

        time += 0.05;
        requestAnimationFrame(animate);
    };

    animate();
};

export default ExperimentsZone;
