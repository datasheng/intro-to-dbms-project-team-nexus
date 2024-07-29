"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { TextureLoader } from "three";

const SpinningGlobe: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentMount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 3; // Move camera back to fit the larger globe

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    currentMount?.appendChild(renderer.domElement);

    // Texture
    const loader = new TextureLoader();
    const texture = loader.load('/earth_texture.jpg'); // Load your texture image

    // Globe
    const geometry = new THREE.SphereGeometry(1, 64, 64); // Increase the size of the globe
    const material = new THREE.MeshBasicMaterial({
      map: texture
    });
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    // Light
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(10, 10, 10);
    scene.add(light);

    // Animation
    const animate = function () {
      requestAnimationFrame(animate);
      globe.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      const { innerWidth, innerHeight } = window;
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
      currentMount?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1 }} />;
};

export default SpinningGlobe;


