import { useEffect, useRef, useState } from "react";

import {
  FORMATIONS,
  VIEW,
  shapePath,
  type FormationName,
} from "~/lib/formations";

/**
 * The "How it works" swarm — **one cloud of points that settles into each of
 * the three formations in turn.**
 *
 * It replaces the three small linework icons that used to sit at the foot of
 * the three columns. Those were fine and they are still drawn, on `/icons`,
 * which is now their only home. What they could not do is say the thing the
 * section is actually about: that measuring, building on what was measured and
 * remembering it are not three features, they are one body of facts seen three
 * ways. Three separate drawings in three separate columns say the opposite.
 *
 * So: **the point count never changes.** Not between formations, not on resize,
 * not ever. Nothing is added when the swarm becomes the pipeline and nothing is
 * dropped when it becomes the graph — the same 720 points rearrange. That is
 * the whole argument of the section, and it is also the ranking rule doing its
 * job: equal count, equal dot size, equal colour, so no formation can read as
 * bigger or better than another. The one thing that does differ is *density*,
 * because the three drawings hold different amounts of ink and the sampler
 * spaces points evenly along it. Density follows the drawing, not the rank.
 *
 * ---
 *
 * **How a formation becomes points.** `~/lib/formations` hands over shapes;
 * `shapePath` turns each into path data; a detached `<svg>` measures it with
 * `getTotalLength`, and the sampler walks the concatenated ink taking a point
 * every `total / 720`. Two consequences worth knowing:
 *
 *  - Spacing is uniform *along the stroke*, so a long flank and a small circle
 *    get points at the same pitch and the drawing reads at one weight.
 *  - Point `i` lands at the same **fraction of ink** in every formation. That is
 *    the whole of the morph's coherence: because the shape lists are declared
 *    containers-first, the cloud reorganises in a readable sweep instead of
 *    every point taking an unrelated diagonal.
 *
 * **How it moves.** Three forces, and the second and third are what stop it
 * looking like a slideshow of three states:
 *
 *  - **A spring to the target, with per-point stiffness.** A single stiffness
 *    moves the whole cloud in lockstep, which reads as one object being
 *    dragged. Randomising it across a 3× range is what makes the transition
 *    arrive in a wave.
 *  - **An impulse on every change.** The cloud is kicked apart the instant a
 *    formation changes and re-gathers. Without it the points slide between two
 *    drawings and you can see the correspondence, which looks mechanical; with
 *    it, the swarm scatters and settles, which is what a swarm does.
 *  - **A low-amplitude per-point wander.** Under a pixel. It is the difference
 *    between a settled swarm and a bitmap.
 *
 * Plus the pointer: points inside a radius of the cursor are pushed out of its
 * way and fall back when it leaves. It is the only thing on this page that
 * responds to a cursor at all, and it is deliberately soft — the drawing must
 * stay legible while you are disturbing it.
 *
 * **Reduced motion renders it static**, at the exact sampled coordinates of the
 * active formation, with no loop, no wander and no pointer response. That state
 * is the designed one: it is the linework icon, in dots. Changing formation
 * still works and snaps.
 *
 * The loop is also parked whenever the stage is off-screen, so a page left open
 * on another section costs nothing.
 */

export interface SwarmItem {
  index: string;
  title: string;
  body: string;
  formation: FormationName;
}

/** Never varies. See the header — this is the section's argument, not a knob. */
const COUNT = 720;

/** Fraction of the stage kept clear on each side. */
const PAD = 0.05;

const DAMP = 0.86;
/** Per-point spring stiffness, randomised across this range. */
const K_MIN = 0.014;
const K_MAX = 0.045;
/** Velocity added to every point when the formation changes. */
const BURST = 3.4;

const TAU = Math.PI * 2;
const SVG_NS = "http://www.w3.org/2000/svg";

/**
 * Walk the concatenated ink of a formation and take `COUNT` evenly spaced
 * points, in the 0–64 coordinate space the shapes are declared in.
 *
 * The `<svg>` is attached to the document for the duration: detached path
 * measurement is well supported now but has been flaky historically, and this
 * runs three times per page load.
 */
