import type { Metadata } from 'next';
import VpsHostingClientPage from './client-page';

export const metadata: Metadata = {
  title: 'VPS Hosting — QuantumPanda',
  description: 'Powerful, scalable, and AI-enhanced Virtual Private Servers for growing businesses and demanding applications.'
};

export default function Page() {
  return <VpsHostingClientPage />;
}
