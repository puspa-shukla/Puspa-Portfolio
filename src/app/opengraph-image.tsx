import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { DATA } from "@/data/resume";

export const alt = `${DATA.name}: ${DATA.role}, Kathmandu, Nepal`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const portrait = await readFile(
    join(process.cwd(), "public", "puspa-profile-circle.jpeg"),
  );
  const portraitSource = `data:image/jpeg;base64,${portrait.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 84px",
          background: "linear-gradient(120deg, #ffffff 0%, #fbf8f2 60%, #e6f0f2 100%)",
          color: "#17343a",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", width: 640 }}>
          <div
            style={{
              display: "flex",
              color: "#1f5f6b",
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            Kathmandu, Nepal
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 22,
              fontSize: 76,
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1.02,
            }}
          >
            {DATA.name}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 18,
              color: "#33525a",
              fontSize: 30,
              lineHeight: 1.3,
            }}
          >
            {DATA.role}
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 36 }}>
            {DATA.proofPoints.map((point) => (
              <div
                key={point.value}
                style={{
                  display: "flex",
                  borderRadius: 999,
                  background: "#17343a",
                  color: "#fff",
                  padding: "12px 18px",
                  fontSize: 18,
                  fontWeight: 700,
                }}
              >
                {point.short}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", marginTop: 40, color: "#5b7a80", fontSize: 18 }}>
            puspashukla.com.np
          </div>
        </div>
        <div
          style={{
            display: "flex",
            width: 360,
            height: 360,
            borderRadius: 999,
            padding: 10,
            background: "linear-gradient(145deg, #1f5f6b, #5b9aaa)",
          }}
        >
          {/* ImageResponse renders static images directly; next/image is not supported here. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={portraitSource}
            alt=""
            width={340}
            height={340}
            style={{ width: 340, height: 340, borderRadius: 999, objectFit: "cover", border: "8px solid #fff" }}
          />
        </div>
      </div>
    ),
    size,
  );
}
