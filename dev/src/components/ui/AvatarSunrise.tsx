import React, { useEffect, useRef } from "react";
import rough from "roughjs/bundled/rough.esm.js";
import "../../../global.css";

interface Props {
  imgSrc: string;
}

export default function AvatarSunrise({ imgSrc }: Props): JSX.Element {
  const crownRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = crownRef.current;
    if (!svg) return;

    const rc = rough.svg(svg);
    svg.innerHTML = "";

    const cx = 50;
    const cy = 50;
    const radius = 20;
    const numZigs = 9;
    const angleStep = Math.PI / (numZigs - 1);
    <AvatarSunrise imgSrc="dev1.png" client:only />;

    for (let i = 0; i < numZigs - 1; i++) {
      const theta1 = Math.PI + i * angleStep;
      const theta2 = Math.PI + (i + 1) * angleStep;

      const x1 = cx + radius * Math.cos(theta1);
      const y1 = cy + radius * Math.sin(theta1);

      const x2 = cx + radius * Math.cos(theta2);
      const y2 = cy + radius * Math.sin(theta2);

      const midAngle = (theta1 + theta2) / 2;
      const spikeLength = 20;

      const xm = cx + (radius + spikeLength) * Math.cos(midAngle);
      const ym = cy + (radius + spikeLength) * Math.sin(midAngle);

      const triangle = rc.polygon(
        [
          [x1, y1],
          [xm, ym],
          [x2, y2],
        ],
        {
          stroke: "#facc15",
          fill: "#facc15",
          strokeWidth: 1.5,
          roughness: 1.2,
          fillStyle: "solid",
        },
      );

      svg.appendChild(triangle);
    }
  }, []);

  return (
    <div className="flex items-center justify-start">
      <div className="relative lg:w-20 lg:h-20 sm:w-16 sm:h-15 mx-auto">
        {/* Avatar Image - full circle */}
        <img
          src={imgSrc}
          alt="Avatar"
          className=" w-full h-full object-cover border border-gray-300 rounded-full shadow-lg z-10 absolute top-0 left-0 fade-mask"
        />
      </div>

      {/* Zig-zag sunrise crown over top half */}
    </div>
  );
}
