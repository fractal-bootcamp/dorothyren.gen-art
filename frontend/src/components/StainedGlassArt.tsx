import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

type Vertex = [number, number, number];
type Edge = [number, number];

const CustomGraph: React.FC = () => {
    const [vertices, setVertices] = useState<Vertex[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    const [numVertices, setNumVertices] = useState(4);

    useEffect(() => {
        generateGraph();
    }, [numVertices]);

    const generateGraph = () => {
        // Generate vertices
        const newVertices: Vertex[] = [];
        for (let i = 0; i < numVertices; i++) {
            const theta = (i / numVertices) * Math.PI * 2;
            const phi = Math.acos(-1 + (2 * i) / numVertices);
            const r = 5;
            newVertices.push([
                r * Math.sin(phi) * Math.cos(theta),
                r * Math.sin(phi) * Math.sin(theta),
                r * Math.cos(phi)
            ]);
        }

        // Generate edges ensuring 3-regularity
        const newEdges: Edge[] = [];

        // Connect each vertex to its immediate neighbors
        for (let i = 0; i < numVertices; i++) {
            newEdges.push([i, (i + 1) % numVertices]);
        }

        // Connect opposite vertices
        for (let i = 0; i < numVertices / 2; i++) {
            newEdges.push([i, (i + numVertices / 2) % numVertices]);
        }

        setVertices(newVertices);
        setEdges(newEdges);
    };

    const Graph = () => {
        const graphRef = useRef<THREE.Group>(null);

        useFrame(() => {
            if (graphRef.current) {
                graphRef.current.rotation.y += 0.005;
            }
        });

        return (
            <group ref={graphRef}>
                {edges.map(([v1, v2], index) => (
                    <line key={index}>
                        <bufferGeometry>
                            <bufferAttribute
                                attach="attributes-position"
                                count={2}
                                array={new Float32Array([...vertices[v1], ...vertices[v2]])}
                                itemSize={3}
                            />
                        </bufferGeometry>
                        <lineBasicMaterial color={0x000000} />
                    </line>
                ))}
                {vertices.map((vertex, index) => (
                    <mesh key={index} position={vertex}>
                        <sphereGeometry args={[0.1, 32, 32]} />
                        <meshBasicMaterial color={0x000000} />
                    </mesh>
                ))}
            </group>
        );
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
                <div>
                    <div style={{ marginBottom: '20px', fontSize: '1rem' }}>
                        <label>
                            Vertices (must be even and ≥ 4):
                            <input
                                type="number"
                                min={4}
                                max={112}
                                step={2}
                                value={numVertices}
                                onChange={(e) => {
                                    let value = parseInt(e.target.value);
                                    if (value % 2 !== 0) value += 1;
                                    setNumVertices(Math.min(112, Math.max(4, value)));
                                }}
                                style={{ fontSize: '1rem', padding: '0.5rem' }}
                            />
                        </label>
                        <button onClick={generateGraph} style={{ marginLeft: '20px', fontSize: '1rem', padding: '0.5rem 1rem' }}>
                            Regenerate Graph
                        </button>
                    </div>
                    <div style={{ width: '100%', height: '600px' }}>
                        <Canvas camera={{ position: [0, 0, 20] }}>
                            <ambientLight intensity={0.5} />
                            <pointLight position={[10, 10, 10]} />
                            <Graph />
                            <OrbitControls />
                        </Canvas>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CustomGraph;