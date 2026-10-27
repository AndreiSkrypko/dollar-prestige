import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from "react";

/** Gold "$" sparks follow the cursor; clicks rain bills and show +$ amounts. */
export function MoneyCursor({ onEarn }: { onEarn: (n: number) => void }) {
  const layer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = layer.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    let last = 0;
    const move = (e: PointerEvent) => {
      const now = performance.now();
      if (now - last < 45) return;
      last = now;
      const s = document.createElement("span");
      s.textContent = "$";
      s.className = "pointer-events-none absolute font-display text-gold";
      const size = 10 + Math.random() * 12;
      Object.assign(s.style, {
        left: `${e.clientX}px`, top: `${e.clientY}px`, fontSize: `${size}px`,
        transition: "transform 900ms ease-out, opacity 900ms ease-out",
        transform: "translate(-50%,-50%)", opacity: "0.9",
      });
      el.appendChild(s);
      requestAnimationFrame(() => {
        s.style.transform = `translate(${-50 + (Math.random() - 0.5) * 120}%, ${-50 + 60 + Math.random() * 80}%) rotate(${(Math.random() - 0.5) * 90}deg)`;
        s.style.opacity = "0";
      });
      setTimeout(() => s.remove(), 950);
    };
    const click = (e: globalThis.MouseEvent) => {
      const amount = [1, 5, 10, 20, 50, 100][Math.floor(Math.random() * 6)];
      onEarn(amount);
      const p = document.createElement("span");
      p.textContent = `+$${amount}`;
      p.className = "pointer-events-none absolute font-mono text-lg font-bold text-gold-gradient";
      Object.assign(p.style, { left: `${e.clientX}px`, top: `${e.clientY}px`, animation: "pop 1.1s ease-out forwards" });
      el.appendChild(p);
      setTimeout(() => p.remove(), 1150);
      for (let i = 0; i < 7; i++) {
        const b = document.createElement("span");
        b.className = "pointer-events-none absolute rounded-[3px] border border-gold/60 bg-bill shadow-deep flex items-center justify-center font-display text-[10px] text-gold";
        b.textContent = "$";
        Object.assign(b.style, {
          left: `${e.clientX}px`, top: `${e.clientY}px`, width: "42px", height: "20px",
          ["--dx" as string]: `${(Math.random() - 0.5) * 300}px`,
          ["--rot" as string]: `${(Math.random() - 0.5) * 720}deg`,
          animation: `fall ${1.6 + Math.random() * 1.4}s cubic-bezier(.3,.1,.6,1) forwards`,
          animationDelay: `${i * 30}ms`,
        });
        el.appendChild(b);
        setTimeout(() => b.remove(), 3200);
      }
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("click", click);
    return () => { window.removeEventListener("pointermove", move); window.removeEventListener("click", click); };
  }, [onEarn]);
  return <div ref={layer} className="pointer-events-none fixed inset-0 z-[60] overflow-hidden" aria-hidden />;
}

/** 3D tilt with glare that follows the mouse. */
export function Tilt({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [glare, setGlare] = useState({ x: 50, y: 50 });
  const onMove = (e: MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    ref.current!.style.transform = `perspective(1100px) rotateY(${(x - 0.5) * 16}deg) rotateX(${(0.5 - y) * 12}deg)`;
    setGlare({ x: x * 100, y: y * 100 });
  };
  const reset = () => { if (ref.current) ref.current.style.transform = "perspective(1100px)"; };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={reset} className={`relative transition-transform duration-200 ease-out [transform-style:preserve-3d] ${className}`}>
      {children}
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-overlay"
        style={{ background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, oklch(1 0 0 / 35%), transparent 45%)` }} />
    </div>
  );
}

/** Button that is pulled toward the cursor. */
export function Magnetic({ children, className = "", href }: { children: ReactNode; className?: string; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  return (
    <a ref={ref} href={href}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        ref.current!.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.3}px, ${(e.clientY - r.top - r.height / 2) * 0.4}px)`;
      }}
      onMouseLeave={() => { ref.current!.style.transform = ""; }}
      className={`relative inline-flex items-center gap-2 overflow-hidden transition-transform duration-200 ${className}`}>
      {children}
    </a>
  );
}

/** Count-up number when scrolled into view. */
export function CountUp({ to, prefix = "", suffix = "", duration = 1600 }: { to: number; prefix?: string; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / duration);
        setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{prefix}{v.toLocaleString("ru-RU")}{suffix}</span>;
}
