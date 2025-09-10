import type { Metadata } from 'next';
import SpamExpertsClientPage from './client-page';

export const metadata: Metadata = {
  title: 'SpamExperts Email Security — QuantumPanda',
  description: 'Protect your inbox from spam, viruses, and phishing threats with our AI-enhanced SpamExperts filtering.'
};

export default function Page() {
  return <SpamExpertsClientPage />;
}
