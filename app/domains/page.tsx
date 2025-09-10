import type { Metadata } from 'next';
import DomainServicesClientPage from './client-page';

export const metadata: Metadata = {
  title: 'Domain Services — QuantumPanda',
  description: 'Find, register, and transfer your domains with ease, powered by our AI-assisted tools.'
};

export default function Page() {
  return <DomainServicesClientPage />;
}
