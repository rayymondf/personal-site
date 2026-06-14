'use client'

export function SplineScene({ className }: { scene: string; className?: string }) {
  return (
    <div className={`relative w-full h-full flex items-center justify-center overflow-hidden select-none ${className ?? ''}`}>
      <style>{`
        @keyframes orbitX { from { transform: rotateX(0deg); } to { transform: rotateX(360deg); } }
        @keyframes orbitY { from { transform: rotateY(0deg); } to { transform: rotateY(360deg); } }
        @keyframes orbitZ { from { transform: rotateZ(0deg); } to { transform: rotateZ(360deg); } }
        @keyframes pulse-glow { 0%,100% { opacity:0.15; transform:scale(1); } 50% { opacity:0.35; transform:scale(1.08); } }
        @keyframes float-dot { 0%,100% { transform:translateY(0px); opacity:0.4; } 50% { transform:translateY(-10px); opacity:0.8; } }
        @keyframes dash-spin { from { stroke-dashoffset: 200; } to { stroke-dashoffset: 0; } }
        .orbit-x { animation: orbitX 12s linear infinite; transform-style: preserve-3d; }
        .orbit-y { animation: orbitY 18s linear infinite; transform-style: preserve-3d; }
        .orbit-z { animation: orbitZ 9s linear infinite reverse; transform-style: preserve-3d; }
      `}</style>

      {/* Glow backdrop */}
      <div className="absolute w-56 h-56 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%)', animation: 'pulse-glow 4s ease-in-out infinite' }} />

      {/* 3D orbit rings via SVG */}
      <svg className="absolute w-72 h-72 orbit-y" viewBox="0 0 200 200" fill="none">
        <ellipse cx="100" cy="100" rx="90" ry="28" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="8 4" />
      </svg>
      <svg className="absolute w-64 h-64 orbit-x" viewBox="0 0 200 200" fill="none">
        <ellipse cx="100" cy="100" rx="90" ry="28" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      </svg>
      <svg className="absolute w-80 h-80 orbit-z" viewBox="0 0 200 200" fill="none">
        <ellipse cx="100" cy="100" rx="90" ry="28" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="3 6" />
      </svg>

      {/* Static rings */}
      {[100, 145, 190].map((r, i) => (
        <div key={r} className="absolute rounded-full border border-white/[0.06]"
          style={{ width: r, height: r }} />
      ))}

      {/* Center core */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-20 h-20 rounded-full border border-white/25 flex items-center justify-center"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 80%)', boxShadow: '0 0 40px 4px rgba(255,255,255,0.05), inset 0 0 20px rgba(255,255,255,0.04)' }}>
          <div className="w-10 h-10 rounded-full border border-white/30"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)', animation: 'pulse-glow 3s ease-in-out infinite' }} />
        </div>
      </div>

      {/* Orbiting dot */}
      <div className="absolute w-48 h-48 orbit-y" style={{ transformOrigin: 'center' }}>
        <div className="absolute w-2 h-2 rounded-full bg-white/70 top-0 left-1/2 -translate-x-1/2"
          style={{ boxShadow: '0 0 6px 2px rgba(255,255,255,0.4)' }} />
      </div>

      {/* Floating particles */}
      {[
        { x: '22%', y: '20%', d: '0s', s: 3 }, { x: '75%', y: '25%', d: '0.7s', s: 2 },
        { x: '15%', y: '70%', d: '1.3s', s: 4 }, { x: '80%', y: '68%', d: '0.4s', s: 2 },
        { x: '55%', y: '12%', d: '1.0s', s: 3 }, { x: '88%', y: '45%', d: '1.7s', s: 2 },
        { x: '10%', y: '45%', d: '0.9s', s: 3 }, { x: '65%', y: '85%', d: '0.2s', s: 2 },
      ].map(({ x, y, d, s }, i) => (
        <div key={i} className="absolute rounded-full bg-white/40"
          style={{ width: s, height: s, left: x, top: y, animation: `float-dot 3.5s ease-in-out infinite`, animationDelay: d }} />
      ))}

      {/* Corner grid lines */}
      <svg className="absolute bottom-4 right-4 opacity-10 w-24 h-24" viewBox="0 0 80 80" fill="none">
        {[0,20,40,60,80].map(v => (
          <g key={v}>
            <line x1={v} y1="0" x2={v} y2="80" stroke="white" strokeWidth="0.5" />
            <line x1="0" y1={v} x2="80" y2={v} stroke="white" strokeWidth="0.5" />
          </g>
        ))}
      </svg>
    </div>
  )
}
