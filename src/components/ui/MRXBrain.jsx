import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

// ── WebGL Ripple Shader ──
const RippleMaterial = shaderMaterial(
  { uTime: 0, uTexture: null, uMouse: new THREE.Vector2(0.5, 0.5), uIntensity: 0.0 },
  // vertex shader
  `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  // fragment shader
  `
  uniform sampler2D uTexture;
  uniform vec2 uMouse;
  uniform float uTime;
  uniform float uIntensity;
  varying vec2 vUv;

  void main() {
    vec2 p = vUv;
    vec2 dir = p - uMouse;
    float dist = length(dir);
    if (dist > 0.0) {
      dir /= dist;
    }
    
    // Ripple effect math scaled by hover intensity
    float ripple = sin(dist * 40.0 - uTime * 10.0) * 0.015 * uIntensity;
    // Falloff based on distance from mouse
    float falloff = smoothstep(0.4, 0.0, dist);
    
    vec2 uv = p + dir * ripple * falloff;
    
    gl_FragColor = texture2D(uTexture, uv);
  }
  `
);
extend({ RippleMaterial });

const RippleScene = ({ sourceCanvasRef }) => {
  const materialRef = useRef();
  const [texture, setTexture] = useState(null);
  const [hovered, setHovered] = useState(false);
  const { viewport } = useThree();

  useEffect(() => {
    if (sourceCanvasRef.current) {
      const tex = new THREE.CanvasTexture(sourceCanvasRef.current);
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      setTexture(tex);
    }
  }, [sourceCanvasRef]);

  useFrame(({ clock, pointer }) => {
    if (materialRef.current) {
      materialRef.current.uTime = clock.getElapsedTime();
      
      // Map R3F pointer [-1, 1] to UV space [0, 1]
      const targetX = pointer.x * 0.5 + 0.5;
      const targetY = pointer.y * 0.5 + 0.5;
      
      // Smooth interpolation for mouse movement
      materialRef.current.uMouse.x = THREE.MathUtils.lerp(materialRef.current.uMouse.x, targetX, 0.1);
      materialRef.current.uMouse.y = THREE.MathUtils.lerp(materialRef.current.uMouse.y, targetY, 0.1);
      
      // Smoothly fade intensity in/out based on hover state
      const targetIntensity = hovered ? 1.0 : 0.0;
      materialRef.current.uIntensity = THREE.MathUtils.lerp(materialRef.current.uIntensity, targetIntensity, 0.05);
    }
    
    // Since the 2D canvas is rendering the particles every frame, 
    // we must flag the texture to update every frame.
    if (texture) {
      texture.needsUpdate = true;
    }
  });

  return (
    <mesh 
      scale={[viewport.width, viewport.height, 1]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <planeGeometry args={[1, 1]} />
      {texture && <rippleMaterial ref={materialRef} uTexture={texture} transparent={true} />}
    </mesh>
  );
};

/**
 * MRXBrain — Dither with targeted shimmer on blue pixels only.
 * Now wrapped with a WebGL interactive ripple effect!
 */
const MRXBrain = ({ imageUrl = '/mrx-brain.png' }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    let animId;
    let destroyed = false;

    const img = new Image();
    let loaded = false;
    let srcPixels = null;
    let srcW = 0, srcH = 0;

    let cellData = null; 

    const srcCanvas = document.createElement('canvas');
    const srcCtx = srcCanvas.getContext('2d', { willReadFrequently: true });
    const bloomCanvas = document.createElement('canvas');
    const bloomCtx = bloomCanvas.getContext('2d');

    const CELL = 4;
    const MAX_DOT = 0.85; 
    const GAMMA = 0.5; 
    const DARK_THRESHOLD = 10; 

    const gammaLUT = new Uint8Array(256);
    for (let i = 0; i < 256; i++) {
      gammaLUT[i] = Math.round(255 * Math.pow(i / 255, GAMMA));
    }

    const buildCells = () => {
      const W = srcW, H = srcH;
      const d = srcPixels;
      const cols = (W / CELL) | 0;
      const rows = (H / CELL) | 0;
      const half = CELL >> 1;
      const cells = [];

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const cx = col * CELL + half;
          const cy = row * CELL + half;
          const idx = (cy * W + cx) << 2;

          const rawR = d[idx], rawG = d[idx + 1], rawB = d[idx + 2];
          const rawLum = (rawR * 77 + rawG * 150 + rawB * 29) >> 8;
          if (rawLum < DARK_THRESHOLD) continue;

          const rGamma = gammaLUT[rawR];
          const gGamma = gammaLUT[rawG];
          const bGamma = gammaLUT[rawB];

          const lum = (rGamma * 77 + gGamma * 150 + bGamma * 29) >> 8;
          const lumN = lum / 255;
          if (lumN < 0.10) continue; 

          const boostedLum = Math.min(1, lumN * 2.1); // Slightly increased from 1.8 for more brightness

          const pct = (col * CELL) / srcW;
          
          let tr, tg, tb;
          if (pct < 0.4) {
            const t = pct / 0.4;
            tr = 63 + t * (155 - 63);
            tg = 199 + t * (107 - 199);
            tb = 214 + t * (255 - 214);
          } else if (pct < 0.65) {
            const t = (pct - 0.4) / 0.25;
            tr = 155 + t * (199 - 155);
            tg = 107 + t * (101 - 107);
            tb = 255 + t * (168 - 255);
          } else {
            const t = Math.min(1, (pct - 0.65) / 0.35);
            tr = 199 + t * (255 - 199);
            tg = 101 + t * (45 - 101);
            tb = 168 + t * (135 - 168);
          }

          const r = (boostedLum * tr) | 0;
          const g = (boostedLum * tg) | 0;
          const b = (boostedLum * tb) | 0;

          const dotSize = lumN * CELL * MAX_DOT;
          if (dotSize < 0.5) continue; 
          
          const offset = (CELL - dotSize) * 0.5;
          const px = col * CELL + offset;
          const py = row * CELL + offset;

          const phase = (col * 7919 + row * 104729) % 6283 / 1000;

          cells.push({ px, py, dotSize, r, g, b, phase });
        }
      }

      cellData = cells;
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.round(rect.width);
      const h = Math.round(rect.height);
      if (w === 0 || h === 0) return;
      canvas.width = w; canvas.height = h;
      srcCanvas.width = w; srcCanvas.height = h;
      bloomCanvas.width = w; bloomCanvas.height = h;
      srcW = w; srcH = h;
      if (loaded) {
        bake();
        buildCells();
      }
    };

    const bake = () => {
      srcCtx.clearRect(0, 0, srcW, srcH);
      const ia = img.width / img.height;
      const ca = srcW / srcH;
      let dw, dh, dx, dy;
      
      // Use "contain" math so it doesn't get heavily cut off on extreme aspect ratios
      if (ca > ia) { 
        dh = srcH; 
        dw = srcH * ia; 
        dy = 0; 
        dx = (srcW - dw) / 2; 
      } else { 
        dw = srcW; 
        dh = srcW / ia; 
        dx = 0; 
        dy = (srcH - dh) / 2; 
      }
      
      // Scale it up a bit manually so it feels massive
      const zoom = 1.6;
      dw *= zoom;
      dh *= zoom;
      
      // Keep it centered (adjust dx and dy for the zoom)
      dx = (srcW - dw) / 2;
      dy = (srcH - dh) / 2;
      
      srcCtx.drawImage(img, dx, dy, dw, dh);
      srcPixels = srcCtx.getImageData(0, 0, srcW, srcH).data;
    };

    window.addEventListener('resize', resize);
    resize();
    img.onload = () => { loaded = true; resize(); };
    img.src = imageUrl;

    let frame = 0;

    const render = () => {
      if (destroyed) return;
      animId = requestAnimationFrame(render);
      if (!cellData) return;
      frame++;

      const W = srcW, H = srcH;
      if (W === 0 || H === 0) return;

      const t = frame * 0.016; 

      ctx.clearRect(0, 0, W, H);

      for (let i = 0; i < cellData.length; i++) {
        const c = cellData[i];

        let twinkle = 0.5 + Math.sin(c.phase + t * 4) * 0.5;
        if (twinkle > 1) twinkle = 1;

        const r = (c.r * twinkle) | 0;
        const g = (c.g * twinkle) | 0;
        const b = (c.b * twinkle) | 0;

        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fillRect(c.px, c.py, c.dotSize, c.dotSize);
      }

      bloomCtx.clearRect(0, 0, W, H);
      bloomCtx.filter = 'blur(6px)';
      bloomCtx.drawImage(canvas, 0, 0);
      bloomCtx.filter = 'none';

      ctx.globalCompositeOperation = 'screen';
      ctx.globalAlpha = 0.25;
      ctx.drawImage(bloomCanvas, 0, 0);
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';

      if (Math.random() < 0.04) {
        const numSlices = 1 + ((Math.random() * 3) | 0);
        for (let s = 0; s < numSlices; s++) {
          const sy = (Math.random() * H) | 0;
          const sh = (Math.random() * 14 + 4) | 0;
          const sx = ((Math.random() - 0.5) * 30) | 0;
          ctx.drawImage(canvas, 0, sy, W, sh, sx, sy, W, sh);
          ctx.globalCompositeOperation = 'lighter';
          ctx.globalAlpha = 0.35;
          ctx.drawImage(canvas, 0, sy, W, sh, sx + 4, sy - 1, W, sh);
          ctx.globalAlpha = 1;
          ctx.globalCompositeOperation = 'source-over';
        }
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      destroyed = true;
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, [imageUrl]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 2D Canvas rendering the particles - hidden from DOM */}
      <canvas
        ref={canvasRef}
        style={{ display: 'none' }}
      />
      
      {/* R3F WebGL Overlay serving the rippled texture */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          WebkitMaskImage: `
            linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%),
            linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)
          `,
          WebkitMaskComposite: 'destination-in',
          maskImage: `
            linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%),
            linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)
          `,
          maskComposite: 'intersect',
        }}
      >
        <Canvas camera={{ position: [0, 0, 1] }} gl={{ alpha: true }}>
          <RippleScene sourceCanvasRef={canvasRef} />
        </Canvas>
      </div>
    </div>
  );
};

export default MRXBrain;
