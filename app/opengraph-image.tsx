import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "WebXterm – Secure Web Terminal & Browser SSH for Your Infrastructure";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

// Image generation
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#0a0e0a",
          backgroundImage:
            "radial-gradient(circle at 25% 20%, rgba(34,197,94,0.18), transparent 45%), radial-gradient(circle at 80% 90%, rgba(34,197,94,0.10), transparent 40%)",
          padding: "80px",
          fontFamily: "monospace",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            color: "#22c55e",
            fontSize: 34,
            fontWeight: 700,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 14,
              backgroundColor: "rgba(34,197,94,0.12)",
              border: "2px solid rgba(34,197,94,0.4)",
              color: "#22c55e",
              fontSize: 38,
            }}
          >
            {">_"}
          </div>
          WebXterm
        </div>
        <div
          style={{
            display: "flex",
            color: "#ffffff",
            fontSize: 64,
            fontWeight: 800,
            lineHeight: 1.1,
            maxWidth: 1000,
          }}
        >
          Secure Terminal Access for All Your Infrastructure
        </div>
        <div
          style={{
            display: "flex",
            color: "#a1a1aa",
            fontSize: 30,
            marginTop: 28,
            maxWidth: 950,
          }}
        >
          Browser SSH · CLI · VS Code Extension — TLS encrypted, audit logged, zero inbound ports.
        </div>
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: 44,
          }}
        >
          {["Free Community Edition", "No client install", "Self-hostable"].map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                color: "#22c55e",
                fontSize: 22,
                padding: "8px 18px",
                borderRadius: 999,
                border: "1px solid rgba(34,197,94,0.35)",
                backgroundColor: "rgba(34,197,94,0.08)",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
