"use client";
import React, { useEffect, useRef } from "react";
import "../styles/About2.scss";
import { useTranslation } from "react-i18next";
// import { motion, useInView } from "framer-motion";

const ScrollPetal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const petalRefs = useRef<Array<SVGPathElement | null>>([]);
  const textRefs = useRef<Array<HTMLDivElement | null>>([]);
  // const h2Ref = useRef(null);
  //   const pRef = useRef(null);
  
  // const h2InView = useInView(h2Ref, { once: true, margin: "-100px" });
  // const pInView = useInView(pRef, { once: true, margin: "-50px" });

  const { t, i18n } = useTranslation();

  // store lengths in a ref so changes don't retrigger renders
  const petalLengthsRef = useRef<number[]>([]);

  useEffect(() => {
    // measure lengths and initialize dash properties
    petalLengthsRef.current = petalRefs.current.map((p) =>
      p ? p.getTotalLength() : 0
    );

    petalRefs.current.forEach((p, i) => {
      if (!p) return;
      const len = petalLengthsRef.current[i];
      p.style.strokeDasharray = `${len}`;
      p.style.strokeDashoffset = `${len}`;
      // slower transition for smoother, slower drawing
      p.style.transition = `stroke-dashoffset 320ms linear`;
      // ensure rendering hints
      p.getBoundingClientRect();
    });

    const update = () => {
      const container = containerRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Avoid division by zero
      const denom = Math.max(1, containerRect.height - windowHeight);

      // total progress through the container (0..1)
      const totalProgress = Math.max(
        0,
        Math.min(1, (windowHeight - containerRect.top) / denom)
      );

      const petalsCount = petalRefs.current.length; // still 4
      const textsCount = textRefs.current.length; // now 6
      const baseSegment = 1 / petalsCount;

      // Stretch factor > 1 => each petal takes more scroll (slower drawing)
      const drawStretch = 1.6; // tweak this to make drawing even slower/faster
      const petalSpan = baseSegment * drawStretch;

      // Update each petal based on stretched window (may overlap with others)
      petalRefs.current.forEach((path, i) => {
        if (!path) return;
        const start = i * baseSegment;
        const end = Math.min(1, start + petalSpan);

        let localProgress =
          (totalProgress - start) / Math.max(1e-6, end - start);
        localProgress = Math.max(0, Math.min(1, localProgress));

        // You can apply easing here if you want non-linear draw:
        // localProgress = Math.pow(localProgress, 1); // linear
        const len = petalLengthsRef.current[i] || 0;
        const drawOffset = len * (1 - localProgress);
        path.style.strokeDashoffset = `${drawOffset}`;
      });

      // Cross-fade texts — use textsCount so each text has its own center
      const fadeRange = Math.max(0.18, (1 / textsCount) * 1.2); // wider visibility
      const halfFade = fadeRange / 2;

      textRefs.current.forEach((txt, i) => {
        if (!txt) return;
        const center = (i + 0.5) / textsCount;
        const dist = Math.abs(totalProgress - center);
        const opacity = Math.max(0, 1 - dist / halfFade);
        txt.style.opacity = `${opacity}`;
        const scale = 0.95 + 0.05 * opacity;
        txt.style.transform = `translateY(${
          (1 - opacity) * 6
        }px) scale(${scale})`;
      });
    };

    // initial call and listeners
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // helper to set refs in map
  const setPetalRef = (el: SVGPathElement | null, i: number) => {
    petalRefs.current[i] = el;
  };
  const setTextRef = (el: HTMLDivElement | null, i: number) => {
    textRefs.current[i] = el;
  };

  return (
    <div>
      {/* keep your inline CSS as before or move to SCSS file — unchanged */}
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0a0a; color: #fff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
        // .spacer { height: 50vh; }
        // .content-section { padding: 100px 5%; max-width: 1400px; margin: 0 auto; }
        // .content-section h2 { font-size: 48px; font-weight: 300; margin-bottom: 20px; letter-spacing: -0.02em; }
        .content-section p { font-size: 18px; line-height: 1.6;  max-width: 600px; }
        .svg-container { position: relative; width: 100%; height: 400vh; margin: 0px 0; }
        .svg-wrapper { position: sticky; top: 50%; transform: translateY(-50%); width: 100%; height: 100vh; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 60px; }
        svg { width: 40%; max-width: 400px; height: auto; display: block; }
        .draw-line { stroke: #fff; stroke-width: 3; fill: none; stroke-linejoin: round; stroke-linecap: round; }
        .text-container { position: relative; height: 120px; display: flex; align-items: center; justify-content: center; }
        .petal-text { position: absolute; font-size: 20px; font-weight: 300; letter-spacing: -0.02em; text-align: center; opacity: 0; transition: opacity 260ms linear, transform 260ms linear; will-change: opacity, transform; pointer-events: none; color: #fff; }
        .petal-text .prof-name { margin: 6px 0 0; font-size: 14px; color: #cfcfcf; }
        .petal-text .prod-date { margin: 2px 0 0; font-size: 13px; color: #a9a9a9; }
        // @media (max-width: 768px) {
        //   .content-section h2 { font-size: 32px; }
        //   .content-section p { font-size: 16px; }
        //   svg { width: 60%; }
        //   .petal-text { font-size: 16px; }
        // }
      `}</style>

      <div className="spacer" />

      {/* <div className="content-section">
        <motion.h2
          ref={h2Ref}
          initial={{ opacity: 0, y: 30 }}
          animate={h2InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {t("about.subtitle")}
        </motion.h2>

        <motion.p
          ref={pRef}
          initial={{ opacity: 0, y: 30 }}
          animate={pInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        >
          {t("about.subtext")}
        </motion.p>
      </div> */}

      <div className="svg-container" ref={containerRef}>
        <div className="svg-wrapper" aria-hidden={false}>
          <svg
            viewBox="0 0 256 256"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Decorative flower petals"
          >
            {/* Top Left */}
            <path
              className="draw-line"
              ref={(el) => setPetalRef(el, 0)}
              d="M 228 0 C 172.772 0 128 44.772 128 100 L 128 0 L 0 0 L 0 28 C 0 83.228 44.772 128 100 128 Z"
            />
            {/* Bottom Left */}
            <path
              className="draw-line"
              ref={(el) => setPetalRef(el, 1)}
              d="M 0 128 L 0 256 L 28 256 C 83.228 256 128 211.228 128 156 L 128 128 Z"
            />
            {/* Bottom Right */}
            <path
              className="draw-line"
              ref={(el) => setPetalRef(el, 2)}
              d="M 128 156 L 128 256 L 256 256 L 256 228 C 256 172.772 211.228 128 156 128 Z"
            />
            {/* Top Right */}
            <path
              className="draw-line"
              ref={(el) => setPetalRef(el, 3)}
              d="M 156 128 L 256 128 L 256 0 L 228 0 C 172.772 0 128 44.772 128 100 Z"
            />
          </svg>

          <div
            className={`text-container ${
              i18n.language === "ar" ? "text-container--ar" : ""
            }`}
            aria-hidden={false}
          >
            <div
              className="petal-text"
              ref={(el) => setTextRef(el, 0)}
              aria-live="polite"
            >
              {t("about2.exp1")}
              <p className="prof-name">{t("about2.exp1Desc")}</p>
              <p className="prod-date">2024 - 2025</p>
            </div>

            <div
              className="petal-text"
              ref={(el) => setTextRef(el, 1)}
              aria-live="polite"
            >
              {t("about2.exp2")}
              <p className="prof-name">{t("about2.exp2Desc")}</p>
              <p className="prod-date">2022 - 2024</p>
            </div>

            <div
              className="petal-text"
              ref={(el) => setTextRef(el, 2)}
              aria-live="polite"
            >
              {t("about2.exp3")}
              <p className="prof-name">{t("about2.exp3Desc")}</p>
              <p className="prod-date">2022 - 2024</p>
            </div>

            <div
              className="petal-text"
              ref={(el) => setTextRef(el, 3)}
              aria-live="polite"
            >
              {t("about2.exp4")}
              <p className="prof-name">{t("about2.exp4Desc")}</p>
              <p className="prod-date">2020 - Present</p>
            </div>

            {/* NEW: two additional text panels */}
            <div
              className="petal-text"
              ref={(el) => setTextRef(el, 4)}
              aria-live="polite"
            >
              {t("about2.exp5")}
              <p className="prof-name">{t("about2.exp5Desc")}</p>
              <p className="prod-date">2019 - 2021</p>
            </div>

            <div
              className="petal-text"
              ref={(el) => setTextRef(el, 5)}
              aria-live="polite"
            >
              {t("about2.exp6")}
              <p className="prof-name">{t("about2.exp6Desc")}</p>
              <p className="prod-date">2016 - 2018</p>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="content-section">
        <h2>Shape Complete</h2>
        <p>
          The entire shape has been drawn. Each petal revealed its message as it
          was being traced.
        </p>
      </div> */}

      {/* <div className="spacer" /> */}
    </div>
  );
};

export default ScrollPetal;
