"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    SparklesIcon,
    XMarkIcon,
    PaperAirplaneIcon,
    ArrowsPointingOutIcon,
    ArrowsPointingInIcon,
} from "@heroicons/react/24/outline";
import { useAIContext, type AIMessage, type AIAction } from "../../providers/AIContext";

export function QuantumAssistant() {
    const {
        messages,
        isOpen,
        isExpanded,
        isLoading,
        toggleOpen,
        toggleExpanded,
        sendMessage,
        executeAction,
    } = useAIContext();

    const [input, setInput] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom on new messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const message = input.trim();
        setInput("");
        await sendMessage(message);
    };

    return (
        <>
            {/* Toggle Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        onClick={toggleOpen}
                        className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 text-white shadow-luminous-lg hover:shadow-glow-cyan transition-shadow"
                        aria-label="Open AI Assistant"
                    >
                        <SparklesIcon className="w-6 h-6" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: "spring", duration: 0.3, bounce: 0.2 }}
                        className={`
              fixed z-50 bg-surface-900/95 backdrop-blur-xl border border-primary-400/20 shadow-luminous-lg
              flex flex-col overflow-hidden
              ${isExpanded
                                ? "bottom-0 right-0 w-full sm:w-[400px] h-full sm:h-[calc(100vh-2rem)] sm:bottom-4 sm:right-4 rounded-none sm:rounded-2xl"
                                : "bottom-6 right-6 w-[350px] h-[500px] rounded-2xl"
                            }
            `}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-surface-700/50 bg-surface-900/80">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary-500/20 to-accent-500/20">
                                    <SparklesIcon className="w-4 h-4 text-primary-400" />
                                </div>
                                <h3 className="font-semibold text-surface-100">
                                    Quantum Assistant
                                </h3>
                                {isLoading && (
                                    <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
                                )}
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={toggleExpanded}
                                    className="p-1.5 rounded-lg text-surface-400 hover:text-surface-200 hover:bg-surface-800/60 transition-colors"
                                    aria-label={isExpanded ? "Minimize" : "Expand"}
                                >
                                    {isExpanded ? (
                                        <ArrowsPointingInIcon className="w-4 h-4" />
                                    ) : (
                                        <ArrowsPointingOutIcon className="w-4 h-4" />
                                    )}
                                </button>
                                <button
                                    onClick={toggleOpen}
                                    className="p-1.5 rounded-lg text-surface-400 hover:text-surface-200 hover:bg-surface-800/60 transition-colors"
                                    aria-label="Close"
                                >
                                    <XMarkIcon className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.length === 0 ? (
                                <WelcomeMessage />
                            ) : (
                                messages.map((message) => (
                                    <MessageBubble
                                        key={message.id}
                                        message={message}
                                        onAction={executeAction}
                                    />
                                ))
                            )}
                            {isLoading && <TypingIndicator />}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form
                            onSubmit={handleSubmit}
                            className="p-3 border-t border-surface-700/50 bg-surface-900/80"
                        >
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask me anything..."
                                    disabled={isLoading}
                                    className="flex-1 px-4 py-2.5 rounded-xl text-sm bg-surface-800/60 text-surface-100 placeholder:text-surface-500 border border-surface-700/50 focus:border-primary-400/50 focus:outline-none disabled:opacity-50"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isLoading}
                                    className="p-2.5 rounded-xl bg-primary-500 text-surface-950 hover:bg-primary-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    aria-label="Send message"
                                >
                                    <PaperAirplaneIcon className="w-4 h-4" />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

function WelcomeMessage() {
    const suggestions = [
        "Show my unpaid invoices",
        "What's my site's uptime?",
        "How do I upgrade my plan?",
        "Create a support ticket",
    ];

    const { sendMessage } = useAIContext();

    return (
        <div className="text-center py-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center mx-auto mb-4">
                <SparklesIcon className="w-6 h-6 text-primary-400" />
            </div>
            <h4 className="font-medium text-surface-100 mb-1">
                Hi! I'm your Quantum Assistant
            </h4>
            <p className="text-sm text-surface-400 mb-4">
                I can help you manage your services, answer questions, and execute actions.
            </p>
            <div className="space-y-2">
                <p className="text-xs text-surface-500">Try asking:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                    {suggestions.map((suggestion) => (
                        <button
                            key={suggestion}
                            onClick={() => sendMessage(suggestion)}
                            className="px-3 py-1.5 text-xs rounded-lg bg-surface-800/60 text-surface-300 hover:bg-surface-700/60 hover:text-surface-100 transition-colors"
                        >
                            {suggestion}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

interface MessageBubbleProps {
    message: AIMessage;
    onAction: (action: AIAction) => void;
}

function MessageBubble({ message, onAction }: MessageBubbleProps) {
    const isUser = message.role === "user";

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${isUser ? "justify-end" : "justify-start"}`}
        >
            <div
                className={`max-w-[85%] ${isUser
                        ? "bg-primary-500 text-surface-950 rounded-2xl rounded-br-md"
                        : "bg-surface-800/60 text-surface-100 rounded-2xl rounded-bl-md"
                    } px-4 py-2.5`}
            >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>

                {/* Action buttons */}
                {message.actions && message.actions.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3 pt-2 border-t border-surface-600/30">
                        {message.actions.map((action) => (
                            <button
                                key={action.id}
                                onClick={() => onAction(action)}
                                className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors ${action.type === "confirm"
                                        ? "bg-primary-500/20 text-primary-400 hover:bg-primary-500/30"
                                        : action.type === "cancel"
                                            ? "bg-surface-700/50 text-surface-300 hover:bg-surface-600/50"
                                            : "bg-accent-500/20 text-accent-400 hover:bg-accent-500/30"
                                    }`}
                            >
                                {action.label}
                            </button>
                        ))}
                    </div>
                )}

                <p className="text-[10px] opacity-60 mt-1">
                    {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </p>
            </div>
        </motion.div>
    );
}

function TypingIndicator() {
    return (
        <div className="flex justify-start">
            <div className="bg-surface-800/60 rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1">
                {[0, 1, 2].map((i) => (
                    <motion.span
                        key={i}
                        className="w-2 h-2 rounded-full bg-surface-400"
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.2,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

export default QuantumAssistant;
