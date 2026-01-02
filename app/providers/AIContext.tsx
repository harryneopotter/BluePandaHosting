"use client";

import {
    createContext,
    useContext,
    useState,
    useCallback,
    type ReactNode,
} from "react";

// Message types for conversation
export interface AIMessage {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
    actions?: AIAction[];
}

export interface AIAction {
    id: string;
    label: string;
    type: "confirm" | "cancel" | "link";
    payload?: Record<string, unknown>;
}

// Context state
export interface AIContextState {
    // Conversation
    messages: AIMessage[];
    isOpen: boolean;
    isExpanded: boolean;
    isLoading: boolean;

    // Page context
    currentPage: string;
    pageContext: Record<string, unknown>;

    // User context (cached from API)
    userServices: unknown[];
    userInvoices: unknown[];
}

// Context actions
export interface AIContextActions {
    sendMessage: (content: string) => Promise<void>;
    clearMessages: () => void;
    toggleOpen: () => void;
    toggleExpanded: () => void;
    setPageContext: (page: string, context: Record<string, unknown>) => void;
    executeAction: (action: AIAction) => Promise<void>;
}

type AIContextType = AIContextState & AIContextActions;

const AIContext = createContext<AIContextType | null>(null);

export function useAIContext() {
    const context = useContext(AIContext);
    if (!context) {
        throw new Error("useAIContext must be used within an AIContextProvider");
    }
    return context;
}

// Generate unique ID for messages
function generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function AIContextProvider({ children }: { children: ReactNode }) {
    const [messages, setMessages] = useState<AIMessage[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState("/");
    const [pageContext, setPageContextState] = useState<Record<string, unknown>>({});
    const [userServices, setUserServices] = useState<unknown[]>([]);
    const [userInvoices, setUserInvoices] = useState<unknown[]>([]);

    const sendMessage = useCallback(async (content: string) => {
        // Add user message
        const userMessage: AIMessage = {
            id: generateId(),
            role: "user",
            content,
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, userMessage]);
        setIsLoading(true);

        try {
            // Call AI chat API
            const response = await fetch("/api/ai/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: content,
                    conversationHistory: messages.slice(-10), // Last 10 messages for context
                    pageContext: { page: currentPage, ...pageContext },
                }),
            });

            if (!response.ok) throw new Error("AI request failed");

            const data = await response.json();

            // Add assistant message
            const assistantMessage: AIMessage = {
                id: generateId(),
                role: "assistant",
                content: data.response,
                timestamp: new Date(),
                actions: data.actions,
            };
            setMessages((prev) => [...prev, assistantMessage]);

            // Update cached user data if provided
            if (data.userServices) setUserServices(data.userServices);
            if (data.userInvoices) setUserInvoices(data.userInvoices);
        } catch (error) {
            // Add error message
            const errorMessage: AIMessage = {
                id: generateId(),
                role: "assistant",
                content: "I'm sorry, I encountered an error. Please try again.",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    }, [messages, currentPage, pageContext]);

    const clearMessages = useCallback(() => {
        setMessages([]);
    }, []);

    const toggleOpen = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    const toggleExpanded = useCallback(() => {
        setIsExpanded((prev) => !prev);
    }, []);

    const setPageContext = useCallback((page: string, context: Record<string, unknown>) => {
        setCurrentPage(page);
        setPageContextState(context);
    }, []);

    const executeAction = useCallback(async (action: AIAction) => {
        if (action.type === "link" && action.payload?.url) {
            window.location.href = action.payload.url as string;
            return;
        }

        // Send action to backend for execution
        setIsLoading(true);
        try {
            const response = await fetch("/api/ai/action", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action }),
            });

            if (!response.ok) throw new Error("Action execution failed");

            const data = await response.json();

            // Add result message
            const resultMessage: AIMessage = {
                id: generateId(),
                role: "assistant",
                content: data.message || "Action completed successfully.",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, resultMessage]);
        } catch (error) {
            const errorMessage: AIMessage = {
                id: generateId(),
                role: "assistant",
                content: "Failed to execute action. Please try again.",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const value: AIContextType = {
        messages,
        isOpen,
        isExpanded,
        isLoading,
        currentPage,
        pageContext,
        userServices,
        userInvoices,
        sendMessage,
        clearMessages,
        toggleOpen,
        toggleExpanded,
        setPageContext,
        executeAction,
    };

    return <AIContext.Provider value={value}>{children}</AIContext.Provider>;
}
