import type { Metadata } from 'next';
import WordPressHostingClientPage from './client-page';

export const metadata: Metadata = {
  title: 'Managed WordPress Hosting — QuantumPanda',
  description: 'Focus on your content and let our AI-powered platform handle the rest. The best managed WordPress hosting experience.'
};

export default function Page() {
  return <WordPressHostingClientPage />;
}