function sample(name: FormationName): Float32Array {
  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute(
    "style",
    "position:absolute;width:0;height:0;overflow:hidden;visibility:hidden",
  );
  document.body.appendChild(svg);

  const paths = FORMATIONS[name].map((s) => {
    const p = document.createElementNS(SVG_NS, "path");
    p.setAttribute("d", shapePath(s));
    svg.appendChild(p);
    return p;
  });

  const lengths = paths.map((p) => p.getTotalLength());
  const total = lengths.reduce((a, b) => a + b, 0);

  const out = new Float32Array(COUNT * 2);
  // `s` only ever increases, so the segment cursor walks forward once.
  let seg = 0;
  let base = 0;
  for (let i = 0; i < COUNT; i++) {
    const s = ((i + 0.5) / COUNT) * total;
    while (seg < lengths.length - 1 && s > base + lengths[seg]) {
      base += lengths[seg];
      seg++;
    }
    const pt = paths[seg].getPointAtLength(Math.min(s - base, lengths[seg]));
    out[i * 2] = pt.x;
    out[i * 2 + 1] = pt.y;
  }

  svg.remove();
  return out;
}

export default function PrincipleSwarm({ items }: { items: SwarmItem[] }) {
  const [active, setActive] = useState(0);

  const listRef = useRef<HTMLOListElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /** Read by the loop, which must not re-subscribe when the selection moves. */
  const activeRef = useRef(0);
  const burstRef = useRef(false);
  const drawStaticRef = useRef<(() => void) | null>(null);

  /* -- selection follows the scroll ------------------------------------- *
   * The root is collapsed to a zero-height line across the middle of the
   * viewport, so the item crossing that line is the active one. Hover writes
   * to the same state and whichever happened last wins — a visitor who has
   * pointed at something has said what they want to see. */
  useEffect(() => {
    const list = listRef.current;
    if (!list || !("IntersectionObserver" in window)) return;

    const rows = Array.from(
      list.querySelectorAll<HTMLElement>("[data-swarm-item]"),
    );
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActive(Number((e.target as HTMLElement).dataset.swarmItem));
          }
        }
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );
    rows.forEach((r) => io.observe(r));
    return () => io.disconnect();
  }, [items.length]);

  /* -- tell the loop, and kick the cloud --------------------------------- */
  useEffect(() => {
    if (activeRef.current === active) return;
    activeRef.current = active;
    burstRef.current = true;
    drawStaticRef.current?.();
  }, [active]);

  /* -- the swarm --------------------------------------------------------- */
  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedQ = window.matchMedia("(prefers-reduced-motion: reduce)");
    const schemeQ = window.matchMedia("(prefers-color-scheme: dark)");

    const formations = items.map((it) => sample(it.formation));

    // Per-point state. Positions start scattered across the stage so the first
    // arrival is the cloud gathering rather than a drawing switching on.
    const px = new Float32Array(COUNT);
    const py = new Float32Array(COUNT);
    const vx = new Float32Array(COUNT);
    const vy = new Float32Array(COUNT);
    const stiff = new Float32Array(COUNT);
    const phase = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      stiff[i] = K_MIN + Math.random() * (K_MAX - K_MIN);
      phase[i] = Math.random() * TAU;
    }

    let size = 0;
    let scale = 1;
    let originX = 0;
    let originY = 0;
    let dot = 1.4;
    let wander = 1;
    let pointerR = 90;
    let seeded = false;
    let ink = "#6B7079";

    const readInk = () => {
      ink = getComputedStyle(canvas).color || ink;
    };

    const layout = () => {
      const rect = stage.getBoundingClientRect();
      size = Math.min(rect.width, rect.height);
      if (size <= 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      scale = (size * (1 - PAD * 2)) / VIEW;
      originX = (rect.width - VIEW * scale) / 2;
      originY = (rect.height - VIEW * scale) / 2;
      dot = Math.max(0.9, size / 320);
      wander = size / 520;
      pointerR = size * 0.22;

      if (!seeded) {
        for (let i = 0; i < COUNT; i++) {
          px[i] = Math.random() * rect.width;
          py[i] = Math.random() * rect.height;
        }
        seeded = true;
      }
    };

    const targetX = (i: number) =>
      originX + formations[activeRef.current][i * 2] * scale;
    const targetY = (i: number) =>
      originY + formations[activeRef.current][i * 2 + 1] * scale;

    const paint = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = ink;
      ctx.beginPath();
      for (let i = 0; i < COUNT; i++) {
        ctx.moveTo(px[i] + dot, py[i]);
        ctx.arc(px[i], py[i], dot, 0, TAU);
      }
      ctx.fill();
    };

    /** The reduced-motion rendering, and the resize path for it. */
    const drawStatic = () => {
      if (!reducedQ.matches || size <= 0) return;
      for (let i = 0; i < COUNT; i++) {
        px[i] = targetX(i);
        py[i] = targetY(i);
      }
      paint();
    };
    drawStaticRef.current = drawStatic;

    // -- pointer -----------------------------------------------------------
    let pointerX = 0;
    let pointerY = 0;
    let pointerOn = false;
    const onMove = (e: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      pointerX = e.clientX - rect.left;
      pointerY = e.clientY - rect.top;
      pointerOn = true;
    };
    const onLeave = () => {
      pointerOn = false;
    };
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerleave", onLeave);

    // -- the loop ----------------------------------------------------------
    let raf = 0;
    let running = false;

    const step = (now: number) => {
      const t = now / 1000;
      const burst = burstRef.current;
      burstRef.current = false;

      for (let i = 0; i < COUNT; i++) {
        const tx = targetX(i) + Math.sin(t * 0.7 + phase[i]) * wander;
        const ty = targetY(i) + Math.cos(t * 0.55 + phase[i] * 1.3) * wander;

        vx[i] += (tx - px[i]) * stiff[i];
        vy[i] += (ty - py[i]) * stiff[i];

        if (burst) {
          const a = Math.random() * TAU;
          const m = BURST * (0.4 + Math.random());
          vx[i] += Math.cos(a) * m;
          vy[i] += Math.sin(a) * m;
        }

        if (pointerOn) {
          const dx = px[i] - pointerX;
          const dy = py[i] - pointerY;
          const d2 = dx * dx + dy * dy;
          if (d2 < pointerR * pointerR && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const f = (1 - d / pointerR) ** 2 * 3.2;
            vx[i] += (dx / d) * f;
            vy[i] += (dy / d) * f;
          }
        }

        vx[i] *= DAMP;
        vy[i] *= DAMP;
        px[i] += vx[i];
        py[i] += vy[i];
      }

      paint();
      raf = requestAnimationFrame(step);
    };

    const start = () => {
      if (running || reducedQ.matches) return;
      running = true;
      raf = requestAnimationFrame(step);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // -- wiring ------------------------------------------------------------
    readInk();
    layout();
    drawStatic();

    const ro = new ResizeObserver(() => {
      layout();
      drawStatic();
    });
    ro.observe(stage);

    // Park the loop whenever the stage is off-screen.
    const vis = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? start() : stop()),
      { threshold: 0 },
    );
    vis.observe(stage);

    const onScheme = () => {
      readInk();
      drawStatic();
    };
    const onReduced = () => {
      stop();
      if (reducedQ.matches) drawStatic();
      else start();
    };
    schemeQ.addEventListener("change", onScheme);
    reducedQ.addEventListener("change", onReduced);

    return () => {
      stop();
      ro.disconnect();
      vis.disconnect();
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
      schemeQ.removeEventListener("change", onScheme);
      reducedQ.removeEventListener("change", onReduced);
      drawStaticRef.current = null;
    };
  }, [items]);

  /* -- markup ------------------------------------------------------------ *
   * The stage is `aria-hidden` and nothing here is focusable, which is
   * deliberate: the swarm carries no information the three paragraphs beside it
   * do not already carry, so three tab stops that only redraw a decoration
   * would be noise in a keyboard path. Selection is pointer and scroll only.
   *
   * The active row is marked with a rule that fills and an index that goes from
   * `ash` to `ink`. That is selection *state* — a cursor — and not a rank: it
   * moves, it is never on two rows at once, and the three rows are identical in
   * size, colour and weight at every other moment. */
  return (
    <div className="swarm">
      <ol className="swarm__list" ref={listRef}>
        {items.map((it, i) => (
          <li
            key={it.index}
            data-swarm-item={i}
            className={`swarm__item${i === active ? " is-active" : ""}`}
            onPointerEnter={() => setActive(i)}
          >
            <span className="swarm__index">{it.index}</span>
            <h3 className="swarm__title">{it.title}</h3>
            <p className="swarm__body">{it.body}</p>
          </li>
        ))}
      </ol>

      <div className="swarm__stage" ref={stageRef} aria-hidden="true">
        <canvas ref={canvasRef} className="swarm__canvas" />
      </div>
    </div>
  );
}
