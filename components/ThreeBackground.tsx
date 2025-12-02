import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';

const ThreeBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  // Refs to store material/object references to update them when theme changes
  const coreMaterialRef = useRef<THREE.MeshBasicMaterial | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 4;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Group for mouse interaction
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Objects
    
    // 1. Central Wireframe Sphere
    const geometry = new THREE.IcosahedronGeometry(2, 1);
    const material = new THREE.MeshPhongMaterial({ 
        color: 0x4b6bfb, 
        emissive: 0x4b6bfb,
        emissiveIntensity: 0.6,
        wireframe: true,
        transparent: true,
        opacity: 0.1 
    });
    const sphere = new THREE.Mesh(geometry, material);
    mainGroup.add(sphere);

    // 2. Inner Solid Core (Background blocker)
    const coreGeometry = new THREE.IcosahedronGeometry(1.8, 0);
    // Initial color set based on current theme, but will be updated in separate effect
    const initialCoreColor = theme === 'dark' ? 0x050816 : 0xf9fafb; 
    const coreMaterial = new THREE.MeshBasicMaterial({
        color: initialCoreColor, 
        transparent: true,
        opacity: 0.9
    });
    coreMaterialRef.current = coreMaterial;
    
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    mainGroup.add(core);

    // 3. Particle Field
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 400;
    const posArray = new Float32Array(particlesCount * 3);

    for(let i = 0; i < particlesCount * 3; i++) {
        const r = 4 + Math.random() * 8; 
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        
        posArray[i] = r * Math.sin(phi) * Math.cos(theta);
        posArray[i + 1] = r * Math.sin(phi) * Math.sin(theta);
        posArray[i + 2] = r * Math.cos(phi);
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.015,
        color: 0x8b5cf6,
        transparent: true,
        opacity: 0.3,
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    const onDocumentMouseMove = (event: MouseEvent) => {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    };

    document.addEventListener('mousemove', onDocumentMouseMove);

    // Animation Loop
    let animationFrameId: number;

    const animate = () => {
        const targetRotationY = mouseX * 0.0002;
        const targetRotationX = mouseY * 0.0002;
        
        mainGroup.rotation.y += 0.05 * (targetRotationY - mainGroup.rotation.y);
        mainGroup.rotation.x += 0.05 * (targetRotationX - mainGroup.rotation.x);

        sphere.rotation.y += 0.001; 
        sphere.rotation.z += 0.0005;
        
        core.rotation.y = sphere.rotation.y;
        core.rotation.z = sphere.rotation.z;

        particlesMesh.rotation.y = Date.now() * 0.00005;

        renderer.render(scene, camera);
        animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        windowHalfX = width / 2;
        windowHalfY = height / 2;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
        cancelAnimationFrame(animationFrameId);
        document.removeEventListener('mousemove', onDocumentMouseMove);
        window.removeEventListener('resize', handleResize);
        
        if (containerRef.current && renderer.domElement) {
            containerRef.current.removeChild(renderer.domElement);
        }
        
        geometry.dispose();
        material.dispose();
        coreGeometry.dispose();
        coreMaterial.dispose();
        particlesGeometry.dispose();
        particlesMaterial.dispose();
        renderer.dispose();
    };
  }, []); // Run once on mount

  // Effect to update colors when theme changes
  useEffect(() => {
    if (coreMaterialRef.current) {
        // Update core color to match background (Gray-50 for light, Navy-900 for dark)
        coreMaterialRef.current.color.setHex(theme === 'dark' ? 0x050816 : 0xf9fafb);
    }
  }, [theme]);

  return <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none opacity-70" />;
};

export default ThreeBackground;