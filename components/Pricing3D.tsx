
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';

interface Pricing3DProps {
  tierId: string;
}

const Pricing3D: React.FC<Pricing3DProps> = ({ tierId }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!containerRef.current) return;

    // Dimensions
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 6;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const purpleLight = new THREE.PointLight(0xa855f7, 2, 20);
    purpleLight.position.set(-5, -2, -5);
    scene.add(purpleLight);

    // Mesh Selection based on tier
    let geometry;
    switch(tierId) {
        case 'professional':
            geometry = new THREE.IcosahedronGeometry(1.6, 0);
            break;
        case 'business':
            geometry = new THREE.TorusKnotGeometry(1.1, 0.3, 100, 16);
            break;
        case 'starter':
        default:
            geometry = new THREE.BoxGeometry(2, 2, 2);
    }

    // Materials
    // Primary color varies by theme slightly for visibility
    const primaryColor = theme === 'dark' ? 0x4b6bfb : 0x3b82f6;
    
    const material = new THREE.MeshStandardMaterial({
        color: primaryColor,
        roughness: 0.3,
        metalness: 0.8,
    });

    const wireframeMaterial = new THREE.MeshBasicMaterial({
        color: theme === 'dark' ? 0xffffff : 0x000000,
        wireframe: true,
        transparent: true,
        opacity: 0.1
    });

    const mesh = new THREE.Mesh(geometry, material);
    const wireMesh = new THREE.Mesh(geometry, wireframeMaterial);
    
    // Make wire mesh slightly larger to prevent z-fighting
    wireMesh.scale.setScalar(1.001);

    const group = new THREE.Group();
    group.add(mesh);
    group.add(wireMesh);
    scene.add(group);

    // Animation Loop
    let frameId: number;
    const animate = () => {
        frameId = requestAnimationFrame(animate);

        const time = Date.now() * 0.002;

        // Rotation
        group.rotation.x = Math.sin(time * 0.5) * 0.15;
        group.rotation.y += 0.008;

        // Bouncing/Floating effect
        group.position.y = Math.sin(time * 1.2) * 0.25;

        // Pulse effect (Scale)
        // Gentle pulse between 0.95 and 1.05 scale
        const pulse = 1 + Math.sin(time * 2.5) * 0.05;
        group.scale.set(pulse, pulse, pulse);

        renderer.render(scene, camera);
    };
    animate();

    // Handle Resize
    const handleResize = () => {
        if (!containerRef.current) return;
        const w = containerRef.current.clientWidth;
        const h = containerRef.current.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(frameId);
        if (containerRef.current && renderer.domElement) {
            containerRef.current.removeChild(renderer.domElement);
        }
        geometry.dispose();
        material.dispose();
        wireframeMaterial.dispose();
        renderer.dispose();
    };
  }, [tierId, theme]);

  return <div ref={containerRef} className="w-full h-48 -mb-4 relative z-10 pointer-events-none" />;
};

export default Pricing3D;
