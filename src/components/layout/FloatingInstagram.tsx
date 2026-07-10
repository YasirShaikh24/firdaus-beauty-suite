import { useState, useEffect } from "react";

const FloatingInstagram = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    // Show tooltip after 30 seconds
    const showTimer = setTimeout(() => {
      setShowTooltip(true);
      setBlink(true);
    }, 30000);

    // Hide tooltip 4 seconds after showing
    const hideTimer = setTimeout(() => {
      setShowTooltip(false);
      setBlink(false);
    }, 34000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start">
      {/* Tooltip label */}
      <div
        className={`
          mb-3 flex items-center transition-all duration-500
          ${showTooltip ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}
        `}
      >
        <div
          className={`
            relative px-4 py-2 rounded-full text-white text-sm font-semibold shadow-lg
            bg-gradient-to-r from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888]
            ${blink ? "animate-instagram-blink" : ""}
          `}
        >
          ✨ For More Posts
          {/* Arrow pointing down-left toward the button */}
          <span className="absolute -bottom-1.5 left-5 w-3 h-3 rotate-45 bg-[#dc2743]" />
        </div>
      </div>

      {/* Instagram Button */}
      <a
        href="https://www.instagram.com/firdaus_makeover?igsh=MXJlemE0aWZoMzAxaw=="
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow us on Instagram"
        className="
          h-14 w-14 rounded-full flex items-center justify-center
          shadow-lg hover:shadow-xl
          transition-all duration-300 hover:scale-110 active:scale-95
          animate-float
        "
        style={{
          background: "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
        }}
      >
        {/* Real Instagram SVG icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          className="h-7 w-7"
          aria-hidden="true"
        >
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      </a>
    </div>
  );
};

export default FloatingInstagram;
