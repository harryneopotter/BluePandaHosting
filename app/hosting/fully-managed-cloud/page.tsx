import type { Metadata } from 'next';
import FullyManagedCloudClientPage from './client-page';

export const metadata: Metadata = {
  title: 'Fully Managed Cloud Hosting — QuantumPanda',
  description: 'The ultimate hands-free cloud experience. Infinitely scalable, and fully managed by our AI platform and expert team.'
};

export default function Page() {
  return <FullyManagedCloudClientPage />;
}
