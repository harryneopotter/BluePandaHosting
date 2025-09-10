import type { Metadata } from 'next';
import SslCertificatesClientPage from './client-page';

export const metadata: Metadata = {
  title: 'SSL Certificates — QuantumPanda Security',
  description: 'Secure your site with our range of SSL certificates, managed and monitored by our AI security platform.'
};

export default function Page() {
  return <SslCertificatesClientPage />;
}
