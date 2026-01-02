"use client";

import {
    createContext,
    useContext,
    useState,
    type ReactNode,
    type KeyboardEvent,
} from "react";
import { motion } from "framer-motion";

// Context for tabs
interface TabsContextType {
    activeTab: string;
    setActiveTab: (id: string) => void;
}

const TabsContext = createContext<TabsContextType | null>(null);

function useTabsContext() {
    const context = useContext(TabsContext);
    if (!context) {
        throw new Error("Tabs components must be used within a Tabs provider");
    }
    return context;
}

// Main Tabs container
export interface TabsProps {
    defaultValue: string;
    value?: string;
    onValueChange?: (value: string) => void;
    children: ReactNode;
    className?: string;
}

export function Tabs({
    defaultValue,
    value,
    onValueChange,
    children,
    className = "",
}: TabsProps) {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const activeTab = value ?? internalValue;

    const setActiveTab = (id: string) => {
        if (!value) setInternalValue(id);
        onValueChange?.(id);
    };

    return (
        <TabsContext.Provider value={{ activeTab, setActiveTab }}>
            <div className={className}>{children}</div>
        </TabsContext.Provider>
    );
}

// Tab list (container for triggers)
export interface TabListProps {
    children: ReactNode;
    className?: string;
}

export function TabList({ children, className = "" }: TabListProps) {
    return (
        <div
            role="tablist"
            className={`
        flex gap-1 p-1 rounded-xl
        bg-surface-800/60 border border-surface-700/50
        ${className}
      `}
        >
            {children}
        </div>
    );
}

// Individual tab trigger
export interface TabTriggerProps {
    value: string;
    children: ReactNode;
    className?: string;
    disabled?: boolean;
}

export function TabTrigger({
    value,
    children,
    className = "",
    disabled = false,
}: TabTriggerProps) {
    const { activeTab, setActiveTab } = useTabsContext();
    const isActive = activeTab === value;

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (!disabled) setActiveTab(value);
        }
    };

    return (
        <button
            role="tab"
            aria-selected={isActive}
            aria-controls={`tabpanel-${value}`}
            tabIndex={isActive ? 0 : -1}
            disabled={disabled}
            onClick={() => !disabled && setActiveTab(value)}
            onKeyDown={handleKeyDown}
            className={`
        relative px-4 py-2 text-sm font-medium rounded-lg
        transition-colors duration-200
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-800
        disabled:opacity-50 disabled:cursor-not-allowed
        ${isActive
                    ? "text-surface-100"
                    : "text-surface-400 hover:text-surface-200"
                }
        ${className}
      `}
        >
            {isActive && (
                <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-surface-700/80 rounded-lg border border-surface-600/50"
                    transition={{ type: "spring", duration: 0.3, bounce: 0.2 }}
                />
            )}
            <span className="relative z-10">{children}</span>
        </button>
    );
}

// Tab content panel
export interface TabContentProps {
    value: string;
    children: ReactNode;
    className?: string;
}

export function TabContent({ value, children, className = "" }: TabContentProps) {
    const { activeTab } = useTabsContext();
    const isActive = activeTab === value;

    if (!isActive) return null;

    return (
        <motion.div
            role="tabpanel"
            id={`tabpanel-${value}`}
            aria-labelledby={`tab-${value}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export default Tabs;
