"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import * as THREE from "three";

export type KittyAction = "wave" | "hop" | "tilt" | "nod" | "purr" | "land";

type KittyControls = {
  play: (action: KittyAction) => void;
  attention: (on: boolean) => void;
  moving: (on: boolean) => void;
};

type KittySceneProps = {
  // A new object (new id) plays the action once.
  cue: { action: KittyAction; id: number } | null;
  // True while a conversation choice or the talk button is hovered or focused.
  attention: boolean;
  // True while the page carries the kitty through the air (floating in, or
  // hopping between steps). It lands softly when this turns false.
  moving: boolean;
  // Called when the kitty is tapped, with the point relative to the stage.
  onPet: (x: number, y: number) => void;
  // The tap target opens the kitty's shortcut menu.
  menuId: string;
  menuOpen: boolean;
};

// Slow, unhurried timings so the kitty feels calm rather than busy.
const DURATIONS: Record<KittyAction, number> = {
  wave: 2000,
  hop: 1000,
  tilt: 1800,
  nod: 1500,
  purr: 2200,
  land: 700,
};

const HALF_FOV = (30 / 2) * (Math.PI / 180);
// Seated kitty height in world units, used to size it to the stage.
const KITTY_HEIGHT = 2.2;
const HEAD_Y = 1.45;

