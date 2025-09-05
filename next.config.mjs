/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export is disabled when WHMCS integration is enabled
  // since API routes require server-side rendering
  ...(process.env.ENABLE_WHMCS_INTEGRATION === 'true' ? {} : { output: 'export' })
};
export default nextConfig;
