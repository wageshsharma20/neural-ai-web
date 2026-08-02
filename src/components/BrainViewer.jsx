import React, { Suspense, useRef, Component } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF, Html } from '@react-three/drei';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Html center>
          <div style={{ color: '#ff4444', textAlign: 'center', fontFamily: 'monospace' }}>
            <p>Model not found.</p>
            <p style={{ fontSize: '0.8em' }}>Please place brain.glb in /public/models/</p>
          </div>
        </Html>
      );
    }
    return this.props.children;
  }
}

function BrainModel() {
  const { scene } = useGLTF('/models/brain.glb');
  const groupRef = useRef();

  React.useMemo(() => {
    if (!scene) return;
    
    scene.traverse((child) => {
      if (child.isMesh) {
        // Nearly-invisible fill so the mesh has volume but no solid colour
        child.material = new THREE.MeshBasicMaterial({
          color: 0x0a0a0a,
          transparent: true,
          opacity: 0.08,
        });
        
        // Raise threshold to 78° — only the sharpest structural ridges remain,
        // hiding the fine mesh web while preserving the brain's overall silhouette
        if (!child.userData.hasEdges) {
          const edgesGeometry = new THREE.EdgesGeometry(child.geometry, 78);
          const edgesMaterial = new THREE.LineBasicMaterial({
            color: 0xffffff,
            opacity: 0.85,
            transparent: true,
          });
          const lineSegments = new THREE.LineSegments(edgesGeometry, edgesMaterial);
          child.add(lineSegments);
          child.userData.hasEdges = true;
        }
      }
    });
  }, [scene]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.004; // Gentle rotation
    }
  });

  return (
    // scale=2.2 — proportional to the hero panel
    <group ref={groupRef} scale={2.2} position={[0, -0.3, 0]}>
      <primitive object={scene} />
    </group>
  );
}

function CanvasLoader() {
  return (
    <Html center>
      <div className="flex items-center justify-center p-4">
        <p className="animate-pulse text-lg font-semibold tracking-widest text-cyan-400 whitespace-nowrap">
          Loading...
        </p>
      </div>
    </Html>
  );
}

export default function BrainViewer() {
  return (
    // overflow: visible ensures the canvas never clips the brain at edges
    <div style={{ width: '100%', height: '520px', position: 'relative', overflow: 'visible' }}>
      {/* Pull camera back to z=9.5, fov=52 — brain fully in frame with breathing room */}
      <Canvas camera={{ position: [0, 0, 9.5], fov: 52 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={0.8} />
        
        <Suspense fallback={<CanvasLoader />}>
          <Environment preset="city" />
          <ErrorBoundary>
            <BrainModel />
          </ErrorBoundary>
        </Suspense>
        
        <OrbitControls enableZoom={false} autoRotate={false} />
      </Canvas>
    </div>
  );
}

// useGLTF.preload('/models/brain.glb'); // Commented out to prevent unhandled rejection if file is missing

