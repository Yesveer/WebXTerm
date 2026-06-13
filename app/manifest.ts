import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "WebXterm – Web Terminal & Browser SSH",
    short_name: "WebXterm",
    description:
      "Secure web terminal platform. Access any server, laptop, or bare-metal machine via browser SSH, CLI, or VS Code extension.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0e0a",
    theme_color: "#22c55e",
    icons: [
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
