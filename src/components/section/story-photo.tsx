"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { Expand, X } from "lucide-react";
import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type PointerEvent,
} from "react";
import { createPortal } from "react-dom";

const MAX_TILT = 6;

const noopSubscribe = () => () => {};

// A story photo that tilts toward the pointer and, when tapped, pops out
// into a full-screen view with a short 3D swing.
export default function StoryPhoto({
  src,
  alt,
  width,
  height,
  caption,
  className = "",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  // The full-screen view is portalled to <body>, which only exists in the browser.
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, { stiffness: 220, damping: 20 });
  const rotateY = useSpring(tiltY, { stiffness: 220, damping: 20 });

  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "Tab") {
        event.preventDefault();
        closeRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      trigger?.focus();
    };
  }, [open]);

  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    tiltX.set(-y * MAX_TILT * 2);
    tiltY.set(x * MAX_TILT * 2);
  };

  const resetTilt = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <figure
      className={`not-prose mx-auto my-0 w-full max-w-sm [perspective:900px] sm:max-w-none ${className}`}
    >
      <motion.button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
        whileHover={reduceMotion ? undefined : { y: -4 }}
        whileTap={reduceMotion ? undefined : { scale: 0.98 }}
        style={{ rotateX, rotateY }}
        aria-label={`Enlarge photo: ${caption}`}
        className="group block w-full cursor-zoom-in rounded-2xl border border-[#c9d6d9] bg-white p-1.5 text-left shadow-[0_18px_40px_-24px_rgba(23,52,58,0.55)] transition-shadow duration-300 hover:shadow-[0_28px_60px_-28px_rgba(23,52,58,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f5f6b] focus-visible:ring-offset-2 dark:border-white/12 dark:bg-[#132c31] dark:shadow-black/40 dark:focus-visible:ring-[#8ed7bc] dark:focus-visible:ring-offset-[#0d2125]"
      >
        <span className="relative block overflow-hidden rounded-xl">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes="(min-width: 640px) 26rem, 100vw"
            className="h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
          <span
            aria-hidden="true"
            className="absolute bottom-2.5 right-2.5 inline-flex size-8 items-center justify-center rounded-full bg-white/90 text-[#17343a] opacity-0 shadow-sm backdrop-blur transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
          >
            <Expand className="size-4" />
          </span>
        </span>
      </motion.button>
      <figcaption className="px-1 pt-3 text-[0.8125rem] leading-snug text-[#33525a] dark:text-[#b5cbd0]">
        {caption}
      </figcaption>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label={caption}
                className="fixed inset-0 z-[90] flex items-center justify-center p-4 [perspective:1400px] sm:p-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.22 }}
                onClick={() => setOpen(false)}
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[#0d2125]/85 backdrop-blur-md"
                />
                <motion.figure
                  className="relative m-0 flex max-h-full max-w-5xl flex-col items-center"
                  initial={
                    reduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, scale: 0.82, rotateX: 14, y: 30 }
                  }
                  animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
                  exit={
                    reduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, scale: 0.9, rotateX: -8, y: 16 }
                  }
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 260, damping: 24 }
                  }
                >
                  <Image
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    sizes="(min-width: 1024px) 64rem, 95vw"
                    className="h-auto max-h-[78vh] w-auto max-w-full rounded-2xl object-contain shadow-[0_40px_90px_-30px_rgba(0,0,0,0.75)] ring-1 ring-white/15"
                  />
                  <figcaption className="mt-4 max-w-2xl text-center text-sm leading-relaxed text-white/85 sm:text-base">
                    {caption}
                  </figcaption>
                </motion.figure>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close photo"
                  className="absolute right-4 top-4 inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-6 sm:top-6"
                >
                  <X className="size-5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </figure>
  );
}
