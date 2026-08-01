import React, { useEffect, useRef, useState } from 'react';

export default function WebGLTest() {
  const canvasRef = useRef(null);
  const [status, setStatus] = useState('Testing WebGL...');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (gl) {
        setStatus('WebGL is supported!');
      } else {
        setStatus('WebGL is NOT supported in this browser.');
      }
    }
  }, []);

  return (
    <div style={{ padding: '20px', background: '#222', color: '#0f0' }}>
      <h3>WebGL Status: {status}</h3>
      <canvas ref={canvasRef} width="10" height="10" style={{ display: 'none' }} />
    </div>
  );
}
