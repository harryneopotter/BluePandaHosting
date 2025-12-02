import type { Metadata } from 'next';
import FeaturesClientPage from './client-page';

export const metadata: Metadata = {
  title: 'Features — QuantumPanda',
  description: 'Explore the powerful features that make our hosting platform fast, secure, and reliable.'
};

export default function Page() {
  return <FeaturesClientPage />;
}
