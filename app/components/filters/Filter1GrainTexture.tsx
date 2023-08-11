"use client";

import React from "react";

export default function Filter1GrainTexture() {
  return (
    <div className="opacity-30">
      <svg id="texture" className="grain-texture">
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.4"
            numOctaves="2"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </div>
  );
}
