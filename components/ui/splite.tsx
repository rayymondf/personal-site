'use client'

export function SplineScene({ className }: { scene: string; className?: string }) {
  return (
    <div className={`relative w-full h-full flex items-center justify-center overflow-hidden ${className ?? ''}`}>
      {/* Animated orb / grid visual */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Outer rings */}
        {[160, 220, 280, 340].map((size, i) => (
          <div
            key={size}
            className="absolute rounded-full border border-white/[0.06]"
            style={{
              width: size,
              height: size,
              animation: `spin ${14 + i * 4}s linear infinite ${i % 2 === 0 ? '' : 'reverse'}`,
            }}
          />
        ))}

        {/* Rotating dashed ring */}
        <div
          className="absolute rounded-full border border-dashed border-white/[0.12]"
          style={{ width: 200, height: 200, animation: 'spin 8s linear infinite' }}
        />

        {/* Center glowing orb */}
        <div className="relative z-10 flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-white/5 border border-white/20 flex items-center justify-center"
            style={{ boxShadow: '0 0 40px 8px rgba(255,255,255,0.06)' }}>
            <div className="w-8 h-8 rounded-full bg-white/10 border border-white/30"
              style={{ boxShadow: '0 0 20px 4px rgba(255,255,255,0.1)' }} />
          </div>
        </div>

        {/* Floating dots */}
        {[
          { x: '30%', y: '25%', delay: '0s', size: 4 },
          { x: '70%', y: '35%', delay: '0.8s', size: 3 },
          { x: '20%', y: '65%', delay: '1.4s', size: 5 },
          { x: '75%', y: '70%', delay: '0.3s', size: 3 },
          { x: '50%', y: '15%', delay: '1.1s', size: 4 },
          { x: '85%', y: '50%', delay: '0.6s', size: 3 },
        ].map(({ x, y, delay, size }, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/30"
            style={{
              width: size, height: size,
              left: x, top: y,
              animation: `float 3s ease-in-out infinite`,
              animationDelay: delay,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes float { 0%,100% { transform: translateY(0); opacity: 0.3; } 50% { transform: translateY(-8px); opacity: 0.7; } }
      `}</style>
    </div>
  )
}
