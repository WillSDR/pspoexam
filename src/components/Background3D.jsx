import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Icosahedron, Float } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedShape() {
    const meshRef = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        // Breathing animation (scale)
        const scale = 1 + Math.sin(time * 0.5) * 0.1;
        meshRef.current.scale.set(scale, scale, scale);

        // Mouse interaction (rotation)
        // Smoothly interpolate current rotation to target rotation based on mouse position
        const targetRotationX = state.mouse.y * 0.5;
        const targetRotationY = state.mouse.x * 0.5;

        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotationX, 0.05);
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotationY, 0.05);

        // Constant slow rotation
        meshRef.current.rotation.z += 0.002;
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
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
            zIndex: 1, // Explicitly layer 1
            pointerEvents: 'none',
            opacity: 1 // Fully opaque container
        }}>
            <Canvas camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <AnimatedShape />
            </Canvas>
        </div>
    );
}
