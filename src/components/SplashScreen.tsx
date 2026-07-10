import { useEffect, useState } from "react";

const SplashScreen = ({ onDone }: { onDone: () => void }) => {
  const [phase, setPhase] = useState<"enter" | "hold" | "exit">("enter");

  useEffect(() => {
    // Slide in immediately, hold, then fade out
    const holdTimer  = setTimeout(() => setPhase("hold"), 100);
    const exitTimer  = setTimeout(() => setPhase("exit"), 2300);
    const doneTimer  = setTimeout(() => onDone(),         3000);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  const entered = phase === "hold" || phase === "exit";
  const exiting = phase === "exit";

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center
        transition-opacity duration-700 ease-in-out
        ${exiting ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      style={{ background: "hsl(345 50% 98%)" }}   /* matches site --background */
    >
      {/* Very soft radial glow in centre */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, hsl(340 60% 94%), transparent 80%)",
        }}
      />

      {/* ── Main card ── */}
      <div className="relative flex items-center gap-4 md:gap-8 px-6 max-w-sm md:max-w-lg w-full">

        {/* LOGO — slides in from LEFT */}
        <div
          className="transition-all duration-700 ease-out flex-shrink-0"
          style={{
            transform: entered ? "translateX(0)" : "translateX(-120px)",
            opacity: entered ? 1 : 0,
            transitionDelay: "0ms",
          }}
        >
          <img
            src="/firdaus-makeover-logo.png"
            alt="Firdaus Makeover"
            className="w-20 h-20 md:w-28 md:h-28 rounded-full object-contain
                       shadow-[0_8px_32px_rgba(236,72,153,0.18)]
                       border-2 border-pink-200"
          />
        </div>

        {/* TEXT — slides in from RIGHT */}
        <div
          className="transition-all duration-700 ease-out min-w-0"
          style={{
            transform: entered ? "translateX(0)" : "translateX(120px)",
            opacity: entered ? 1 : 0,
            transitionDelay: "80ms",
          }}
        >
          {/* FIRDAUS — pink, Playfair, bold */}
          <h1
            className="font-playfair font-bold leading-none"
            style={{
              fontSize: "clamp(2.2rem, 8vw, 4.5rem)",
              color: "hsl(345 70% 58%)",
              letterSpacing: "0.04em",
            }}
          >
            FIRDAUS
          </h1>

          {/* MAKEOVER — dark, Playfair, bold */}
          <h2
            className="font-playfair font-bold leading-none"
            style={{
              fontSize: "clamp(1.1rem, 4vw, 2.4rem)",
              color: "hsl(345 15% 15%)",
              letterSpacing: "0.16em",
              marginTop: "0.1em",
            }}
          >
            MAKEOVER
          </h2>

          {/* Thin pink underline */}
          <div
            className="mt-2 h-0.5 rounded-full transition-all duration-700 ease-out"
            style={{
              background: "linear-gradient(90deg, hsl(345 70% 58%), hsl(335 65% 78%))",
              width: entered ? "100%" : "0%",
              transitionDelay: "350ms",
            }}
          />

          {/* Tagline */}
          <p
            className="mt-1.5 font-poppins text-[10px] md:text-xs tracking-widest uppercase
                       transition-all duration-500"
            style={{
              color: "hsl(345 15% 55%)",
              opacity: entered ? 1 : 0,
              transitionDelay: "500ms",
            }}
          >
            Where Beauty Meets Elegance
          </p>
        </div>
      </div>

      {/* Animated dots at bottom */}
      <div
        className="absolute bottom-12 flex gap-2 transition-opacity duration-500"
        style={{ opacity: exiting ? 0 : entered ? 1 : 0, transitionDelay: "600ms" }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="block w-2 h-2 rounded-full"
            style={{
              background: "hsl(345 70% 58%)",
              animation: "splashDot 1.2s ease-in-out infinite",
              animationDelay: `${i * 0.22}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SplashScreen;
