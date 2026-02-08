"use client";

import { Canvas, useFrame, useThree, ThreeEvent } from "@react-three/fiber";
import { Environment, Text, Line, Icosahedron, Octahedron, Float, Stars } from "@react-three/drei";
import { Suspense, useRef, useMemo, useEffect, useState } from "react";
import * as THREE from "three";
import { EffectComposer, Bloom, Glitch, Scanline } from "@react-three/postprocessing";
import { BlendFunction } from 'postprocessing';

// --- Assets & Data ---
const NODES = [
    { label: "CODE", icon: "💻", type: "tech" },
    { label: "AUDIO", icon: "🎧", type: "creative" },
    { label: "COFFEE", icon: "☕", type: "life" },
    { label: "GAME", icon: "🎮", type: "life" },
    { label: "KEYBOARD", icon: "⌨️", type: "gear" },
    { label: "MOUSE", icon: "🖱️", type: "gear" },
    { label: "CAT", icon: "🐱", type: "life" },
    { label: "ENGINEER", icon: "⚡", type: "tech" },
];

function Core() {
    const meshRef = useRef<THREE.Group>(null);

    useFrame(() => {
        if (!meshRef.current) return;
        meshRef.current.rotation.y += 0.005;
        meshRef.current.rotation.z += 0.002;
    });

    return (
        <group ref={meshRef}>
            {/* Inner Core - Spinning Energy */}
            <Icosahedron args={[1, 1]} scale={1.5}>
                <meshStandardMaterial
                    color="#22d3ee"
                    emissive="#22d3ee"
                    emissiveIntensity={2}
                    wireframe
                    transparent
                    opacity={0.3}
                />
            </Icosahedron>

            {/* Outer Shell - Protection Field */}
            <Octahedron args={[1, 0]} scale={2.2}>
                <meshStandardMaterial
                    color="#22d3ee"
                    wireframe
                    transparent
                    opacity={0.15}
                />
            </Octahedron>

            {/* Glowing Core Light */}
            <pointLight distance={10} intensity={2} color="#22d3ee" />
        </group>
    );
}

function DataNode({ position, label, icon, delay, scale = 1 }: { position: [number, number, number], label: string, icon: string, delay: number, scale?: number }) {
    const ref = useRef<THREE.Group>(null);
    const [hovered, setHovered] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Staggered appearance
        const t = setTimeout(() => setVisible(true), delay * 1000 + 500);
        return () => clearTimeout(t);
    }, [delay]);

    useFrame((state) => {
        if (!ref.current) return;
        // Float animation relative to its orbital position
        ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + delay) * 0.2;

        // Scale in animation (Rez-in effect)
        const targetScale = visible ? (hovered ? 1.3 * scale : scale) : 0;
        ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

        // Always face camera
        ref.current.lookAt(state.camera.position);
    });

    return (
        <group position={position} ref={ref}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                {/* Glass Plate */}
                <mesh>
                    <planeGeometry args={[1.6, 1.6]} />
                    <meshPhysicalMaterial
                        color={hovered ? "#22d3ee" : "#0f172a"}
                        metalness={0.9}
                        roughness={0.1}
                        transparent
                        opacity={hovered ? 0.3 : 0.1}
                        side={THREE.DoubleSide}
                        transmission={0.2}
                        emissive={hovered ? "#22d3ee" : "#000000"}
                        emissiveIntensity={hovered ? 0.8 : 0}
                    />
                </mesh>

                {/* Holographic Border */}
                <Line
                    points={[
                        [-0.8, 0.8, 0], [0.8, 0.8, 0],
                        [0.8, -0.8, 0], [-0.8, -0.8, 0],
                        [-0.8, 0.8, 0]
                    ]}
                    color={hovered ? "#ffffff" : "#22d3ee"}
                    lineWidth={hovered ? 2 : 1}
                    transparent
                    opacity={hovered ? 0.8 : 0.4}
                />

                {/* Content */}
                <Text
                    position={[0, 0.1, 0.05]}
                    fontSize={0.6}
                    color={hovered ? "#ffffff" : "#22d3ee"}
                >
                    {icon}
                </Text>
                <Text
                    position={[0, -0.5, 0.05]}
                    fontSize={0.15}
                    color={hovered ? "#ffffff" : "#aaaaaa"}
                >
                    {label}
                </Text>

                {/* Scanning Beam (Holo Effect) */}
                {hovered && (
                    <mesh position={[0, 0, 0.1]}>
                        <planeGeometry args={[1.6, 0.1]} />
                        <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
                    </mesh>
                )}
            </Float>
        </group>
    );
}

