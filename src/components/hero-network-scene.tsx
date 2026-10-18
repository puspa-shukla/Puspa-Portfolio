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
    const lowPowerDevice = (navigator.hardwareConcurrency || 8) <= 4;
    const saveData = (navigator as SaveDataNavigator).connection?.saveData;
    if (reducedMotion || smallScreen || lowPowerDevice || saveData) return;

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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
    renderer.setClearColor(0x000000, 0);

    const network = new THREE.Group();
    scene.add(network);

    const points: THREE.Vector3[] = [];
    let seed = 27;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    for (let index = 0; index < 44; index += 1) {
      points.push(
        new THREE.Vector3(
          (random() - 0.5) * 13,
          (random() - 0.5) * 7,
          (random() - 0.5) * 2.5,
        ),
      );
    }

    const pointPositions = new Float32Array(points.length * 3);
    points.forEach((point, index) => {
      pointPositions.set([point.x, point.y, point.z], index * 3);
    });
    const pointGeometry = new THREE.BufferGeometry();
    pointGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(pointPositions, 3),
    );
    const pointMaterial = new THREE.PointsMaterial({
      color: 0x1f5f6b,
      size: 0.05,
      transparent: true,
      opacity: 0.58,
      sizeAttenuation: true,
      depthWrite: false,
    });
    network.add(new THREE.Points(pointGeometry, pointMaterial));

    const connections: number[] = [];
    for (let first = 0; first < points.length; first += 1) {
      for (let second = first + 1; second < points.length; second += 1) {
        if (points[first].distanceTo(points[second]) < 2.25) {
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

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(connections, 3),
    );
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x5b9aaa,
      transparent: true,
      opacity: 0.12,
      depthWrite: false,
    });
    network.add(new THREE.LineSegments(lineGeometry, lineMaterial));

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
      targetX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.07;
      targetY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.05;
    };

    const render = (now: number) => {
      frameId = 0;
      if (!visible || document.hidden) return;
      frameId = window.requestAnimationFrame(render);
      if (now - lastFrame < 40) return;
      lastFrame = now;
      network.rotation.y +=
        (targetX + Math.sin(now * 0.0002) * 0.055 - network.rotation.y) *
        0.035;
      network.rotation.x +=
        (targetY + Math.cos(now * 0.00016) * 0.025 - network.rotation.x) *
        0.035;
      network.position.x = Math.sin(now * 0.00012) * 0.09;
      network.position.y = Math.sin(now * 0.0003) * 0.12;
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
      pointGeometry.dispose();
      pointMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
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
