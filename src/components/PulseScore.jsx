import { useEffect, useRef } from 'react';
import trendIcon from '../assets/Trend.svg';
import graphArrow from '../assets/Graph Arrow.svg';

const SCORE       = 82;
const START_ANGLE = 90;                                     // right end = 0
const END_ANGLE   = 90 - (SCORE / 100) * 180;              // −57.6° → score position (0=right, 100=left)
const DURATION    = 1600;                         // ms

export default function PulseScore() {
  const cardRef      = useRef(null);
  const groupRef     = useRef(null);
  const rafRef       = useRef(null);
  const triggeredRef = useRef(false);             // ref not state — avoids re-render

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    /* Set arrow to start position immediately */
    if (groupRef.current) {
      groupRef.current.setAttribute('transform', `rotate(${START_ANGLE}, 200, 190)`);
    }

    const runAnimation = () => {
      if (triggeredRef.current) return;
      triggeredRef.current = true;

      const startTime = performance.now();

      const tick = (now) => {
        const elapsed  = now - startTime;
        const progress = Math.min(elapsed / DURATION, 1);
        /* Ease-out cubic */
        const eased    = 1 - Math.pow(1 - progress, 3);
        const angle    = START_ANGLE + (END_ANGLE - START_ANGLE) * eased;

        if (groupRef.current) {
          groupRef.current.setAttribute('transform', `rotate(${angle}, 200, 190)`);
        }

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(tick);
        }
      };

      rafRef.current = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          runAnimation();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(card);

    return () => {
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []); /* run once on mount — no deps so cleanup never re-cancels the RAF */

  return (
    <div className="pulse-card" id="pulse-card" ref={cardRef}>
      {/* Header Row */}
      <div className="pulse-header">
        <h3 className="pulse-card-title">This week's Pulse Score</h3>
        <span className="pulse-premium-badge">Premium</span>
      </div>

      {/* Body Area */}
      <div className="pulse-body">
        {/* Left Column: Gauge Area */}
        <div className="pulse-gauge-column">
          <div className="pulse-gauge-container">
            <svg viewBox="0 0 400 210" className="pulse-gauge-svg" aria-hidden="true">
              {/* Left segment */}
              <path
                d="M 28 190 A 172 172 0 0 1 103.82 47.41 L 122.88 80.42 A 134 134 0 0 0 66 190 Z"
                fill="#98EC6D"
                stroke="#98EC6D"
                strokeWidth="16"
                strokeLinejoin="round"
              />
              {/* Middle segment */}
              <path
                d="M 124.60 35.41 A 172 172 0 0 1 275.40 35.41 L 256.34 68.42 A 134 134 0 0 0 143.66 68.42 Z"
                fill="#C6F194"
                stroke="#C6F194"
                strokeWidth="16"
                strokeLinejoin="round"
              />
              {/* Right segment */}
              <path
                d="M 296.18 47.41 A 172 172 0 0 1 372 190 L 334 190 A 134 134 0 0 0 277.12 80.42 Z"
                fill="#E2F8D3"
                stroke="#E2F8D3"
                strokeWidth="16"
                strokeLinejoin="round"
              />
              {/* Grade Letter */}
              <text x="195" y="196" fill="#FFFFFF" fontSize="120" fontWeight="800" textAnchor="middle">
                A
              </text>

              {/* ── Animated Arc Pointer Arrow ──
                  Starts at left (−90°), sweeps to score position on scroll-into-view */}
              {/* Sweeps right (+90°) → left, stopping at score position */}
              <g ref={groupRef} transform={`rotate(${START_ANGLE}, 200, 190)`}>
                <svg
                  x="181"
                  y="2"
                  width="38"
                  height="32"
                  viewBox="0 0 11 9"
                >
                  <path d="M5.19629 9L0.000136209 -2.51246e-08L10.3924 8.834e-07L5.19629 9Z" fill="#008C45"/>
                </svg>
              </g>
            </svg>
          </div>
          {/* Grade Capsule */}
          <div className="pulse-grade-capsule">
            Grade 20 - 100
          </div>
        </div>

        {/* Right Column: Score Stats */}
        <div className="pulse-stats-column">
          <div className="pulse-score-row">
            <span className="pulse-score-value">{SCORE}</span>
            <span className="pulse-score-total">/100</span>
            <span className="pulse-trend" aria-label="Trend: Up by 6 points vs last week">
              <img src={trendIcon} className="pulse-trend-icon" alt="" />
              +6 vs last week
            </span>
          </div>
          <p className="pulse-status-text">Grade A · Excellent Health</p>
        </div>
      </div>

      {/* Divider */}
      <hr className="pulse-divider" />

      {/* Footer */}
      <div className="pulse-footer">
        <span className="pulse-updated-text">Updated 12 mins ago</span>
        <button className="pulse-view-plans-btn" type="button" id="view-plans-btn">
          View Plans
        </button>
      </div>
    </div>
  );
}