// A warm ginger kitten reads well on both the light and the dark page; in dark
// mode the coat is a touch brighter and a teal rim light outlines it.
const PALETTES = {
  light: { coat: 0xf0a057, stripe: 0xd27a34, rim: 0xffe2c0, rimIntensity: 1 },
  dark: { coat: 0xf7b46c, stripe: 0xdc8740, rim: 0x8ed7bc, rimIntensity: 2.4 },
};
// Idle moments are quiet ones: a curious tilt or a contented slow blink.
const IDLE_ACTIONS: KittyAction[] = ["tilt", "purr", "nod"];

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
// Rises over the first `rise` fraction, holds, falls over the last `fall`.
const envelope = (progress: number, rise = 0.2, fall = 0.25) =>
  Math.min(clamp01(progress / rise), clamp01((1 - progress) / fall));

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function KittyScene({
  cue,
  attention,
  moving,
  onPet,
  menuId,
  menuOpen,
}: KittySceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<KittyControls | null>(null);
  // This component is loaded client-only, so the check can run on first render.
  const [supported] = useState(hasWebGL);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !supported) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const lowPower = (navigator.hardwareConcurrency || 8) <= 4;
    const smallScreen = window.matchMedia("(max-width: 767px)").matches;
    const lite = smallScreen || lowPower;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: !lowPower,
        powerPreference: "low-power",
      });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, lite ? 1.5 : 2));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 80);
    const lookTarget = new THREE.Vector3();

    scene.add(new THREE.HemisphereLight(0xfff6ea, 0x9cc4b8, 1.2));
    const key = new THREE.DirectionalLight(0xfff1dd, 1.8);
    key.position.set(3, 5, 4);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xbfeedd, 1.1);
    rim.position.set(-4, 2.5, -3);
    scene.add(rim);

    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];
    const geo = <T extends THREE.BufferGeometry>(geometry: T) => {
      geometries.push(geometry);
      return geometry;
    };
    const standard = (color: number, roughness = 0.8, metalness = 0) => {
      const material = new THREE.MeshStandardMaterial({ color, roughness, metalness });
      materials.push(material);
      return material;
    };
    const basic = (color: number, opacity = 1) => {
      const material = new THREE.MeshBasicMaterial({ color, transparent: opacity < 1, opacity });
      materials.push(material);
      return material;
    };
    type Vec = [number, number, number];
    const add = (
      parent: THREE.Object3D,
      geometry: THREE.BufferGeometry,
      material: THREE.Material,
      position: Vec,
      scale?: Vec,
      rotation?: Vec,
    ) => {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(...position);
      if (scale) mesh.scale.set(...scale);
      if (rotation) mesh.rotation.set(...rotation);
      parent.add(mesh);
      return mesh;
    };

    const segments = lite ? 24 : 36;
    const sphere = geo(new THREE.SphereGeometry(1, segments, Math.round(segments * 0.75)));
    const cone = geo(new THREE.ConeGeometry(1, 1, Math.round(segments / 2)));
    const rod = geo(new THREE.CylinderGeometry(1, 1, 1, 6));

    // A round, fluffy ginger kitten: cream muzzle, belly and paws, big
    // sparkly eyes, rosy cheeks and a soft smile.
    const coat = standard(PALETTES.light.coat, 0.75);
    const stripe = standard(PALETTES.light.stripe, 0.75);
    const cream = standard(0xfff3e2, 0.8);
    const pink = standard(0xff9fb0, 0.6);
    const eyeMaterial = standard(0x2a1c18, 0.15);
    const teal = standard(0x2a9d8f, 0.45);
    const gold = standard(0xffc23a, 0.25, 0.6);
    const shine = basic(0xffffff);
    const whiskerMaterial = basic(0xfff8ef);
    const blush = basic(0xff7f96, 0.38);
    const mouthMaterial = basic(0x5a3229);

    // Follow the site theme (next-themes toggles the `dark` class on <html>).
    const applyTheme = () => {
      const palette = document.documentElement.classList.contains("dark")
        ? PALETTES.dark
        : PALETTES.light;
      coat.color.setHex(palette.coat);
      stripe.color.setHex(palette.stripe);
      rim.color.setHex(palette.rim);
      rim.intensity = palette.rimIntensity;
    };
    applyTheme();

    const mover = new THREE.Group();
    scene.add(mover);
    const kitty = new THREE.Group();
    mover.add(kitty);

    // Round body with a cream belly, tucked haunches and little hind paws.
    const body = new THREE.Group();
    kitty.add(body);
    add(body, sphere, coat, [0, 0.55, 0], [0.5, 0.55, 0.46]);
    add(body, sphere, cream, [0, 0.55, 0.28], [0.3, 0.38, 0.2]);
    for (const side of [-1, 1]) {
      add(body, sphere, coat, [side * 0.3, 0.25, 0], [0.24, 0.22, 0.3]);
      add(body, sphere, cream, [side * 0.3, 0.05, 0.24], [0.12, 0.07, 0.13]);
    }

    // Teal collar with a little gold bell that swings.
    const collar = geo(new THREE.TorusGeometry(0.28, 0.035, 10, 40));
    add(kitty, collar, teal, [0, 1.02, 0.02], [1, 0.9, 1], [Math.PI / 2 - 0.15, 0, 0]);
    const bell = new THREE.Group();
    bell.position.set(0, 0.99, 0.3);
    kitty.add(bell);
    add(bell, sphere, gold, [0, -0.06, 0], [0.065, 0.065, 0.065]);

    // Short, chubby front legs with cream paws; the one on the viewer's left waves.
    const arms: THREE.Group[] = [];
    const leg = geo(new THREE.CapsuleGeometry(0.085, 0.5, 6, 12));
    for (const side of [-1, 1]) {
      const shoulder = new THREE.Group();
      shoulder.position.set(side * 0.17, 0.78, 0.26);
      shoulder.rotation.x = -0.12;
      add(shoulder, leg, coat, [0, -0.35, 0]);
      add(shoulder, sphere, cream, [0, -0.66, 0.04], [0.11, 0.08, 0.12]);
      kitty.add(shoulder);
      arms.push(shoulder);
    }
    const waveArm = arms[0];

    // Big round head with fluffy cheeks, a puffy cream muzzle and tabby stripes.
    const head = new THREE.Group();
    head.position.set(0, HEAD_Y, 0.05);
    kitty.add(head);
    add(head, sphere, coat, [0, 0, 0], [0.6, 0.52, 0.5]);
    for (const side of [-1, 1]) {
      add(head, sphere, coat, [side * 0.36, -0.12, 0.1], [0.26, 0.2, 0.26]);
      add(head, sphere, cream, [side * 0.075, -0.15, 0.42], [0.11, 0.085, 0.08]);
    }
    add(head, sphere, cream, [0, -0.22, 0.38], [0.09, 0.06, 0.07]);
    for (const [x, y, tilt] of [
      [-0.11, 0.32, 0.25],
      [0, 0.35, 0],
      [0.11, 0.32, -0.25],
    ]) {
      add(head, sphere, stripe, [x, y, 0.37], [0.025, 0.085, 0.03], [-0.8, 0, tilt]);
    }
    add(head, sphere, pink, [0, -0.075, 0.5], [0.045, 0.032, 0.03]);

    // A soft, genuine smile: a short line down from the nose into two
    // upturned curves, the classic contented cat mouth. It widens a little
    // when the kitty is happy.
    const smile = new THREE.Group();
    smile.position.set(0, -0.13, 0.505);
    smile.rotation.x = -0.25;
    head.add(smile);
    add(smile, rod, mouthMaterial, [0, 0.014, 0], [0.006, 0.034, 0.006]);
    const smileArc = geo(new THREE.TorusGeometry(0.034, 0.0075, 6, 18, Math.PI));
    for (const side of [-1, 1]) {
      // A torus arc is an upside-down U; flipping it makes the smile.
      add(smile, smileArc, mouthMaterial, [side * 0.034, 0, 0], undefined, [0, 0, Math.PI]);
    }

    // Big glossy eyes with two highlights each: the classic kitten sparkle.
    const eyes: THREE.Group[] = [];
    for (const side of [-1, 1]) {
      const eye = new THREE.Group();
      eye.position.set(side * 0.2, 0.03, 0.44);
      eye.rotation.set(0, side * 0.35, 0);
      add(eye, sphere, eyeMaterial, [0, 0, 0], [0.1, 0.11, 0.05]);
      add(eye, sphere, shine, [0.03, 0.04, 0.045], [0.035, 0.035, 0.01]);
      add(eye, sphere, shine, [-0.03, -0.035, 0.045], [0.016, 0.016, 0.01]);
      head.add(eye);
      eyes.push(eye);
      add(head, sphere, blush, [side * 0.3, -0.1, 0.415], [0.08, 0.045, 0.02], [0, side * 0.6, 0]);
    }

    const ears: THREE.Group[] = [];
    for (const side of [-1, 1]) {
      const ear = new THREE.Group();
      ear.position.set(side * 0.34, 0.36, -0.02);
      ear.rotation.z = -side * 0.38;
      add(ear, cone, coat, [0, 0.15, 0], [0.2, 0.36, 0.12]);
      add(ear, cone, pink, [0, 0.13, 0.06], [0.12, 0.24, 0.05]);
      head.add(ear);
      ears.push(ear);

      for (const [index, tilt] of [0.12, -0.06].entries()) {
        add(
          head,
          rod,
          whiskerMaterial,
          [side * 0.4, -0.12 - index * 0.045, 0.44],
          [0.004, 0.3, 0.004],
          [0, 0, Math.PI / 2 + side * tilt],
        );
      }
    }

    // A fluffy tail curling up behind, cream at the tip.
    const tail = new THREE.Group();
    tail.position.set(0.22, 0.12, -0.3);
    kitty.add(tail);
    const tailCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0.3, -0.03, -0.14),
      new THREE.Vector3(0.52, 0.2, -0.12),
      new THREE.Vector3(0.58, 0.58, 0),
      new THREE.Vector3(0.46, 0.88, 0.1),
    ]);
    add(tail, geo(new THREE.TubeGeometry(tailCurve, 48, 0.075, 12)), coat, [0, 0, 0]);
    add(tail, sphere, cream, [0.46, 0.88, 0.1], [0.085, 0.1, 0.085]);

    // Soft contact shadow; it shrinks away while the kitty is in the air.
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = shadowCanvas.height = 128;
    const shadowContext = shadowCanvas.getContext("2d");
    if (shadowContext) {
      const gradient = shadowContext.createRadialGradient(64, 64, 0, 64, 64, 64);
      gradient.addColorStop(0, "rgba(23, 52, 58, 0.35)");
      gradient.addColorStop(1, "rgba(23, 52, 58, 0)");
      shadowContext.fillStyle = gradient;
      shadowContext.fillRect(0, 0, 128, 128);
    }
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const shadowMaterial = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false,
    });
    materials.push(shadowMaterial);
    const shadow = add(scene, geo(new THREE.PlaneGeometry(1.9, 0.9)), shadowMaterial, [0.05, 0.005, 0], undefined, [
      -Math.PI / 2,
      0,
      0,
    ]);

    // ---- Animation state ----
    const start = performance.now();
    const motion = reducedMotion ? 0 : 1;
    let action: { name: KittyAction; start: number } | null = null;
    let queue: KittyAction[] = [];
    let nextIdleAt = start + 14000;
    let movingOn = false;
    let travel = 0;
    let nextBlink = start + 2600;
    let blinkStart = -1;
    let attentionOn = false;
    let attentionLevel = 0;
    let pointerX = 0;
    let pointerY = 0;
    let lookX = 0;
    let lookY = 0;
    let eyeOpen = 1;
    let eyeSize = 1;
    let smileLevel = 0.3;
    let awakeUntil = start + 1500;

    const frameInterval = lite ? 33 : 22;
    let visible = false;
    let frameId = 0;
    let lastFrame = 0;

    const renderFrame = (now: number) => {
      const t = (now - start) / 1000;

      // In-air pose eases in while the page carries the kitty, and out again.
      travel += ((movingOn ? 1 : 0) - travel) * (reducedMotion ? 1 : 0.12);
      const falling = travel;
      shadow.scale.setScalar(Math.max(0.001, 1 - falling));

      if (!action && queue.length) {
        action = { name: queue.shift() as KittyAction, start: now };
      }
      if (!reducedMotion && !movingOn && !action && now >= nextIdleAt) {
        action = { name: IDLE_ACTIONS[Math.floor(Math.random() * IDLE_ACTIONS.length)], start: now };
        nextIdleAt = now + 14000 + Math.random() * 8000;
      }

      let headTilt = 0;
      let headPitch = 0;
      let hop = 0;
      let squash = 0;
      let wave = 0;
      let wiggle = 0;
      // Softly narrowed eyes read as a relaxed, smiling face.
      let eyeTarget = 0.88;
      let sizeTarget = 1;
      let earPerk = Math.max(attentionLevel, falling * 0.5);
      let tailSpeed = 1;
      // How broad the smile is; it warms up on hover and when happy.
      let happy = 0.3 + 0.4 * attentionLevel;

      if (action) {
        const progress = (now - action.start) / DURATIONS[action.name];
        if (progress >= 1) {
          action = null;
        } else {
          const env = reducedMotion ? 1 : envelope(progress);
          switch (action.name) {
            case "land":
              squash = Math.sin(Math.PI * progress) * 0.05 * (1 - progress * 0.5);
              eyeTarget = 0.6;
              happy = Math.max(happy, env);
              break;
            case "wave":
              wave = env;
              eyeTarget = 0.7;
              happy = Math.max(happy, env);
              break;
            case "hop":
              hop = progress < 0.7 ? Math.sin((Math.PI * progress) / 0.7) * 0.14 : 0;
              squash = progress >= 0.7 ? Math.sin((Math.PI * (progress - 0.7)) / 0.3) * 0.035 : 0;
              eyeTarget = 0.5;
              earPerk = 1;
              happy = Math.max(happy, env);
              break;
            case "tilt":
              headTilt = 0.18 * env;
              sizeTarget = 1 + 0.08 * env;
              earPerk = Math.max(earPerk, env);
              break;
            case "nod":
              headPitch = Math.sin(progress * Math.PI * 2) * 0.09 * (1 - progress);
              eyeTarget = 0.5;
              happy = Math.max(happy, env);
              break;
            case "purr":
              // A contented slow blink with a broad smile.
              eyeTarget = 1 - 0.9 * env;
              headTilt = -0.14 * env;
              wiggle = Math.sin(t * 6) * 0.012 * env;
              earPerk = -0.3 * env;
              tailSpeed = 1.3;
              happy = Math.max(happy, env);
              break;
          }
        }
      }

      kitty.scale.set(1 + squash * motion, 1 - squash * motion, 1 + squash * motion);
      kitty.position.y = hop * motion;
      kitty.rotation.set(0, -0.2, wiggle * motion);

      // Slow, relaxed breathing.
      const breath = Math.sin(t * 1.5) * motion;
      body.scale.set(1 + breath * 0.01, 1 + breath * 0.015, 1);
      head.position.y = HEAD_Y + breath * 0.008;

      // Look toward the pointer within a natural range, easing in gently.
      const lookTargetX = movingOn ? 0 : pointerX * 0.35;
      const lookTargetY = movingOn ? -0.15 * falling : pointerY * 0.2;
      lookX += (lookTargetX - lookX) * 0.05;
      lookY += (lookTargetY - lookY) * 0.05;
      head.rotation.set(lookY + headPitch * motion, lookX + 0.15, headTilt * motion - lookX * 0.12);

      // Ears perk up on hover and while falling.
      attentionLevel += ((attentionOn ? 1 : 0) - attentionLevel) * 0.12;
      ears.forEach((ear, index) => {
        const side = index === 0 ? -1 : 1;
        ear.rotation.x = -0.3 * earPerk;
        ear.rotation.z = -side * (0.3 - 0.1 * earPerk);
      });

      // Blinks, expression and eye size.
      if (!reducedMotion && now >= nextBlink) {
        blinkStart = now;
        nextBlink = now + 2600 + Math.random() * 3400;
      }
      const blinkProgress = blinkStart > 0 ? (now - blinkStart) / 160 : 1;
      const blink = blinkProgress < 1 ? Math.max(0.08, 1 - Math.sin(Math.PI * blinkProgress)) : 1;
      eyeOpen += (eyeTarget - eyeOpen) * (reducedMotion ? 1 : 0.22);
      eyeSize += (sizeTarget - eyeSize) * (reducedMotion ? 1 : 0.18);
      eyes.forEach((eye) => eye.scale.set(eyeSize, Math.max(0.08, eyeOpen * blink) * eyeSize, 1));

      // The smile broadens smoothly with happiness.
      smileLevel += (happy - smileLevel) * (reducedMotion ? 1 : 0.08);
      smile.scale.set(1 + 0.35 * smileLevel, 1 + 0.25 * smileLevel, 1);

      // Paws open slightly while floating down; the left one gives a gentle wave.
      const fallSpread = 0.25 * falling * motion;
      waveArm.rotation.z = (-2.3 + Math.sin(t * 5) * 0.22 * motion) * wave - fallSpread;
      waveArm.rotation.x = -0.16 + 0.45 * wave;
      arms[1].rotation.z = fallSpread;

      // Tail sways lazily; the bell barely swings.
      tail.rotation.y = Math.sin(t * 0.9 * tailSpeed) * 0.22 * motion;
      tail.rotation.z = Math.sin(t * 0.6) * 0.05 * motion + 0.15 * falling;
      bell.rotation.z =
        (Math.sin(t * 3) * (0.05 + 0.15 * falling + (hop || squash ? 0.15 : 0)) + wiggle * 3) * motion;

      renderer.render(scene, camera);
    };

    const shouldRun = (now: number) =>
      visible &&
      !document.hidden &&
      (!reducedMotion || now < awakeUntil || action !== null || movingOn);

    const loop = (now: number) => {
      frameId = 0;
      if (!shouldRun(now)) return;
      frameId = window.requestAnimationFrame(loop);
      if (now - lastFrame < frameInterval) return;
      lastFrame = now;
      renderFrame(now);
    };
    const startLoop = () => {
      if (!frameId && shouldRun(performance.now())) {
        frameId = window.requestAnimationFrame(loop);
      }
    };
    const stopLoop = () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      frameId = 0;
    };

    controlsRef.current = {
      play: (name) => {
        const now = performance.now();
        action = { name, start: now };
        queue = [];
        nextIdleAt = now + 9000;
        awakeUntil = now + DURATIONS[name] + 400;
        if (reducedMotion) renderFrame(now);
        startLoop();
      },
      attention: (on) => {
        attentionOn = on;
        awakeUntil = performance.now() + 900;
        startLoop();
      },
      moving: (on) => {
        if (on === movingOn) return;
        movingOn = on;
        const now = performance.now();
        awakeUntil = now + 900;
        if (on) {
          action = null;
          queue = [];
        } else {
          // Touch down softly, then a small happy wave.
          action = { name: "land", start: now };
          queue = ["wave"];
          nextIdleAt = now + 14000;
          awakeUntil = now + DURATIONS.land + DURATIONS.wave + 400;
        }
        if (reducedMotion) renderFrame(now);
        startLoop();
      },
    };

    const resizeObserver = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      // Size the kitty to the stage (it can't be wider than the stage allows),
      // with the ground along the bottom edge.
      const kittyPx = Math.min(height * 0.72, width * 1.1);
      const visibleHeight = (KITTY_HEIGHT * height) / kittyPx;
      const distance = visibleHeight / (2 * Math.tan(HALF_FOV));
      lookTarget.set(0, visibleHeight / 2 - 0.04, 0);
      camera.position.set(0, lookTarget.y + 0.3, distance);
      camera.lookAt(lookTarget);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderFrame(performance.now());
    });
    resizeObserver.observe(canvas);

    // Re-colour the kitty when the visitor switches between light and dark.
    const themeObserver = new MutationObserver(() => {
      applyTheme();
      renderFrame(performance.now());
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) startLoop();
      else stopLoop();
    });
    visibilityObserver.observe(canvas);

    const handleVisibilityChange = () => {
      if (document.hidden) stopLoop();
      else startLoop();
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height * 0.6;
      pointerX = Math.max(-1, Math.min(1, (event.clientX - centerX) / (window.innerWidth * 0.5)));
      pointerY = Math.max(-1, Math.min(1, (event.clientY - centerY) / (window.innerHeight * 0.5)));
    };
    const tracksPointer = finePointer && !reducedMotion;
    if (tracksPointer) {
      window.addEventListener("pointermove", handlePointerMove, { passive: true });
    }

    return () => {
      stopLoop();
      controlsRef.current = null;
      if (tracksPointer) window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      visibilityObserver.disconnect();
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      shadowTexture.dispose();
      renderer.dispose();
    };
  }, [supported]);

  useEffect(() => {
    if (cue) controlsRef.current?.play(cue.action);
  }, [cue]);

  useEffect(() => {
    controlsRef.current?.attention(attention);
  }, [attention]);

  useEffect(() => {
    controlsRef.current?.moving(moving);
  }, [moving]);

  const handlePet = (event: MouseEvent<HTMLButtonElement>) => {
    const stage = stageRef.current?.getBoundingClientRect();
    const button = event.currentTarget.getBoundingClientRect();
    if (!stage) return;
    // Keyboard activation has no pointer position; use the kitty's head.
    const fromKeyboard = event.detail === 0;
    const clientX = fromKeyboard ? button.left + button.width / 2 : event.clientX;
    const clientY = fromKeyboard ? button.top + button.height * 0.25 : event.clientY;
    controlsRef.current?.play("purr");
    onPet(clientX - stage.left, clientY - stage.top);
  };

  return (
    <div ref={stageRef} className="pointer-events-none absolute inset-0">
      {supported ? (
        <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
      ) : (
        <KittyFallback />
      )}
      {/* Tap area over the seated kitty only, so nearby text stays usable. */}
      <button
        type="button"
        onClick={handlePet}
        aria-label="Kitty shortcuts"
        aria-haspopup="true"
        aria-expanded={menuOpen}
        aria-controls={menuId}
        className="kitty-stage pointer-events-auto absolute bottom-0 left-1/2 aspect-[6/11] w-[60%] -translate-x-1/2 rounded-2xl"
      />
    </div>
  );
}

