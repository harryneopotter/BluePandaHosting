import type { Metadata } from 'next';
import FullyManagedBareMetalClientPage from './client-page';

export const metadata: Metadata = {
  title: 'Fully Managed Bare Metal Servers — QuantumPanda',
  description: 'The ultimate in power and performance, fully managed by our AI platform and expert engineers.'
};

export default function Page() {
  return <FullyManagedBareMetalClientPage />;
}
