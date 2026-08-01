import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

const CONSTANTS = {
  segmentCount: 150,
};

export default function PhotonBeam(props = {}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let frameId;
    let cancelled = false;
    let renderer = null;
    let composer = null;
    let handleResize = null;
    let backgroundLines = [];
    let signals = [];

    const init = () => {
      if (cancelled) return;

      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) {
        frameId = requestAnimationFrame(init);
        return;
      }

      // --- CONFIGURATION ---
      const params = {
        colorBg: props.colorBg ?? '#080808',
        colorLine: props.colorLine ?? '#6b4fa0',
        colorSignal: props.colorSignal ?? '#00d9ff',
        useColor2: props.useColor2 ?? false,
        colorSignal2: props.colorSignal2 ?? '#00ffff',
        useColor3: props.useColor3 ?? false,
        colorSignal3: props.colorSignal3 ?? '#00b8d4',
        lineCount: props.lineCount ?? 80,
        globalRotation: 0,
        positionX: 0,
        positionY: 0,
        spreadHeight: props.spreadHeight ?? 30.33,
        spreadDepth: props.spreadDepth ?? 0,
        curveLength: props.curveLength ?? 300,
        straightLength: props.straightLength ?? 600,
        curvePower: props.curvePower ?? 1.2,
        waveSpeed: props.waveSpeed ?? 2.48,
        waveHeight: props.waveHeight ?? 0.145,
        lineOpacity: props.lineOpacity ?? 0.557,
        signalCount: props.signalCount ?? 94,
        speedGlobal: props.speedGlobal ?? 0.345,
        trailLength: props.trailLength ?? 3,
        bloomStrength: props.bloomStrength ?? 3.0,
        bloomRadius: props.bloomRadius ?? 0.5,
      };

      // Set position to 0 to allow the lengths to properly span off-screen
      params.positionX = 0;

      // --- SCENE SETUP ---
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#000000');
      scene.fog = new THREE.FogExp2('#000000', 0.002);

      const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
      camera.position.set(0, 0, 90);
      camera.lookAt(0, 0, 0);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      
      // Use mix-blend-mode to make the black background transparent in the DOM
      renderer.domElement.style.mixBlendMode = 'screen';
      
      container.appendChild(renderer.domElement);

      const contentGroup = new THREE.Group();
      contentGroup.position.set(params.positionX, params.positionY, 0);
      
      // MIRROR EFFECT: Rotate 180 degrees around Y axis
      if (props.mirrored) {
        contentGroup.rotation.y = Math.PI;
      }
      
      scene.add(contentGroup);

      // --- POST-PROCESSING ---
      const renderScene = new RenderPass(scene, camera);
      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(width, height),
        1.5,
        0.4,
        0.85
      );
      bloomPass.threshold = 0;
      bloomPass.strength = params.bloomStrength;
      bloomPass.radius = params.bloomRadius;

      composer = new EffectComposer(renderer);
      composer.addPass(renderScene);
      composer.addPass(bloomPass);

      // --- MATH & PATH CALCULATION ---
      function getPathPoint(t, lineIndex, time) {
        const totalLen = params.curveLength + params.straightLength;
        const currentX = -params.curveLength + t * totalLen;

        let y = 0;
        let z = 0;
        const spreadFactor = (lineIndex / params.lineCount - 0.5) * 2;

        if (currentX < 0) {
          const ratio = (currentX + params.curveLength) / params.curveLength;
          let shapeFactor = (Math.cos(ratio * Math.PI) + 1) / 2;
          shapeFactor = Math.pow(shapeFactor, params.curvePower);

          y = spreadFactor * params.spreadHeight * shapeFactor;
          z = spreadFactor * params.spreadDepth * shapeFactor;

          const waveFactor = shapeFactor;
          const wave =
            Math.sin(time * params.waveSpeed + currentX * 0.1 + lineIndex) *
            params.waveHeight *
            waveFactor;
          y += wave;
        }

        return new THREE.Vector3(currentX, y, z);
      }

      // --- OBJECTS MANAGEMENT ---
      backgroundLines = [];
      signals = [];

      const bgMaterial = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: params.lineOpacity,
        depthWrite: false,
      });

      const signalMaterial = new THREE.LineBasicMaterial({
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        depthTest: false,
        transparent: true,
      });

      const stop1 = new THREE.Color('#3fc7d6');
      const stop2 = new THREE.Color('#9b6bff');
      const stop3 = new THREE.Color('#c765a8');
      const stop4 = new THREE.Color('#ff2d87');
      const gradientTempColor = new THREE.Color();

      function getGradientColor(progress, time) {
        // Shift oscillates smoothly between 0 and 0.5
        const shift = (Math.sin(time * 0.5) * 0.5 + 0.5) * 0.5; 
        
        // Progress (0 to 1) is scaled to half the gradient width. 
        // Adding the shift means the beam displays a 50% window of the gradient 
        // that slides back and forth smoothly over time.
        let t = (progress * 0.5) + shift;
        t = Math.max(0, Math.min(1, t));
        
        if (t < 0.4) {
          gradientTempColor.lerpColors(stop1, stop2, t / 0.4);
        } else if (t < 0.65) {
          gradientTempColor.lerpColors(stop2, stop3, (t - 0.4) / 0.25);
        } else {
          gradientTempColor.lerpColors(stop3, stop4, (t - 0.65) / 0.35);
        }
        return gradientTempColor;
      }

      function createSignal() {
        const maxTrail = 150;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(maxTrail * 3);
        const colors = new Float32Array(maxTrail * 3);

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const mesh = new THREE.Line(geometry, signalMaterial);
        mesh.frustumCulled = false;
        mesh.renderOrder = 1;
        contentGroup.add(mesh);

        signals.push({
          mesh: mesh,
          laneIndex: Math.floor(Math.random() * params.lineCount),
          speed: 0.2 + Math.random() * 0.5,
          progress: Math.random(),
          history: [],
        });
      }

      function rebuildSignals() {
        signals.forEach((s) => {
          contentGroup.remove(s.mesh);
          s.mesh.geometry.dispose();
        });
        signals = [];
        for (let i = 0; i < params.signalCount; i++) {
          createSignal();
        }
      }

      function rebuildLines() {
        backgroundLines.forEach((l) => {
          contentGroup.remove(l);
          l.geometry.dispose();
        });
        backgroundLines = [];

        for (let i = 0; i < params.lineCount; i++) {
          const geometry = new THREE.BufferGeometry();
          const positions = new Float32Array(CONSTANTS.segmentCount * 3);
          const colors = new Float32Array(CONSTANTS.segmentCount * 3);
          geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
          geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

          const line = new THREE.Line(geometry, bgMaterial);
          line.userData = { id: i };
          line.renderOrder = 0;
          contentGroup.add(line);
          backgroundLines.push(line);
        }
        rebuildSignals();
      }

      // Initial Build
      rebuildLines();

      // --- ANIMATION LOOP ---
      const clock = new THREE.Clock();

      function animate() {
        if (cancelled) return;
        frameId = requestAnimationFrame(animate);

        const time = clock.getElapsedTime();

        // Update Lines
        backgroundLines.forEach((line) => {
          const positions = line.geometry.attributes.position.array;
          const colors = line.geometry.attributes.color.array;
          const lineId = line.userData.id;
          for (let j = 0; j < CONSTANTS.segmentCount; j++) {
            const t = j / (CONSTANTS.segmentCount - 1);
            const vec = getPathPoint(t, lineId, time);
            positions[j * 3] = vec.x;
            positions[j * 3 + 1] = vec.y;
            positions[j * 3 + 2] = vec.z;

            const c = getGradientColor(t, time);

            const dimFactor = 0.12;
            colors[j * 3] = c.r * dimFactor; 
            colors[j * 3 + 1] = c.g * dimFactor;
            colors[j * 3 + 2] = c.b * dimFactor;
          }
          line.geometry.attributes.position.needsUpdate = true;
          line.geometry.attributes.color.needsUpdate = true;
        });

        // Update Signals
        signals.forEach((sig) => {
          // If mirrored, the flow goes backwards natively? 
          // Actually, we rotated the group Y by PI. The curve is at -X, straight at +X.
          // In world space, the curve is now at +X (right side). 
          // t=0 is at curve (right), t=1 is at straight (left).
          // So the flow naturally goes right to left!
          sig.progress += sig.speed * 0.005 * params.speedGlobal;

          if (sig.progress > 1.0) {
            sig.progress = 0;
            sig.laneIndex = Math.floor(Math.random() * params.lineCount);
            sig.history = [];
          }

          const pos = getPathPoint(sig.progress, sig.laneIndex, time);
          sig.history.push(pos);

          if (sig.history.length > params.trailLength + 1) {
            sig.history.shift();
          }

          const positions = sig.mesh.geometry.attributes.position.array;
          const colors = sig.mesh.geometry.attributes.color.array;

          const drawCount = Math.max(1, params.trailLength);
          const currentLen = sig.history.length;

          for (let i = 0; i < drawCount; i++) {
            let index = currentLen - 1 - i;
            if (index < 0) index = 0;

            const p = sig.history[index] || new THREE.Vector3();
            const c = getGradientColor(sig.progress, time);

            positions[i * 3] = p.x;
            positions[i * 3 + 1] = p.y;
            positions[i * 3 + 2] = p.z;

            let overlapFactor = 1.0;
            if (p.x >= 0) {
              overlapFactor = 0.25; // Soften additive bloom overlap
            }

            let alpha = overlapFactor;
            if (params.trailLength > 0) {
              alpha *= Math.max(0, 1 - i / params.trailLength);
            }

            colors[i * 3] = c.r * alpha;
            colors[i * 3 + 1] = c.g * alpha;
            colors[i * 3 + 2] = c.b * alpha;
          }

          sig.mesh.geometry.setDrawRange(0, drawCount);
          sig.mesh.geometry.attributes.position.needsUpdate = true;
          sig.mesh.geometry.attributes.color.needsUpdate = true;
        });

        if (composer) composer.render();
      }

      // Resize Handler
      handleResize = () => {
        if (!container || cancelled || !renderer || !composer) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        if (w === 0 || h === 0) return;

        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
        composer.setSize(w, h);
      };

      window.addEventListener('resize', handleResize);
      animate();
    };

    frameId = requestAnimationFrame(init);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frameId);
      if (handleResize) {
        window.removeEventListener('resize', handleResize);
      }
      if (containerRef.current && renderer?.domElement) {
        try {
          containerRef.current.removeChild(renderer.domElement);
        } catch {
          /* element may already be removed */
        }
        renderer.dispose();
      }
      composer?.dispose();
      backgroundLines.forEach((l) => l.geometry.dispose());
      signals.forEach((s) => s.mesh.geometry.dispose());
    };
  }, [props]); // re-run if props change

  return (
    <div 
      ref={containerRef} 
      style={{
        width: '100%',
        height: '100%',
        minHeight: '200px',
        backgroundColor: props.colorBg ?? '#080808',
        borderRadius: 'var(--radius)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
        maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
        ...props.style
      }}
      className={props.className}
    />
  );
}
