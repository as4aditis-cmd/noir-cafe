'use client';

import dynamic from 'next/dynamic';

const CoffeeSceneCanvas = dynamic(
  () =>
    import('./CoffeeSceneCanvas').then((mod) => ({
      default: mod.CoffeeScene,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border border-amber-700/20 border-t-amber-600 animate-spin" />
      </div>
    ),
  }
);

interface CoffeeSceneProps {
  className?: string;
}

export function CoffeeScene({ className = '' }: CoffeeSceneProps) {
  return <CoffeeSceneCanvas className={className} />;
}