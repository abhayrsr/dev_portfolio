import React, { useEffect, useRef } from 'react'
import rough from 'roughjs/bundled/rough.esm.js'

interface Props {
  imgSrc: string
}

export default function AvatarSunrise({ imgSrc }: Props): JSX.Element {
  const crownRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    const svg = crownRef.current
    if (!svg) return

    const rc = rough.svg(svg)
    svg.innerHTML = ''

    const cx = 50
    const cy = 90
    const radius = 40
    const numZigs = 9
    const angleStep = Math.PI / (numZigs - 1)

    // Zig-zag sunrise crown
    for (let i = 0; i < numZigs - 1; i++) {
      const theta1 = Math.PI + i * angleStep
      const theta2 = Math.PI + (i + 1) * angleStep

      const x1 = cx + radius * Math.cos(theta1)
      const y1 = cy + radius * Math.sin(theta1)

      const x2 = cx + radius * Math.cos(theta2)
      const y2 = cy + radius * Math.sin(theta2)

      const midAngle = (theta1 + theta2) / 2
      const spikeLength = 15

      const xm = cx + (radius + spikeLength) * Math.cos(midAngle)
      const ym = cy + (radius + spikeLength) * Math.sin(midAngle)

      const triangle = rc.polygon(
        [
          [x1, y1],
          [xm, ym],
          [x2, y2],
        ],
        {
          stroke: '#facc15',
          fill: '#facc15',
          strokeWidth: 1.5,
          roughness: 1.2,
          fillStyle: 'solid',
        }
      )

      svg.appendChild(triangle)
    }
  }, [])

  return (
    <div className="relative w-40 h-40 mx-auto">
      {/* Image masked to semi-circle */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <clipPath id="halfCircleMask">
            <path d="M10,90 A40,40 0 0,1 90,90 L90,100 L10,100 Z" />
          </clipPath>
        </defs>

        <image
          href={imgSrc}
          width="100"
          height="100"
          preserveAspectRatio="xMidYMid slice"
          clipPath="url(#halfCircleMask)"
        />
        {/* Optional: dark outline arc */}
        <path
          d="M10,90 A40,40 0 0,1 90,90"
          stroke="black"
          strokeWidth="2"
          fill="none"
        />
      </svg>

      {/* Rough zig-zag sunrise crown */}
      <svg
        ref={crownRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
      />
    </div>
  )
}

