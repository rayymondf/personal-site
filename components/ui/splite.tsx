'use client'

import dynamic from 'next/dynamic'
import { Component, ReactNode } from 'react'

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => <SceneFallback />,
})

function SceneFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
    </div>
  )
}

class SplineErrorBoundary extends Component<{ children: ReactNode }, { errored: boolean }> {
  state = { errored: false }
  static getDerivedStateFromError() { return { errored: true } }
  render() {
    return this.state.errored ? <SceneFallback /> : this.props.children
  }
}

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <SplineErrorBoundary>
      <Spline scene={scene} className={className} />
    </SplineErrorBoundary>
  )
}
