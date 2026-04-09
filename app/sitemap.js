import { PUBLIC_CONFIG } from "./config/publicConfig";

const routes = [
  "",
  "/hosting",
  "/domains",
  "/features",
  "/login",
  "/contact",
  "/status",
  "/blog",
  "/support/tickets",
  "/email/ox-suite",
  "/security/site-monitoring",
];

export default function sitemap() {
  const updatedAt = new Date();
  const baseUrl = PUBLIC_CONFIG.app.url.replace(/\/$/, "");

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: updatedAt,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
