"use client";

import {
    createContext,
    useContext,
    useState,
    useCallback,
    type ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    CheckCircleIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon,
    XCircleIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";

export type ToastType = "success" | "error" | "warning" | "info";

export interface Toast {
    id: string;
    type: ToastType;
    title: string;
    message?: string;
    duration?: number;
}

interface ToastContextType {
    toasts: Toast[];
    addToast: (toast: Omit<Toast, "id">) => void;
    removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
}

const typeConfig: Record<
    ToastType,
    { icon: typeof CheckCircleIcon; bgClass: string; iconClass: string }
> = {
    success: {
        icon: CheckCircleIcon,
        bgClass: "bg-green-500/10 border-green-500/30",
        iconClass: "text-green-400",
    },
    error: {
        icon: XCircleIcon,
        bgClass: "bg-red-500/10 border-red-500/30",
        iconClass: "text-red-400",
    },
    warning: {
        icon: ExclamationTriangleIcon,
        bgClass: "bg-amber-500/10 border-amber-500/30",
        iconClass: "text-amber-400",
    },
    info: {
        icon: InformationCircleIcon,
        bgClass: "bg-primary-500/10 border-primary-500/30",
        iconClass: "text-primary-400",
    },
};

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = useCallback(
        ({ type, title, message, duration = 5000 }: Omit<Toast, "id">) => {
            const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            const toast: Toast = { id, type, title, message, duration };
            setToasts((prev) => [...prev, toast]);

            // Auto-remove
            if (duration > 0) {
                setTimeout(() => {
                    setToasts((prev) => prev.filter((t) => t.id !== id));
                }, duration);
            }
        },
        []
    );

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
            {children}
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </ToastContext.Provider>
    );
}

function ToastContainer({
    toasts,
    removeToast,
}: {
    toasts: Toast[];
    removeToast: (id: string) => void;
}) {
    return (
        <div className="fixed top-4 right-4 z-[100] flex flex-col gap-3 pointer-events-none">
            <AnimatePresence mode="popLayout">
                {toasts.map((toast) => (
                    <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
                ))}
            </AnimatePresence>
        </div>
    );
}

function ToastItem({
    toast,
    onRemove,
}: {
    toast: Toast;
    onRemove: (id: string) => void;
}) {
    const config = typeConfig[toast.type];
    const Icon = config.icon;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.9 }}
            transition={{ type: "spring", duration: 0.3, bounce: 0.2 }}
            className={`
        pointer-events-auto w-80 rounded-xl border backdrop-blur-xl
        ${config.bgClass}
        bg-surface-900/90 shadow-luminous
        overflow-hidden
      `}
        >
            <div className="flex items-start gap-3 p-4">
                <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${config.iconClass}`} />
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-surface-100">{toast.title}</p>
                    {toast.message && (
                        <p className="mt-0.5 text-sm text-surface-400">{toast.message}</p>
                    )}
                </div>
                <button
                    onClick={() => onRemove(toast.id)}
                    className="p-1 shrink-0 rounded-lg text-surface-400 hover:text-surface-200 hover:bg-surface-800/60 transition-colors"
                    aria-label="Dismiss"
                >
                    <XMarkIcon className="w-4 h-4" />
                </button>
            </div>
        </motion.div>
    );
}

export default ToastProvider;
