"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function StoryConstellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: "low-power",
      });
    } catch (error) {
      console.warn("The decorative 3D story scene could not be initialized.", error);
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 30);
    camera.position.z = 7;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);

    const constellation = new THREE.Group();
    scene.add(constellation);

    const points: THREE.Vector3[] = [];
    const pointCount = 96;
    const radius = 2.05;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (let index = 0; index < pointCount; index += 1) {
      const y = 1 - (index / (pointCount - 1)) * 2;
      const ringRadius = Math.sqrt(1 - y * y);
      const angle = goldenAngle * index;
      points.push(
        new THREE.Vector3(
          Math.cos(angle) * ringRadius * radius,
          y * radius,
          Math.sin(angle) * ringRadius * radius,
        ),
      );
    }

    const pointPositions = new Float32Array(pointCount * 3);
    points.forEach((point, index) => {
      pointPositions.set([point.x, point.y, point.z], index * 3);
    });
    const pointGeometry = new THREE.BufferGeometry();
    pointGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(pointPositions, 3),
    );

    const pointMaterial = new THREE.PointsMaterial({
      color: 0xf1c66d,
      size: 0.045,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
    });
    constellation.add(new THREE.Points(pointGeometry, pointMaterial));

    const linePositions: number[] = [];
    const connectionDistance = 0.92;
    for (let first = 0; first < points.length; first += 1) {
      for (let second = first + 1; second < points.length; second += 1) {
        if (points[first].distanceTo(points[second]) < connectionDistance) {
          linePositions.push(
            points[first].x,
            points[first].y,
            points[first].z,
            points[second].x,
            points[second].y,
            points[second].z,
          );
        }
      }
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePositions, 3),
    );
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x8ed7bc,
      transparent: true,
      opacity: 0.2,
      depthWrite: false,
    });
    constellation.add(new THREE.LineSegments(lineGeometry, lineMaterial));

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.5, 0.004, 4, 96),
      new THREE.MeshBasicMaterial({
        color: 0x8ed7bc,
        transparent: true,
        opacity: 0.25,
      }),
    );
    ring.rotation.set(0.85, 0.15, 0.25);
    constellation.add(ring);

    const resizeObserver = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    });
    resizeObserver.observe(canvas);

    let isVisible = false;
    let frameId = 0;
    let lastFrame = 0;
    const render = (now: number) => {
      frameId = 0;
      if (!isVisible || document.hidden) return;
      frameId = window.requestAnimationFrame(render);
      if (now - lastFrame < 32) return;
      lastFrame = now;
      if (!reducedMotion) {
        constellation.rotation.y += 0.0018;
        constellation.rotation.x = Math.sin(now * 0.0002) * 0.08;
      }
      renderer.render(scene, camera);
    };
    const stopAnimation = () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
      }
    };
    const startAnimation = () => {
      if (!reducedMotion && isVisible && !document.hidden && !frameId) {
        frameId = window.requestAnimationFrame(render);
      }
    };
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) {
        startAnimation();
      } else {
        stopAnimation();
      }
    });
    intersectionObserver.observe(canvas);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAnimation();
      } else {
        startAnimation();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    renderer.render(scene, camera);

    return () => {
      window.cancelAnimationFrame(frameId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      pointGeometry.dispose();
      pointMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      ring.geometry.dispose();
      ring.material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
