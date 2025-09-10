import type { Metadata } from 'next';
import SiteMonitoringClientPage from './client-page';

export const metadata: Metadata = {
  title: 'Site & Server Monitoring — QuantumPanda Security',
  description: 'Proactive 24/7 monitoring for your website and server, powered by our predictive AI engine.'
};

export default function Page() {
  return <SiteMonitoringClientPage />;
}
