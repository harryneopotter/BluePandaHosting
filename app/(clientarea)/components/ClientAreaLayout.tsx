"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    HomeIcon,
    ServerStackIcon,
    CreditCardIcon,
    ChatBubbleLeftRightIcon,
    ShieldCheckIcon,
    Bars3Icon,
    XMarkIcon,
    ArrowRightOnRectangleIcon,
    UserCircleIcon,
    SparklesIcon,
} from "@heroicons/react/24/outline";

interface NavItem {
    href: string;
    label: string;
    icon: typeof HomeIcon;
}

const navItems: NavItem[] = [
    { href: "/dashboard", label: "Dashboard", icon: HomeIcon },
    { href: "/services", label: "Services", icon: ServerStackIcon },
    { href: "/billing", label: "Billing", icon: CreditCardIcon },
    { href: "/support", label: "Support", icon: ChatBubbleLeftRightIcon },
    { href: "/ai-monitor", label: "AI Monitor", icon: ShieldCheckIcon },
];

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

function Sidebar({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname();

    const sidebarContent = (
        <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="flex items-center gap-3 p-6 border-b border-surface-700/50">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                    <SparklesIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h1 className="font-bold text-surface-100">QPanda</h1>
                    <p className="text-xs text-surface-400">Client Area</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={onClose}
                            className={`
                flex items-center gap-3 px-4 py-3 rounded-xl
                transition-all duration-200 group
                ${isActive
                                    ? "bg-primary-500/10 text-primary-400 border border-primary-400/20"
                                    : "text-surface-400 hover:bg-surface-800/60 hover:text-surface-200"
                                }
              `}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium">{item.label}</span>
                            {isActive && (
                                <motion.div
                                    layoutId="navIndicator"
                                    className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-400"
                                />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* User section */}
            <div className="p-4 border-t border-surface-700/50">
                <div className="flex items-center gap-3 px-4 py-3">
                    <UserCircleIcon className="w-8 h-8 text-surface-400" />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-surface-200 truncate">
                            John Doe
                        </p>
                        <p className="text-xs text-surface-500 truncate">
                            john@example.com
                        </p>
                    </div>
                </div>
                <Link
                    href="/api/auth/logout"
                    className="flex items-center gap-3 px-4 py-2.5 mt-2 rounded-xl text-surface-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                >
                    <ArrowRightOnRectangleIcon className="w-5 h-5" />
                    <span className="text-sm font-medium">Sign out</span>
                </Link>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop sidebar */}
            <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:left-0 lg:z-30 bg-surface-900/95 backdrop-blur-xl border-r border-surface-700/50">
                {sidebarContent}
            </aside>

            {/* Mobile sidebar overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40 bg-surface-950/80 backdrop-blur-sm lg:hidden"
                            onClick={onClose}
                        />
                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 left-0 z-50 w-64 bg-surface-900/95 backdrop-blur-xl border-r border-surface-700/50 lg:hidden"
                        >
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 rounded-lg text-surface-400 hover:text-surface-200 hover:bg-surface-800/60"
                                aria-label="Close sidebar"
                            >
                                <XMarkIcon className="w-5 h-5" />
                            </button>
                            {sidebarContent}
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}

interface TopBarProps {
    onMenuClick: () => void;
}

function TopBar({ onMenuClick }: TopBarProps) {
    const pathname = usePathname();

    // Get page title from pathname
    const getPageTitle = () => {
        const path = pathname.split("/").filter(Boolean);
        if (path.length === 0) return "Dashboard";
        return path[path.length - 1]
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    return (
        <header className="sticky top-0 z-20 flex items-center gap-4 px-4 py-4 lg:px-8 bg-surface-950/80 backdrop-blur-xl border-b border-surface-700/50">
            <button
                onClick={onMenuClick}
                className="p-2 rounded-lg text-surface-400 hover:text-surface-200 hover:bg-surface-800/60 lg:hidden"
                aria-label="Open menu"
            >
                <Bars3Icon className="w-6 h-6" />
            </button>

            <div className="flex-1">
                <h2 className="text-lg font-semibold text-surface-100">{getPageTitle()}</h2>
            </div>

            {/* AI Assistant button - toggles the Quantum Assistant */}
            <button
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary-500/20 to-accent-500/20 border border-primary-400/30 text-primary-400 hover:border-primary-400/50 transition-colors"
                aria-label="Open AI Assistant"
            >
                <SparklesIcon className="w-4 h-4" />
                <span className="text-sm font-medium hidden sm:inline">Ask AI</span>
            </button>
        </header>
    );
}

export function ClientAreaLayout({ children }: { children: ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-surface-950 via-surface-900 to-surface-950">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* Main content area */}
            <div className="lg:pl-64">
                <TopBar onMenuClick={() => setSidebarOpen(true)} />
                <main className="p-4 lg:p-8">{children}</main>
            </div>
        </div>
    );
}

export default ClientAreaLayout;
