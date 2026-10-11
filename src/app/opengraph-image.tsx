import { headers } from "next/headers";
import { ImageResponse } from "next/og";
import { DATA } from "@/data/resume";

export const alt = `${DATA.name} portfolio with profile photo`;
export const size = { width: 1200, height: 630 };
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

  const profileImageUrl = `data:image/png;base64,${Buffer.from(
    await profileImage.arrayBuffer(),
  ).toString("base64")}`;
  const portfolioUrl = "https://puspa-shukla.vercel.app/";

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          backgroundColor: "#f4f9f6",
          color: "#17211d",
          display: "flex",
          height: "100%",
          padding: "76px",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            alignItems: "center",
            backgroundColor: "#e2eee7",
            border: "10px solid #ffffff",
            borderRadius: "50%",
            boxShadow: "0 12px 32px rgba(32, 68, 48, 0.12)",
            display: "flex",
            height: "420px",
            justifyContent: "center",
            overflow: "hidden",
            width: "420px",
            flexShrink: 0,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={DATA.name}
            height="420"
            src={profileImageUrl}
            style={{
              borderRadius: "50%",
              height: "100%",
              objectFit: "cover",
              width: "100%",
            }}
            width="420"
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "64px",
            maxWidth: "560px",
          }}
        >
          <div
            style={{
              color: "#397858",
              display: "flex",
              fontSize: "22px",
              fontWeight: 700,
              letterSpacing: "7px",
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
              marginTop: "20px",
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
              marginTop: "20px",
            }}
          >
            BCA student | Web Development, IT Support &amp; Systems Administration
          </div>
          <div
            style={{
              color: "#397858",
              display: "flex",
              fontSize: "23px",
              marginTop: "32px",
            }}
          >
            {portfolioUrl}
          </div>
        </div>
        <div
          style={{
            backgroundColor: "#e4f1e9",
            borderRadius: "50%",
            height: "330px",
            position: "absolute",
            right: "-100px",
            top: "-120px",
            width: "330px",
          }}
        />
      </div>
    ),
    size,
  );
}
