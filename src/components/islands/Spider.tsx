import { useEffect, useState } from "react";
import {
  motion,
  type MotionValue,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import {
  ABDOMEN,
  CATCHLIGHTS,
  CEPHALOTHORAX,
  DRAGLINE_ANCHOR,
  EYES,
  LEGS,
  STROKE_WIDTH,
  VIEW_BOX,
  legPath,
} from "~/lib/mark";

/**
 * The spider — **the only ornament on this page, and it is named so that it
 * stays one.**
 *
 * It earns the exception because it is the brand rather than decoration.
 * portia is named for *Portia*, the jumping spider that plans a detour route to
 * its prey, out of sight of the target, executing a path it worked out in
 * advance. That is the product in one sentence. The dragline is not a liberty
 * either — jumping spiders trail one continuously, as a safety line.
 *
 * **Position alone reads as dead; velocity is what makes it alive.** Three
 * things are driven off the scroll and they are deliberately different
 * derivatives of it:
 *
 *   - **Position** → a spring, so the creature *lags* the page and settles with
 *     a little overshoot instead of being nailed to the scrollbar.
 *   - **Velocity** → rotation of the spider about the point the silk meets it,
 *     capped, so it *swings* when you scroll hard and hangs plumb at rest.
 *   - **Velocity** → the dragline's control point, so the silk *bows* rather
 *     than staying a rigid stick, and the jump-trail arcs fade in above a
 *     threshold and vanish at rest.
 *
 * Three constraints it is built around, all of them from LANDING.md:
 *
 *   - **Reduced motion renders it static**, parked at the top of its dragline.
 *     Not slower — static, and that resting state is the designed one.
 *   - **A dismiss that persists across sessions.** Some visitors will not want
 *     a spider tracking their scroll and the mark is not worth a bounce.
 *   - **Under 400px it does not render at all.** A creature that overlaps the
 *     reading column is not charming.
 */

const STORAGE_KEY = "portia-spider";

/** `{motion.spider-drop}` */
const DROP_SPRING = { stiffness: 90, damping: 18, mass: 1.1 };
/** `{motion.spider-swing}` */
const MAX_ROTATE = 14;
const VELOCITY_SCALE = 0.02;
/** `{motion.dragline-bow}` */
const MAX_BOW = 18;

/** The column the creature lives in, and the size it is drawn at. Both halve
 *  their presence on a narrow viewport rather than disappearing. */
const LANE = 96;
const SIZE_DESKTOP = 40;
const SIZE_NARROW = 28;

/** Where the silk starts: below the 56px nav, so the creature reads as hanging
 *  in the page rather than off the chrome. */
const TOP = 76;

export default function Spider() {
  const reduced = useReducedMotion();
  const [dismissed, setDismissed] = useState(true); // assume hidden until read
  const [narrow, setNarrow] = useState(false);
  const [tooNarrow, setTooNarrow] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      setDismissed(localStorage.getItem(STORAGE_KEY) === "hidden");
    } catch {
      setDismissed(false);
    }

    const narrowQ = window.matchMedia("(max-width: 850px)");
    const tinyQ = window.matchMedia("(max-width: 400px)");
    const sync = () => {
      setNarrow(narrowQ.matches);
      setTooNarrow(tinyQ.matches);
    };
    sync();
    setReady(true);
    narrowQ.addEventListener("change", sync);
    tinyQ.addEventListener("change", sync);
    return () => {
      narrowQ.removeEventListener("change", sync);
      tinyQ.removeEventListener("change", sync);
    };
  }, []);

  // --- the motion chain ---------------------------------------------------
  // Hooks run unconditionally; whether their output is *used* is decided below.
  const { scrollYProgress, scrollY } = useScroll();
  const travel = useMotionValue(0);

  const target = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const drop = useSpring(target, DROP_SPRING);
  const y = useTransform([drop, travel], ([d, t]) => TOP + (d as number) * (t as number));

  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, { stiffness: 120, damping: 30 });

  // Swing amplitude halves on a narrow viewport.
  const swingCap = narrow ? MAX_ROTATE / 2 : MAX_ROTATE;
  const rotate = useTransform(smoothVelocity, (v) =>
    clamp((v as number) * -VELOCITY_SCALE, -swingCap, swingCap),
  );
  const bow = useTransform(smoothVelocity, (v) =>
    clamp((v as number) * VELOCITY_SCALE * 1.3, -MAX_BOW, MAX_BOW),
  );

  // The jump trail: the logo's own motion arcs, reused. They fade in above a
  // velocity threshold and vanish at rest, which is the whole of their job.
  const trail = useTransform(smoothVelocity, (v) =>
    clamp((Math.abs(v as number) - 260) / 1400, 0, 0.55),
  );

  const [line, setLine] = useState("");
  const redraw = () => {
    const yv = y.get();
    const bv = bow.get();
    setLine(`M${LANE / 2} 0 Q${LANE / 2 + bv} ${yv / 2} ${LANE / 2} ${yv}`);
  };
  useMotionValueEvent(y, "change", redraw);
  useMotionValueEvent(bow, "change", redraw);

  // How far the creature may fall: the lane's height less its own size and a
  // little clearance at the foot. Measured, not assumed, because the viewport
  // changes under it.
  useEffect(() => {
    const size = narrow ? SIZE_NARROW : SIZE_DESKTOP;
    const measure = () =>
      travel.set(Math.max(0, window.innerHeight - TOP - size - 48));
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [narrow, travel]);

  useEffect(redraw, [narrow, ready]);

  if (!ready || dismissed || tooNarrow) return null;

  const size = narrow ? SIZE_NARROW : SIZE_DESKTOP;
  const scale = size / 32;

  const hide = () => {
    setDismissed(true);
    try {
      localStorage.setItem(STORAGE_KEY, "hidden");
    } catch {
      /* a visitor with storage blocked gets the dismiss for this page only */
    }
  };

  // The static resting state. Not a degraded animation — this is the designed
  // one, parked at the top of its dragline.
  if (reduced) {
    const parked = TOP + 40;
    return (
      <Lane>
        <svg
          className="spider__silk"
          width={LANE}
          height="100%"
          aria-hidden="true"
        >
          <path
            d={`M${LANE / 2} 0 L${LANE / 2} ${parked}`}
            stroke="var(--portia-hairline-strong)"
            strokeWidth="1"
            fill="none"
          />
        </svg>
        <div
          className="spider__body"
          style={{ transform: `translate(-50%, 0) translateY(${parked}px)` }}
        >
          <Creature size={size} trailOpacity={0} />
        </div>
        <Dismiss onClick={hide} top={parked + size + 10} />
      </Lane>
    );
  }

  return (
    <Lane>
      <svg
        className="spider__silk"
        width={LANE}
        height="100%"
        aria-hidden="true"
      >
        <path
          d={line}
          stroke="var(--portia-hairline-strong)"
          strokeWidth="1"
          fill="none"
        />
      </svg>

      <motion.div className="spider__body" style={{ y, x: "-50%" }}>
        <motion.div
          style={{
            rotate,
            transformOrigin: `${DRAGLINE_ANCHOR.x * scale}px ${DRAGLINE_ANCHOR.y * scale}px`,
          }}
        >
          <Creature size={size} trailOpacity={trail} />
        </motion.div>
      </motion.div>

      <motion.div className="spider__dismiss-wrap" style={{ y, x: "-50%" }}>
        <Dismiss onClick={hide} offset={size + 10} />
      </motion.div>
    </Lane>
  );
}

