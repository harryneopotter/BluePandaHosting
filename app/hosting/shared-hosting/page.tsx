import type { Metadata } from 'next';
import SharedHostingClientPage from './client-page';

export const metadata: Metadata = {
  title: 'Shared Hosting — QuantumPanda',
  description: 'Affordable, reliable, and AI-powered shared hosting for small businesses and personal projects.'
};

export default function Page() {
  return <SharedHostingClientPage />;
}
