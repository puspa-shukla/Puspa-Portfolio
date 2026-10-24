"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

type GalleryVideo = {
  type: "video";
  title: string;
  src: string;
  poster: string;
};

const defaultVideo: GalleryVideo = {
  type: "video",
  title: "Zoom group AI session",
  src: "/ugo-ai-session.mp4",
  poster: "/ugo-ai-session.png",
};

const videos: GalleryVideo[] = [
  {
    type: "video",
    title: "Puspa on learning AI",
    src: "/ugo-ai-video-1.mp4",
    poster: "/ugo-ai-video-1-preview.jpg",
  },
  {
    type: "video",
    title: "AI and student growth",
    src: "/ugo-ai-video-2.mp4",
    poster: "/ugo-ai-video-2-preview.jpg",
  },
  {
    type: "video",
    title: "AI in practice",
    src: "/ugo-ai-video-3.mp4",
    poster: "/ugo-ai-video-3-preview.jpg",
  },
];

export function UgoAiVideoGallery() {
  const [activeItem, setActiveItem] = useState<GalleryVideo>(defaultVideo);
  const [playbackMessage, setPlaybackMessage] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  // Videos only play after a click: never on page load, hover or focus.
  const playRequested = useRef(false);

  const selectItem = (item: GalleryVideo) => {
    setPlaybackMessage("");
    playRequested.current = true;
    setActiveItem(item);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !playRequested.current) return;
    playRequested.current = false;

    void video.play().catch((error: unknown) => {
      if (error instanceof DOMException && error.name === "NotAllowedError") {
        setPlaybackMessage(
          "Your browser blocked automatic playback with sound. Press play on the video to start it."
        );
        return;
      }

      console.error("Unable to play the selected U-GO AI video.", error);
      setPlaybackMessage("This video could not be played.");
    });
  }, [activeItem.src]);

  return (
    <section aria-label="U-GO AI video gallery" className="p-4 sm:p-6">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.65fr)_minmax(13rem,0.8fr)]">
        <div className="flex min-w-0 flex-col items-center">
          <div className="flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl border border-border bg-card">
            <video
              key={activeItem.src}
              ref={videoRef}
              src={activeItem.src}
              poster={activeItem.poster}
              loop
              controls
              playsInline
              preload="metadata"
              onPlay={() => setPlaybackMessage("")}
              aria-label={activeItem.title}
              className="block h-full max-h-[24rem] w-full object-contain"
            >
              Your browser does not support embedded videos.
            </video>
          </div>
          {playbackMessage && (
            <p role="status" className="mt-2 text-center text-xs text-muted-foreground">
              {playbackMessage}
            </p>
          )}
          <p className="mt-3 text-center text-sm font-semibold text-foreground underline decoration-primary/50 decoration-2 underline-offset-4">
            See what Puspa says about AI
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
          {videos.map((item) => {
            const selected = item.src === activeItem.src;
            return (
              <button
                key={item.src}
                type="button"
                onClick={() => selectItem(item)}
                aria-pressed={selected}
                aria-label={`Play ${item.title}`}
                className={`group flex min-w-0 items-center gap-3 rounded-xl border p-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  selected
                    ? "border-primary bg-primary/5"
                    : "border-border bg-background hover:border-primary/60"
                }`}
              >
                <span className="relative flex aspect-video w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted sm:w-28">
                  <img
                    src={item.poster}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/20 text-white transition-colors group-hover:bg-black/35">
                    <Play className="size-5 fill-current" aria-hidden="true" />
                  </span>
                </span>
                <span className="min-w-0 text-xs font-medium leading-snug sm:text-sm">
                  {item.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
