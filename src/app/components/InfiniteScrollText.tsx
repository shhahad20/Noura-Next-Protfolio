// InfiniteScrollSimple.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";

const PIXELS_PER_SECOND = 80; // increase = faster

const InfiniteScrollSimple: React.FC = () => {
  const [isArabic, setIsArabic] = useState(false);

  const arabicTexts = [
    "تطوير الأعمال",
    "قيادة الفرق",
    "تطوير تطبيقات الجوال",
    "خدمات الترجمة",
    "مُعلِّم",
    "فنّان",
  ];

  const englishTexts = [
    "Business Development",
    "Team Leadership",
    "Mobile App Development",
    "Translation Services",
    "Educator",
    "Artist",
  ];

  const texts = isArabic ? arabicTexts : englishTexts;

  // track contains TWO copies of the sequence (first + duplicate)
  const trackRef = useRef<HTMLDivElement | null>(null);
  const uidRef = useRef<string>(`inf-${Math.random().toString(36).slice(2,9)}`);
  const styleElRef = useRef<HTMLStyleElement | null>(null);
  const resizeTimerRef = useRef<number | null>(null);

  // generate the keyframe based on measured pixel width
  const createAnimation = () => {
    const track = trackRef.current;
    if (!track) return;

    // total track width = width of both halves (we render sequence + duplicate)
    const totalWidth = Math.ceil(track.scrollWidth || track.getBoundingClientRect().width || 0);
    if (!totalWidth) return;

    // distance to move = half the track (one sequence length)
    const distancePx = Math.ceil(totalWidth / 2);

    // duration based on pixel speed
    const duration = Math.max(6, Math.round((distancePx / PIXELS_PER_SECOND) * 10) / 10);

    const animName = `${uidRef.current}-kf`;

    // remove old style if exists
    if (styleElRef.current) {
      styleElRef.current.remove();
      styleElRef.current = null;
    }

    // create new style element with pixel-perfect keyframes
    const styleEl = document.createElement("style");
    styleEl.setAttribute("data-infscroll", uidRef.current);
    styleEl.textContent = `
      @keyframes ${animName} {
        from { transform: translate3d(0,0,0); }
        to   { transform: translate3d(-${distancePx}px,0,0); }
      }
      .${animName} {
        animation-name: ${animName};
        animation-duration: ${duration}s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        will-change: transform;
      }
    `;
    document.head.appendChild(styleEl);
    styleElRef.current = styleEl;

    // attach class to track
    track.classList.remove(...Array.from(track.classList).filter(c => c.startsWith(uidRef.current)));
    track.classList.add(`${animName}`);
  };

  // measure and create animation after render
  useEffect(() => {
    // wait a tick for DOM to render
    const id = window.setTimeout(createAnimation, 40);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [texts.join("|")]);

  // recompute on window resize (debounced)
  useEffect(() => {
    const handleResize = () => {
      if (resizeTimerRef.current) window.clearTimeout(resizeTimerRef.current);
      resizeTimerRef.current = window.setTimeout(() => {
        createAnimation();
        resizeTimerRef.current = null;
      }, 120);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimerRef.current) window.clearTimeout(resizeTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // cleanup on unmount
  useEffect(() => {
    return () => {
      if (styleElRef.current) styleElRef.current.remove();
      const track = trackRef.current;
      if (track) track.style.animation = "";
    };
  }, []);

  // render two copies to allow smooth -50% movement
  const firstSequence = (
    <div className="inf-seq" aria-hidden="true">
      {texts.map((txt, i) => (
        <div key={i} className={`inf-item ${isArabic ? "inf-item--ar" : ""}`} dir={isArabic ? "rtl" : "ltr"}>
          {txt}
        </div>
      ))}
    </div>
  );

  return (
    <div className="inf-root" style={{ fontFamily: isArabic ? "'Cairo','Tajawal',sans-serif" : "system-ui,-apple-system" }}>
      <div style={{ width: "100%", display: "flex", justifyContent: "center", marginBottom: 18 }}>
        <button
          onClick={() => setIsArabic(v => !v)}
          style={{
            padding: "8px 14px",
            borderRadius: 999,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "white",
            cursor: "pointer"
          }}
        >
          {isArabic ? "English" : "العربية"}
        </button>
      </div>

      <h2 className="inf-title">{isArabic ? "الكفاءات الأساسية" : "Core Competencies"}</h2>

      <div className="inf-viewport">
        <div
          className="inf-track"
          ref={trackRef}
          onMouseEnter={() => { if (trackRef.current) trackRef.current.style.animationPlayState = "paused"; }}
          onMouseLeave={() => { if (trackRef.current) trackRef.current.style.animationPlayState = "running"; }}
        >
          {firstSequence}
          {/* duplicate */}
          {firstSequence}
        </div>
      </div>

      {/* small styles for quick integration */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&family=Tajawal:wght@400;500;700&display=swap');

        .inf-root { padding: 20px; color: #e2e8f0; display: flex; flex-direction: column; align-items: center; min-height: 200px; }
        .inf-title { color: #fff; margin: 8px 0 20px; font-size: clamp(1.6rem, 4.5vw, 2.6rem); text-shadow: 0 6px 18px rgba(0,0,0,0.35); text-align: center; }
        .inf-viewport { width: 100%; max-width: 880px; overflow: hidden; -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%); mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%); padding: 10px 0; }
        .inf-track { display: flex; gap: 16px; align-items: center; width: max-content; transform: translate3d(0,0,0); }
        .inf-seq { display: flex; gap: 12px; align-items: center; }
        .inf-item {
          background: rgba(23,23,23,0.92);
          border: 1px solid #333;
          color: #e2e8f0;
          padding: 10px 20px;
          border-radius: 999px;
          font-weight: 600;
          font-size: clamp(0.95rem, 2.2vw, 1.15rem);
          white-space: nowrap;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          transition: transform 160ms ease, background 160ms ease, box-shadow 160ms ease;
          box-shadow: 0 8px 28px rgba(0,0,0,0.08);
          backdrop-filter: blur(6px);
        }
        .inf-item--ar { direction: rtl; text-align: right; unicode-bidi: isolate; }
        .inf-item:hover { transform: translateY(-6px) scale(1.03); filter: brightness(1.14); background: rgba(255,255,255,0.06); box-shadow: 0 14px 40px rgba(0,0,0,0.18); }
        /* pause on hover */
        .inf-track:hover { animation-play-state: paused; }
      `}</style>
    </div>
  );
};

export default InfiniteScrollSimple;