function Network() {
    const groupRef = useRef<THREE.Group>(null);
    const { viewport } = useThree();

    // Inertia & Interaction Refs
    const isDragging = useRef(false);
    const previousMouse = useRef({ x: 0, y: 0 });
    const velocity = useRef({ x: 0, y: 0 });

    // Responsive Logic
    // Mobile threshold roughly < 7 units in Three.js viewport at this camera distance (~768px in DOM)
    // Adjust scale and radius dynamically
    const isMobile = viewport.width < 8;
    const radius = useMemo(() => {
        // Desktop: ~6.5, Mobile: ~3.5
        return Math.min(Math.max(viewport.width / 2.2, 3.5), 7.0);
    }, [viewport.width]);

    const nodeScale = isMobile ? 0.6 : 1.0;

    // Generate Spherical Orbit Positions
    const nodes = useMemo(() => {
        return NODES.map((node, i) => {
            const phi = Math.acos(-1 + (2 * i) / NODES.length);
            const theta = Math.sqrt(NODES.length * Math.PI) * phi;

            return {
                ...node,
                // Store normalized position only
                position: [
                    Math.cos(theta) * Math.sin(phi),
                    Math.sin(theta) * Math.sin(phi),
                    Math.cos(phi)
                ] as [number, number, number],
                delay: i * 0.15
            };
        });
    }, []);

    useFrame(() => {
        if (groupRef.current) {
            // Apply Velocity (Inertia)
            groupRef.current.rotation.y += velocity.current.x;
            groupRef.current.rotation.x += velocity.current.y;

            // Friction (Damping)
            velocity.current.x *= 0.95;
            velocity.current.y *= 0.95;

            // Auto-spin if no interaction
            if (!isDragging.current && Math.abs(velocity.current.x) < 0.001 && Math.abs(velocity.current.y) < 0.001) {
                groupRef.current.rotation.y += 0.002; // Slow auto rotation
            }
        }
    });

    // Event Handlers for Flick/Swipe
    // Event Handlers for Flick/Swipe
    const onPointerDown = (e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation(); // Block interaction from falling through
        isDragging.current = true;
        previousMouse.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
        isDragging.current = false;
    };

    const onPointerMove = (e: ThreeEvent<PointerEvent>) => {
        if (!isDragging.current) return;

        const deltaX = e.clientX - previousMouse.current.x;
        const deltaY = e.clientY - previousMouse.current.y;

        // Update velocity based on movement
        velocity.current.x = deltaX * 0.005;
        velocity.current.y = deltaY * 0.005;

        previousMouse.current = { x: e.clientX, y: e.clientY };
    };

    // Neural Connections
    const lines = useMemo(() => {
        const points: THREE.Vector3[] = [];
        // Connect each node to Center
        nodes.forEach(n => {
            points.push(new THREE.Vector3(0, 0, 0));
            // Apply radius to line positions
            points.push(new THREE.Vector3(...n.position).multiplyScalar(radius));
        });
        return points;
    }, [nodes, radius]);

    return (
        <group ref={groupRef}>
            {/* Hit Area for Dragging - Must be visible=true with transparent material to catch events */}
            <mesh
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerLeave={onPointerUp}
                visible={true}
            >
                <sphereGeometry args={[15, 16, 16]} />
                <meshBasicMaterial transparent opacity={0} side={THREE.DoubleSide} />
            </mesh>

            <Core />

            {nodes.map((n, i) => (
                <DataNode
                    key={i}
                    {...n}
                    scale={nodeScale}
                    position={[
                        n.position[0] * radius,
                        n.position[1] * radius,
                        n.position[2] * radius
                    ]}
                />
            ))}

            <Line
                points={lines}
                color="#22d3ee"
                transparent
                opacity={0.1}
                lineWidth={1}
            />
        </group>
    );
}

export function Scene() {
    // Holographic Entry Sequence
    const [booted, setBooted] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setBooted(true), 200);
        return () => clearTimeout(t);
    }, []);

    return (
        <Canvas camera={{ position: [0, 0, 14], fov: 45 }} dpr={[1, 1.5]}>
            <color attach="background" args={["#020617"]} />
            {/* Fog for depth */}
            <fog attach="fog" args={["#020617", 10, 30]} />

            <Suspense fallback={null}>
                <Network />

                <Environment preset="city" />
                <Stars radius={60} count={3000} factor={4} fade speed={0.5} />

                <EffectComposer>
                    <Bloom
                        luminanceThreshold={0.2}
                        luminanceSmoothing={0.9}
                        height={200}
                        intensity={1.0}
                    />

                    <Scanline
                        density={2}
                        opacity={0.1}
                        blendFunction={BlendFunction.OVERLAY}
                    />

                    {!booted ? (
                        <Glitch
                            delay={new THREE.Vector2(0, 0)}
                            duration={new THREE.Vector2(0.3, 1.0)}
                            strength={new THREE.Vector2(0.3, 0.5)}
                            active={true}
                        />
                    ) : <></>}
                </EffectComposer>
            </Suspense>
        </Canvas>
    );
}
