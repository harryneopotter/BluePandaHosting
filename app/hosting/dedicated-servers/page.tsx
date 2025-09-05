import type { Metadata } from 'next';
import DedicatedServersClientPage from './client-page';

export const metadata: Metadata = {
  title: 'Dedicated Servers — QuantumPanda',
  description: 'Experience ultimate performance and control with our AI-enhanced dedicated server hosting.'
};

export default function Page() {
  return <DedicatedServersClientPage />;
}
