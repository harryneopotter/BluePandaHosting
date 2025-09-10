import type { Metadata } from 'next';
import FullyManagedVpsClientPage from './client-page';

export const metadata: Metadata = {
  title: 'Fully Managed VPS Hosting — QuantumPanda',
  description: 'The power of a VPS, with the convenience of our AI-powered management. Focus on your business, we’ll handle the server.'
};

export default function Page() {
  return <FullyManagedVpsClientPage />;
}