function Lane({ children }: { children: React.ReactNode }) {
  return (
    <div className="spider" aria-hidden="false">
      {children}
      <style>{LANE_CSS}</style>
    </div>
  );
}

/** The mark, plus the jump trail. Same geometry as the nav lockup — imported,
 *  never re-typed. */
function Creature({
  size,
  trailOpacity,
}: {
  size: number;
  /** A `MotionValue<number>` while the creature is animating, a plain `0` in
   *  the reduced-motion resting state — where the trail is simply absent. */
  trailOpacity: number | MotionValue<number>;
}) {
  return (
    <svg width={size} height={size} viewBox={VIEW_BOX} fill="none" role="img">
      <title>portia</title>

      {/* The jump trail — the logo's existing motion arcs, kept. */}
      <motion.g
        style={{ opacity: trailOpacity }}
        stroke="var(--portia-accent-text)"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      >
        <path d="M4.5 12 A13 13 0 0 1 16 2.6" />
        <path d="M2.6 20.5 A15.5 15.5 0 0 1 3.4 15" />
      </motion.g>

      <g
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g className="portia-mark__legs portia-mark__legs--right">
          {LEGS.map((leg, i) => (
            <path key={`r${i}`} d={legPath(leg)} />
          ))}
        </g>
        <g className="portia-mark__legs portia-mark__legs--left">
          {LEGS.map((leg, i) => (
            <path key={`l${i}`} d={legPath(leg, true)} />
          ))}
        </g>
        <ellipse {...ABDOMEN} fill="var(--portia-accent-text)" />
        <circle {...CEPHALOTHORAX} />
      </g>

      {EYES.map((e, i) => (
        <circle key={`e${i}`} {...e} fill="currentColor" />
      ))}
      {CATCHLIGHTS.map((c, i) => (
        <circle key={`c${i}`} {...c} fill="var(--portia-canvas)" />
      ))}
    </svg>
  );
}

function Dismiss({
  onClick,
  top,
  offset,
}: {
  onClick: () => void;
  top?: number;
  offset?: number;
}) {
  return (
    <button
      type="button"
      className="spider__dismiss"
      onClick={onClick}
      style={top !== undefined ? { top } : { marginTop: offset }}
      title="Hide the spider"
    >
      hide
    </button>
  );
}

function clamp(v: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, v));
}

/* Scoped to the island rather than global.css because nothing else on the page
   uses any of it, and the creature is the one thing here that is allowed to be
   its own world. */
const LANE_CSS = `
.spider {
  position: fixed;
  top: 0;
  right: 8px;
  width: ${LANE}px;
  height: 100vh;
  z-index: 30;
  pointer-events: none;
  color: var(--portia-ink);
}
.spider__silk { position: absolute; inset: 0; }
.spider__body,
.spider__dismiss-wrap {
  position: absolute;
  top: 0;
  left: 50%;
  will-change: transform;
}
.spider__dismiss {
  pointer-events: auto;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid var(--portia-hairline);
  background-color: var(--portia-surface-elevated);
  color: var(--portia-mute);
  border-radius: var(--radius-xs);
  font-family: var(--font-mono);
  font-size: 10px;
  line-height: 1;
  padding: 3px 5px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 160ms linear;
}
.spider:hover .spider__dismiss,
.spider__dismiss:focus-visible { opacity: 1; }

@media (max-width: 1240px) {
  /* Keep the creature out of the reading column once the page stops having
     margin to spare. */
  .spider { right: 0; width: ${LANE - 24}px; }
}
`;
