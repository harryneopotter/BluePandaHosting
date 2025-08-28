// Centralized public configuration for client-side usage
// Reads NEXT_PUBLIC_* variables where possible, with sensible fallbacks

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const appName = process.env.NEXT_PUBLIC_APP_NAME || "Q Panda";

// Prefer NEXT_PUBLIC_* so values are available client-side; fall back to server vars if present
const whmcsSupportUrl =
  process.env.NEXT_PUBLIC_WHMCS_SUPPORT_URL ||
  process.env.WHMCS_SUPPORT_URL ||
  "https://billing.example.com/submitticket.php";

const whmcsClientAreaUrl =
  process.env.NEXT_PUBLIC_WHMCS_CLIENT_AREA_URL ||
  process.env.WHMCS_CLIENT_AREA_URL ||
  "https://billing.example.com/clientarea.php";

let whmcsBaseUrl = "";
try {
  const pick = whmcsClientAreaUrl || whmcsSupportUrl;
  whmcsBaseUrl = pick ? new URL(pick).origin : "";
} catch {
  whmcsBaseUrl = "";
}

export const PUBLIC_CONFIG = {
  app: {
    url: appUrl,
    name: appName,
  },
  whmcs: {
    supportUrl: whmcsSupportUrl,
    clientAreaUrl: whmcsClientAreaUrl,
    baseUrl: whmcsBaseUrl,
  },
} as const;

