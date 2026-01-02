"use client";

import { Fragment, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    children: ReactNode;
    size?: "sm" | "md" | "lg" | "xl" | "full";
    showCloseButton?: boolean;
}

const sizeStyles = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    full: "max-w-4xl",
};

export function Modal({
    isOpen,
    onClose,
    title,
    description,
    children,
    size = "md",
    showCloseButton = true,
}: ModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <Fragment>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 z-50 bg-surface-950/80 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        aria-hidden="true"
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            className={`
                relative w-full ${sizeStyles[size]} pointer-events-auto
                bg-surface-900/95 backdrop-blur-xl
                rounded-2xl border border-primary-400/20
                shadow-luminous-lg overflow-hidden
              `}
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", duration: 0.3, bounce: 0.2 }}
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby={title ? "modal-title" : undefined}
                            aria-describedby={description ? "modal-description" : undefined}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Top glow line */}
                            <div
                                aria-hidden
                                className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary-400/70 to-transparent"
                            />

                            {/* Close button */}
                            {showCloseButton && (
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 p-1.5 rounded-lg text-surface-400 hover:text-surface-100 hover:bg-surface-800/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
                                    aria-label="Close modal"
                                >
                                    <XMarkIcon className="w-5 h-5" />
                                </button>
                            )}

                            {/* Content */}
                            <div className="p-6">
                                {(title || description) && (
                                    <div className="mb-4 pr-8">
                                        {title && (
                                            <h2
                                                id="modal-title"
                                                className="text-lg font-semibold text-surface-100"
                                            >
                                                {title}
                                            </h2>
                                        )}
                                        {description && (
                                            <p
                                                id="modal-description"
                                                className="mt-1 text-sm text-surface-400"
                                            >
                                                {description}
                                            </p>
                                        )}
                                    </div>
                                )}
                                {children}
                            </div>
                        </motion.div>
                    </div>
                </Fragment>
            )}
        </AnimatePresence>
    );
}

export default Modal;
