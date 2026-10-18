import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt =
  "Puspa Shukla: the first U-GO AI scholar to finish the course, now helping women learn across borders";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const communityPhoto = await readFile(
    join(process.cwd(), "public", "ugo-peer-learning.png"),
  );
  const communityPhotoSource = `data:image/png;base64,${communityPhoto.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
          background: "#f3f1e9",
          color: "#173b3d",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 72% 15%, rgba(142,215,188,0.45), transparent 35%), linear-gradient(135deg, #f3f1e9 0%, #e7eee7 100%)",
          }}
        />
        <div
          style={{
            display: "flex",
            position: "absolute",
            right: -75,
            top: -165,
            width: 680,
            height: 940,
            borderRadius: "50%",
            background: "#173b3d",
            transform: "rotate(18deg)",
          }}
        />
        <div
          style={{
            display: "flex",
            position: "absolute",
            right: 76,
            top: 146,
            width: 440,
            height: 320,
            overflow: "hidden",
            border: "8px solid rgba(255,255,255,0.88)",
            borderRadius: 26,
            boxShadow: "0 28px 70px rgba(13,38,39,0.24)",
            transform: "rotate(2deg)",
          }}
        >
          {/* ImageResponse renders static images directly; next/image is not supported here. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={communityPhotoSource}
            alt=""
            width={440}
            height={320}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            left: 76,
            top: 74,
            width: 630,
            height: 490,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              color: "#4f8675",
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            PUSPA SHUKLA <span style={{ color: "#c4943d" }}>·</span> AI EDUCATOR
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 42,
              fontFamily: "Georgia, serif",
              fontSize: 58,
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1.08,
            }}
          >
            <span>The girl who</span>
            <span>didn’t wait to</span>
            <span>be asked.</span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 22,
              maxWidth: 500,
              color: "#435c5b",
              fontSize: 22,
              lineHeight: 1.45,
            }}
          >
            From first to finish to helping 3,000+ women build confidence with AI.
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
            {["3,000+ SCHOLARS", "9 COUNTRIES", "FIRST TO FINISH"].map(
              (stat) => (
                <div
                  key={stat}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    borderRadius: 24,
                    background: "#173b3d",
                    color: "#fff",
                    padding: "11px 14px",
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: 0.6,
                  }}
                >
                  {stat}
                </div>
              ),
            )}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "auto",
              color: "#71817b",
              fontSize: 16,
            }}
          >
            puspashukla.com.np/blog
          </div>
        </div>
      </div>
    ),
    size,
  );
}
