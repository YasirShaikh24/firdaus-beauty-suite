import { useEffect, useState } from "react";

const SplashScreen = ({ onDone }: { onDone: () => void }) => {
  const [phase, setPhase] = useState<"enter" | "hold" | "exit">("enter");

  useEffect(() => {
    // Slide in immediately, hold, then fade out
    const holdTimer  = setTimeout(() => setPhase("hold"), 100);
    const exitTimer  = setTimeout(() => setPhase("exit"), 4200);
    const doneTimer  = setTimeout(() => onDone(),         5000);

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
      <div className="relative flex items-center gap-6 md:gap-10">

        {/* LOGO — slides in from LEFT */}
        <div
          className="transition-all duration-700 ease-out"
          style={{
            transform: entered ? "translateX(0)" : "translateX(-120px)",
            opacity: entered ? 1 : 0,
            transitionDelay: "0ms",
          }}
        >
          <img
            src="/firdaus-makeover-logo.png"
            alt="Firdaus Makeover"
            className="w-28 h-28 md:w-40 md:h-40 rounded-full object-contain
                       shadow-[0_8px_32px_rgba(236,72,153,0.18)]
                       border-2 border-pink-200"
          />
        </div>

        {/* TEXT — slides in from RIGHT */}
        <div
          className="transition-all duration-700 ease-out"
          style={{
            transform: entered ? "translateX(0)" : "translateX(120px)",
            opacity: entered ? 1 : 0,
            transitionDelay: "80ms",
          }}
        >
          {/* FIRDAUS — pink, Playfair, bold — same as header */}
          <h1
            className="font-playfair font-bold leading-none"
            style={{
              fontSize: "clamp(3rem, 10vw, 5.5rem)",
              color: "hsl(345 70% 58%)",   /* --primary */
              letterSpacing: "0.04em",
            }}
          >
            FIRDAUS
          </h1>

          {/* MAKEOVER — dark/black, Playfair, bold — same as header sub */}
          <h2
            className="font-playfair font-bold leading-none"
            style={{
              fontSize: "clamp(1.6rem, 5.5vw, 3.2rem)",
              color: "hsl(345 15% 15%)",   /* --foreground */
              letterSpacing: "0.18em",
              marginTop: "0.1em",
            }}
          >
            MAKEOVER
          </h2>

          {/* Thin pink underline that grows in */}
          <div
            className="mt-3 h-0.5 rounded-full transition-all duration-700 ease-out"
            style={{
              background: "linear-gradient(90deg, hsl(345 70% 58%), hsl(335 65% 78%))",
              width: entered ? "100%" : "0%",
              transitionDelay: "350ms",
            }}
          />

          {/* Tagline */}
          <p
            className="mt-2 font-poppins text-xs md:text-sm tracking-widest uppercase
                       transition-all duration-500"
            style={{
              color: "hsl(345 15% 55%)",   /* --muted-foreground */
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
