import React from 'react';

const FancyButton = ({
  as = 'button',
  href,
  onClick,
  children,
  className = '',
  size = 'md', // sm | md | lg
  disabled = false,
  ...props
}) => {
  const Component = as === 'a' ? 'a' : 'button';

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs gap-1 min-w-[44px] h-[36px]',
    md: 'px-4 py-2 text-sm gap-2 min-w-[80px] h-[44px]',
    lg: 'px-5 py-3 text-base gap-3 min-w-[120px] h-[52px]',
  };

  return (
    <Component
      href={href}
      onClick={disabled ? undefined : onClick}
      aria-disabled={disabled}
      className={`liquid-btn relative inline-flex items-center justify-center overflow-hidden ${sizeClasses[size]} rounded-full font-semibold transition-all duration-300 ${disabled ? 'opacity-40 cursor-not-allowed scale-100' : 'hover:-translate-y-0.5 active:scale-95'} focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-300 ${className}`}
      {...(Component === 'a' ? { target: props.target || undefined, rel: props.rel || undefined } : {})}
      {...props}
    >
      {/* Layer: subtle frosted backdrop */}
      <span className="liquid-surface" aria-hidden="true" />

      {/* Layer: gradient rim (stroke) */}
      <span className="liquid-rim" aria-hidden="true" />

      {/* Layer: moving color blob for soft liquid feel */}
      <span className="liquid-blob" aria-hidden="true" />

      {/* Layer: low-intensity sheen */}
      <span className="liquid-sheen" aria-hidden="true" />

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2 whitespace-nowrap text-white">{children}</span>

      {/* Local styles for refined Liquid Glass */}
      <style>{`
        .liquid-btn { --rim-alpha: 0.14; --surface-alpha: 0.06; --accent-1: 114, 99, 237; --accent-2: 236, 72, 153; }

        .liquid-surface {
          position: absolute; inset: 0; border-radius: 9999px;
          background: linear-gradient(180deg, rgba(255,255,255,var(--surface-alpha)) 0%, rgba(255,255,255,0.02) 60%);
          backdrop-filter: blur(8px) saturate(110%);
          -webkit-backdrop-filter: blur(8px) saturate(110%);
          border: 1px solid rgba(255,255,255,0.04);
          box-shadow: 0 6px 18px rgba(16,15,31,0.28), inset 0 1px 0 rgba(255,255,255,0.03);
          pointer-events: none;
        }

        .liquid-rim {
          position: absolute; inset: -1px; border-radius: 9999px; pointer-events: none;
          background: linear-gradient(90deg, rgba(var(--accent-1), var(--rim-alpha)) 0%, rgba(var(--accent-2), var(--rim-alpha)) 100%);
          mask: linear-gradient(#000 0 0); /* ensures only rim visible when combined with surface */
          filter: blur(6px) saturate(120%);
          mix-blend-mode: screen;
        }

        .liquid-blob {
          position: absolute; top: -25%; left: -30%; width: 60%; height: 160%; border-radius: 40%;
          background: radial-gradient(closest-side, rgba(var(--accent-2),0.12) 0%, rgba(var(--accent-1),0.06) 40%, transparent 60%);
          transform: rotate(-12deg);
          filter: blur(18px);
          opacity: 0.95;
          transition: transform 600ms cubic-bezier(.2,.9,.2,1), opacity 400ms;
          pointer-events: none;
          animation: blobMove 6s ease-in-out infinite;
        }

        .liquid-sheen {
          position: absolute; left: -50%; top: -10%; width: 40%; height: 120%; transform: skewX(-18deg);
          background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0) 100%);
          filter: blur(6px);
          opacity: 0.45;
          transition: opacity 250ms;
          pointer-events: none;
        }

        .liquid-btn:hover .liquid-sheen { opacity: 0.62; }
        .liquid-btn:hover .liquid-blob { transform: translateX(8%) rotate(-10deg); opacity: 1; }

        @keyframes blobMove {
          0% { transform: translateX(-6%) rotate(-12deg); }
          50% { transform: translateX(8%) rotate(-10deg); }
          100% { transform: translateX(-6%) rotate(-12deg); }
        }

        /* accessibility: respect prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          .liquid-blob { animation: none; transition: none; opacity: 0.6; }
          .liquid-sheen { animation: none; transition: none; opacity: 0.35; }
        }

        /* make inner text slightly bolder on hover */
        .liquid-btn:hover .z-10 { transform: translateY(-1px); }

        /* ensure anchor buttons look clickable */
        .liquid-btn[aria-disabled='true'] { pointer-events: none; }

      `}</style>
    </Component>
  );
};

export default FancyButton;
