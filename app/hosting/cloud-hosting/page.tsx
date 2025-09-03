import type { Metadata } from 'next';
import CloudHostingClientPage from './client-page';

export const metadata: Metadata = {
  title: 'Cloud Hosting — QuantumPanda',
  description: 'Infinitely scalable, resilient, and intelligent cloud hosting, powered by AI.'
};

export default function Page() {
  return <CloudHostingClientPage />;
}
