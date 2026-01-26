import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Icosahedron, Float } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedShape() {
    const meshRef = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        // Breathing animation (scale) - more subtle
        const scale = 1 + Math.sin(time * 0.5) * 0.05;
        meshRef.current.scale.set(scale, scale, scale);

        // Mouse interaction (rotation)
        // Smoothly interpolate current rotation to target rotation based on mouse position
        // Reduced sensitivity and lerp speed for "heavier" feel
        const targetRotationX = state.mouse.y * 0.2;
        const targetRotationY = state.mouse.x * 0.2;

        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotationX, 0.02);
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotationY, 0.02);

        // Constant slow rotation
        meshRef.current.rotation.z += 0.001;
    });

    return (
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
            <Icosahedron args={[8, 0]} ref={meshRef}>
                <meshPhysicalMaterial
                    color="#818cf8" // Brighter Indigo
                    emissive="#4f46e5" // Glow
                    emissiveIntensity={2}
                    roughness={0.1}
                    metalness={0.8}
                    transmission={0} // Remove glass effect for visibility
                    thickness={2}
                    wireframe={true}
                />
            </Icosahedron>
        </Float>
    );
}

export default function Background3D() {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: -1, // Changed to -1 to be behind everything, but we need events to pass through or be captured globally
            pointerEvents: 'none', // The container doesn't block events
            opacity: 1
        }}>
            <Canvas 
                camera={{ position: [0, 0, 5] }}
                eventSource={document.body} // Listen to events on the body
                eventPrefix="client"
            >
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <AnimatedShape />
            </Canvas>
        </div>
    );
}
