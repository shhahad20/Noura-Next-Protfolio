import { useEffect, useRef } from "react";
import "../styles/Hero4.scss";

const Hero4 = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    class Circle {
      x: number;
      y: number;
      radius: number;
      speed: number;
      angle: number;
      pulsePhase: number;

      constructor(x: number, y: number, radius: number, speed: number) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;
        this.angle = Math.random() * Math.PI * 2;
        this.pulsePhase = Math.random() * Math.PI * 2;
      }

      update() {
        this.pulsePhase += 0.02;
        this.angle += this.speed;
      }

      draw() {
        const pulse = Math.sin(this.pulsePhase) * 0.2 + 1;
        const currentRadius = this.radius * pulse;

        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          currentRadius
        );

        // gradient.addColorStop(0, "rgba(123, 237, 159, 0.2)");
        // gradient.addColorStop(0.3, "rgba(123, 237, 159, 0.1)");
        // gradient.addColorStop(0.6, "rgba(123, 237, 159, 0.05)");
        // gradient.addColorStop(1, "rgba(123, 237, 159, 0)");
        gradient.addColorStop(0, "rgba(237, 212, 123, 0.2)");
        gradient.addColorStop(0.3, "rgba(237, 212, 123, 0.1)");
        gradient.addColorStop(0.6, "rgba(237, 207, 123, 0.05)");
        gradient.addColorStop(1, "rgba(237, 214, 123, 0)");

        ctx.beginPath();
        ctx.arc(this.x, this.y, currentRadius, 0, Math.PI * 2);
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.globalAlpha = 1;

        ctx.beginPath();
        ctx.arc(this.x, this.y, currentRadius * 0.7, 0, Math.PI * 2);
        // ctx.strokeStyle = `rgba(123, 237, 159, ${0.15 * pulse})`;
                ctx.strokeStyle = `rgba(200, 194, 189, ${0.15 * pulse})`;

        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }

    const mainCircle = new Circle(width * 0.7, height * 0.45, 280, 0.005);
    const ambientCircles = [
      new Circle(width * 0.65, height * 0.5, 180, -0.003),
      new Circle(width * 0.75, height * 0.4, 150, 0.004),
      new Circle(width * 0.7, height * 0.45, 220, -0.002),
    ];

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, width, height);

      ambientCircles.forEach((circle) => {
        circle.update();
        circle.draw();
      });

      mainCircle.update();
      mainCircle.draw();

      const time = Date.now() * 0.001;
      for (let i = 0; i < 3; i++) {
        const angle = time + (i * Math.PI * 2) / 3;
        const distance = 200 + Math.sin(time * 0.5 + i) * 50;
        const x = mainCircle.x + Math.cos(angle) * distance;
        const y = mainCircle.y + Math.sin(angle) * distance;

        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        // ctx.fillStyle = `rgba(123, 237, 159, ${
        //   0.5 + Math.sin(time * 2 + i) * 0.3
        // })`;
                ctx.fillStyle = `rgba(200, 194, 189, ${
          0.5 + Math.sin(time * 2 + i) * 0.3
        })`;
        ctx.fill();
      }

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div className="haos-page">
      <div className="background">
        <canvas ref={canvasRef}></canvas>
      </div>

      <div className="content">
        <div className="header">
          <div className="category">
            CATEGORY:
            <br />
            BRANDING
          </div>
          <div className="year">
            YEAR
            <br />
            2024
          </div>
          <div className="tech-category">
            TECH SOLUTIONS
            <br />
            AUTOMATION & ROBOTICS
          </div>
        </div>

        <div className="main-content">
          <div className="left-section">
            <h1>
              Noura
              <br />
              Altharwa
            </h1>
            <h2>
              Brand Concept &
              <br />
              Identity
            </h2>
          </div>

          {/* <div className="logo-section">
            <div className="logo">HAOS</div>
          </div> */}
        </div>

        <div className="footer">
          <div>
            <div className="quality-label">
              HIGH-QUALITY
              <br />
              DEVELOPMENT
            </div>
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
          </div>
          <div className="metric">+2K</div>
        </div>

        <div className="scroll-indicator"></div>
      </div>
    </div>
  );
};

export default Hero4;
