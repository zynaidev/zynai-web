import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ZynAI",
    short_name: "ZynAI",
    description:
      "AI integráció, automatizáció és folyamatfejlesztés magyar vállalkozásoknak.",
    start_url: "/",
    display: "standalone",
    background_color: "#09090b",
    theme_color: "#09090b",
    lang: "hu",
    icons: [
      {
        src: "/ZynAI_favicon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/ZynAI_favicon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
