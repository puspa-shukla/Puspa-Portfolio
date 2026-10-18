"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type SaveDataNavigator = Navigator & {
  connection?: { saveData?: boolean };
};

export default function HeroNetworkScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const smallScreen = window.matchMedia("(max-width: 767px)").matches;
    const lowPowerDevice = (navigator.hardwareConcurrency || 8) <= 2;
    const saveData = (navigator as SaveDataNavigator).connection?.saveData;
    if (reducedMotion || lowPowerDevice || saveData) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: "low-power",
      });
    } catch {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 40);
    camera.position.z = 11;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.2));
    renderer.setClearColor(0x000000, 0);

    const sculpture = new THREE.Group();
    sculpture.position.set(smallScreen ? 0 : 2.65, 0, -0.25);
    scene.add(sculpture);

    const coreGeometry = new THREE.IcosahedronGeometry(1.45, 1);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0x1f5f6b,
      wireframe: true,
      transparent: true,
      opacity: 0.16,
      depthWrite: false,
    });
    sculpture.add(new THREE.Mesh(coreGeometry, coreMaterial));

    const orbitGeometry = new THREE.TorusGeometry(2.05, 0.008, 4, 112);
    const orbitMaterial = new THREE.MeshBasicMaterial({
      color: 0x5b9aaa,
      transparent: true,
      opacity: 0.27,
      depthWrite: false,
    });
    const orbitA = new THREE.Mesh(orbitGeometry, orbitMaterial);
    orbitA.rotation.set(0.95, 0.18, -0.28);
    sculpture.add(orbitA);

    const orbitBGeometry = new THREE.TorusGeometry(1.82, 0.006, 4, 112);
    const orbitBMaterial = new THREE.MeshBasicMaterial({
      color: 0x1f5f6b,
      transparent: true,
      opacity: 0.17,
      depthWrite: false,
    });
    const orbitB = new THREE.Mesh(orbitBGeometry, orbitBMaterial);
    orbitB.rotation.set(0.28, 1.02, 0.64);
    sculpture.add(orbitB);

    const seed = { value: 31 };
    const random = () => {
      seed.value = (seed.value * 16807) % 2147483647;
      return (seed.value - 1) / 2147483646;
    };
    const pointCount = smallScreen ? 17 : 29;
    const points: THREE.Vector3[] = [];
    for (let index = 0; index < pointCount; index += 1) {
      points.push(
        new THREE.Vector3(
          (random() - 0.5) * (smallScreen ? 4.3 : 6.2),
          (random() - 0.5) * 4.7,
          (random() - 0.5) * 2.8,
        ),
      );
    }

    const pointGeometry = new THREE.BufferGeometry().setFromPoints(points);
    const pointMaterial = new THREE.PointsMaterial({
      color: 0x1f5f6b,
      size: 0.052,
      transparent: true,
      opacity: 0.62,
      sizeAttenuation: true,
      depthWrite: false,
    });
    sculpture.add(new THREE.Points(pointGeometry, pointMaterial));

    const connections: number[] = [];
    for (let first = 0; first < points.length; first += 1) {
      for (let second = first + 1; second < points.length; second += 1) {
        if (points[first].distanceTo(points[second]) < 2.15) {
          connections.push(
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

    const connectionGeometry = new THREE.BufferGeometry();
    connectionGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(connections, 3),
    );
    const connectionMaterial = new THREE.LineBasicMaterial({
      color: 0x5b9aaa,
      transparent: true,
      opacity: 0.12,
      depthWrite: false,
    });
    sculpture.add(
      new THREE.LineSegments(connectionGeometry, connectionMaterial),
    );

    const satelliteGeometry = new THREE.SphereGeometry(0.075, 12, 8);
    const satelliteMaterial = new THREE.MeshBasicMaterial({
      color: 0x1f5f6b,
      transparent: true,
      opacity: 0.78,
    });
    const satelliteA = new THREE.Mesh(satelliteGeometry, satelliteMaterial);
    const satelliteB = new THREE.Mesh(
      new THREE.SphereGeometry(0.052, 10, 8),
      new THREE.MeshBasicMaterial({
        color: 0x5b9aaa,
        transparent: true,
        opacity: 0.9,
      }),
    );
    sculpture.add(satelliteA, satelliteB);

    const resizeObserver = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    });
    resizeObserver.observe(canvas);

    let visible = false;
    let frameId = 0;
    let lastFrame = 0;
    let targetX = 0;
    let targetY = 0;
    const handlePointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      if (
        event.clientX < bounds.left ||
        event.clientX > bounds.right ||
        event.clientY < bounds.top ||
        event.clientY > bounds.bottom
      ) {
        targetX = 0;
        targetY = 0;
        return;
      }
      targetX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.08;
      targetY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.05;
    };

    const render = (now: number) => {
      frameId = 0;
      if (!visible || document.hidden) return;
      frameId = window.requestAnimationFrame(render);
      const frameInterval = smallScreen ? 50 : 34;
      if (now - lastFrame < frameInterval) return;
      lastFrame = now;

      sculpture.rotation.y +=
        (targetX + Math.sin(now * 0.00016) * 0.045 - sculpture.rotation.y) *
        0.035;
      sculpture.rotation.x +=
        (targetY + Math.cos(now * 0.00013) * 0.022 - sculpture.rotation.x) *
        0.035;
      sculpture.position.y = Math.sin(now * 0.00028) * 0.11;
      orbitA.rotation.z = -0.28 + Math.sin(now * 0.00012) * 0.045;
      orbitB.rotation.y = 1.02 + Math.cos(now * 0.0001) * 0.05;
      satelliteA.position.set(
        Math.cos(now * 0.00024) * 2.05,
        Math.sin(now * 0.00024) * 0.72,
        Math.sin(now * 0.00024) * 1.05,
      );
      satelliteB.position.set(
        Math.cos(now * 0.00018 + 2) * 1.82,
        Math.sin(now * 0.00018 + 2) * 1.18,
        Math.cos(now * 0.00018 + 2) * 0.65,
      );
      renderer.render(scene, camera);
    };

    const stopAnimation = () => {
      if (!frameId) return;
      window.cancelAnimationFrame(frameId);
      frameId = 0;
    };
    const startAnimation = () => {
      if (visible && !document.hidden && !frameId) {
        frameId = window.requestAnimationFrame(render);
      }
    };
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) startAnimation();
      else stopAnimation();
    });
    visibilityObserver.observe(canvas);

    const handleVisibilityChange = () => {
      if (document.hidden) stopAnimation();
      else startAnimation();
    };
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    renderer.render(scene, camera);

    return () => {
      stopAnimation();
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      coreGeometry.dispose();
      coreMaterial.dispose();
      orbitGeometry.dispose();
      orbitMaterial.dispose();
      orbitBGeometry.dispose();
      orbitBMaterial.dispose();
      pointGeometry.dispose();
      pointMaterial.dispose();
      connectionGeometry.dispose();
      connectionMaterial.dispose();
      satelliteGeometry.dispose();
      satelliteMaterial.dispose();
      satelliteB.geometry.dispose();
      (satelliteB.material as THREE.Material).dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="home-hero-network pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
