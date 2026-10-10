import { ImageResponse } from "next/og";
import { headers } from "next/headers";
import { DATA } from "@/data/resume";

export const alt = `${DATA.name} — Portfolio`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");

  if (!host) {
    throw new Error("Could not determine host for the portfolio preview image");
  }

  const protocol = requestHeaders.get("x-forwarded-proto") ?? "http";
  const profileImage = await fetch(
    new URL("/puspa-profile.png", `${protocol}://${host}`),
  );

  if (!profileImage.ok) {
    throw new Error(`Could not load portfolio profile image (${profileImage.status})`);
  }

  const profileImageData = await profileImage.arrayBuffer();
  const profileImageUrl = `data:image/png;base64,${Buffer.from(profileImageData).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#f7faf8",
          color: "#17211d",
          display: "flex",
          height: "100%",
          padding: "64px",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            alignItems: "center",
            background: "#e4f2e9",
            border: "12px solid #ffffff",
            borderRadius: "50%",
            boxShadow: "0 16px 48px rgba(28, 66, 47, 0.15)",
            display: "flex",
            height: "420px",
            justifyContent: "center",
            overflow: "hidden",
            width: "420px",
            flexShrink: 0,
          }}
        >
          {/* ImageResponse requires a plain img element for raster image embedding. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={DATA.name}
            height="420"
            src={profileImageUrl}
            style={{ height: "100%", objectFit: "cover", width: "100%" }}
            width="420"
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "64px",
            maxWidth: "570px",
          }}
        >
          <div
            style={{
              color: "#367653",
              display: "flex",
              fontSize: "22px",
              fontWeight: 700,
              letterSpacing: "5px",
              textTransform: "uppercase",
            }}
          >
            Portfolio
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "66px",
              fontWeight: 700,
              letterSpacing: "-2px",
              lineHeight: 1.1,
              marginTop: "22px",
            }}
          >
            {DATA.name}
          </div>
          <div
            style={{
              color: "#52645a",
              display: "flex",
              fontSize: "27px",
              lineHeight: 1.4,
              marginTop: "22px",
            }}
          >
            BCA student | Web Development, IT Support &amp; Systems Administration
          </div>
          <div
            style={{
              color: "#367653",
              display: "flex",
              fontSize: "22px",
              marginTop: "34px",
            }}
          >
            puspa-shukla.vercel.app
          </div>
        </div>
        <div
          style={{
            background: "#d5e9dc",
            borderRadius: "50%",
            height: "330px",
            opacity: 0.5,
            position: "absolute",
            right: "-90px",
            top: "-120px",
            width: "330px",
          }}
        />
      </div>
    ),
    size,
  );
}