// Shown when WebGL isn't available: a simple drawn ginger kitten.
function KittyFallback() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 140"
      className="absolute bottom-0 left-1/2 w-[80%] -translate-x-1/2"
    >
      <ellipse cx="60" cy="137" rx="36" ry="3.5" fill="rgb(23 52 58 / 0.18)" />
      <path d="M86 128c16-4 20-24 10-38" stroke="#f0a057" strokeWidth="9" fill="none" strokeLinecap="round" />
      <ellipse cx="60" cy="104" rx="32" ry="33" fill="#f0a057" />
      <ellipse cx="60" cy="108" rx="18" ry="22" fill="#fff3e2" />
      <path d="M26 46 30 10 52 30Z M94 46 90 10 68 30Z" fill="#f0a057" />
      <path d="M32 38 33 18 45 30Z M88 38 87 18 75 30Z" fill="#ff9fb0" />
      <ellipse cx="60" cy="52" rx="38" ry="32" fill="#f0a057" />
      <path d="M54 24v8 M60 22v9 M66 24v8" stroke="#d27a34" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="54" cy="64" rx="8" ry="6" fill="#fff3e2" />
      <ellipse cx="66" cy="64" rx="8" ry="6" fill="#fff3e2" />
      <ellipse cx="46" cy="52" rx="6" ry="7" fill="#2a1c18" />
      <ellipse cx="74" cy="52" rx="6" ry="7" fill="#2a1c18" />
      <circle cx="48" cy="49" r="2.2" fill="#fff" />
      <circle cx="76" cy="49" r="2.2" fill="#fff" />
      <ellipse cx="36" cy="62" rx="5" ry="3" fill="#ff7f96" opacity="0.45" />
      <ellipse cx="84" cy="62" rx="5" ry="3" fill="#ff7f96" opacity="0.45" />
      <ellipse cx="60" cy="59" rx="3" ry="2" fill="#ff9fb0" />
      <path d="M55 63q2.5 3 5 0q2.5 3 5 0" stroke="#5a3229" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path d="M38 82h44" stroke="#2a9d8f" strokeWidth="4" strokeLinecap="round" />
      <circle cx="60" cy="87" r="3.5" fill="#ffc23a" />
    </svg>
  );
}
