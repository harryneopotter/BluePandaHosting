import type { Metadata } from 'next';
import OxSuiteClientPage from './client-page';

export const metadata: Metadata = {
  title: 'OX Suite Business Email — QuantumPanda',
  description: 'Professional email and productivity suite for your business, powered by Open-Xchange and enhanced by AI.'
};

export default function Page() {
  return <OxSuiteClientPage />;
}
