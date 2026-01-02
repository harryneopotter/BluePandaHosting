import { QueryProvider } from "../providers/QueryProvider";
import { AIContextProvider } from "../providers/AIContext";
import { ToastProvider } from "../components/ui/Toast";
import { ClientAreaLayout } from "./components/ClientAreaLayout";
import { QuantumAssistant } from "../components/QuantumAssistant/QuantumAssistant";

// Force dynamic rendering for the client area since we need auth
export const dynamic = "force-dynamic";

export default function ClientAreaRootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Note: Authentication check is done via middleware or client-side for this layout
    // In development/mock mode, we bypass auth completely
    // In production, middleware would redirect unauthenticated users

    return (
        <QueryProvider>
            <AIContextProvider>
                <ToastProvider>
                    <ClientAreaLayout>{children}</ClientAreaLayout>
                    <QuantumAssistant />
                </ToastProvider>
            </AIContextProvider>
        </QueryProvider>
    );
}
