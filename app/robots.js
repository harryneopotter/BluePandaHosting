import { PUBLIC_CONFIG } from "./config/publicConfig";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${PUBLIC_CONFIG.app.url}/sitemap.xml`,
  };
}
