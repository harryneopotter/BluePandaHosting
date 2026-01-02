"use client";

import { motion } from "framer-motion";
import { LuminousCard } from "../../components/LuminousCard";
import {
    SparklesIcon,
    ArrowTrendingUpIcon,
    ExclamationTriangleIcon,
    CheckCircleIcon,
    ServerStackIcon,
    CreditCardIcon,
    ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

// Animation variants for staggered entry
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" },
    },
};

export default function DashboardPage() {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
        >
            {/* Welcome Section */}
            <motion.div variants={itemVariants}>
                <WelcomeCard />
            </motion.div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Services & Support */}
                <div className="lg:col-span-2 space-y-6">
                    <motion.div variants={itemVariants}>
                        <ServiceStatusGrid />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <SupportWidget />
                    </motion.div>
                </div>

                {/* Right Column - Finance & AI */}
                <div className="space-y-6">
                    <motion.div variants={itemVariants}>
                        <FinancialWidget />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <AIInsightsWidget />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}

function WelcomeCard() {
    // In production, this would come from session/API
    const userName = "John";
    const aiSuggestion =
        "Your WordPress site had 2x traffic this week! Consider upgrading to VPS for better performance.";

    return (
        <LuminousCard className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-surface-100">
                        Welcome back, {userName}
                    </h1>
                    <p className="text-surface-400 mt-1">
                        Here's what's happening with your services today.
                    </p>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-primary-500/10 to-accent-500/10 border border-primary-400/20">
                    <SparklesIcon className="w-5 h-5 text-primary-400 shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm text-surface-300">{aiSuggestion}</p>
                        <button className="text-sm text-primary-400 hover:text-primary-300 font-medium mt-1.5">
                            Learn more →
                        </button>
                    </div>
                </div>
            </div>
        </LuminousCard>
    );
}

function ServiceStatusGrid() {
    // Mock data - would come from API
    const services = [
        {
            id: "1",
            name: "Quantum Starter",
            type: "WordPress Hosting",
            status: "healthy",
            uptime: "99.9%",
        },
        {
            id: "2",
            name: "example.com",
            type: "Domain",
            status: "healthy",
            uptime: "Active",
        },
        {
            id: "3",
            name: "SSL Certificate",
            type: "Security",
            status: "warning",
            uptime: "Expires in 30 days",
        },
        {
            id: "4",
            name: "Business Email",
            type: "Email Hosting",
            status: "healthy",
            uptime: "5 accounts",
        },
    ];

    const statusColors = {
        healthy: "text-green-400",
        warning: "text-amber-400",
        down: "text-red-400",
    };

    const StatusIcon = ({ status }: { status: string }) => {
        if (status === "healthy")
            return <CheckCircleIcon className="w-5 h-5 text-green-400" />;
        if (status === "warning")
            return <ExclamationTriangleIcon className="w-5 h-5 text-amber-400" />;
        return <ExclamationTriangleIcon className="w-5 h-5 text-red-400" />;
    };

    return (
        <LuminousCard className="p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-primary-500/10">
                        <ServerStackIcon className="w-5 h-5 text-primary-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-surface-100">
                        Active Services
                    </h3>
                </div>
                <Link
                    href="/services"
                    className="text-sm text-primary-400 hover:text-primary-300 font-medium"
                >
                    View all →
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services.map((service) => (
                    <Link
                        key={service.id}
                        href={`/services/${service.id}`}
                        className="group p-4 rounded-xl bg-surface-800/40 border border-surface-700/50 hover:border-primary-400/30 hover:bg-surface-800/60 transition-all"
                    >
                        <div className="flex items-start justify-between mb-2">
                            <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-surface-100 truncate group-hover:text-primary-400 transition-colors">
                                    {service.name}
                                </h4>
                                <p className="text-sm text-surface-500">{service.type}</p>
                            </div>
                            <StatusIcon status={service.status} />
                        </div>
                        <p className={`text-sm ${statusColors[service.status as keyof typeof statusColors]}`}>
                            {service.uptime}
                        </p>
                    </Link>
                ))}
            </div>
        </LuminousCard>
    );
}

function FinancialWidget() {
    // Mock data - would come from API
    const nextInvoice = {
        amount: 29.99,
        dueDate: "Jan 15, 2026",
        isOverdue: false,
    };
    const monthlySpend = 89.97;

    return (
        <LuminousCard className="p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-primary-500/10">
                    <CreditCardIcon className="w-5 h-5 text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold text-surface-100">Billing</h3>
            </div>

            <div className="space-y-4">
                <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50">
                    <p className="text-sm text-surface-400 mb-1">Next Invoice</p>
                    <p className="text-2xl font-bold text-surface-100">
                        ${nextInvoice.amount.toFixed(2)}
                    </p>
                    <p
                        className={`text-sm mt-1 ${nextInvoice.isOverdue ? "text-red-400" : "text-surface-400"
                            }`}
                    >
                        Due {nextInvoice.dueDate}
                    </p>
                </div>

                <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-surface-400 mb-1">Monthly Spend</p>
                            <p className="text-xl font-bold text-surface-100">
                                ${monthlySpend.toFixed(2)}
                            </p>
                        </div>
                        <div className="flex items-center gap-1 text-green-400 text-sm">
                            <ArrowTrendingUpIcon className="w-4 h-4" />
                            <span>Same as last month</span>
                        </div>
                    </div>
                </div>

                <Link
                    href="/billing"
                    className="block w-full text-center py-2.5 px-4 rounded-xl bg-primary-500/10 text-primary-400 font-medium hover:bg-primary-500/20 transition-colors"
                >
                    View all invoices
                </Link>
            </div>
        </LuminousCard>
    );
}

function SupportWidget() {
    // Mock data
    const openTickets = 2;

    return (
        <LuminousCard className="p-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-primary-500/10">
                        <ChatBubbleLeftRightIcon className="w-5 h-5 text-primary-400" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-surface-100">Support</h3>
                        <p className="text-sm text-surface-400">
                            {openTickets > 0
                                ? `${openTickets} open ticket${openTickets > 1 ? "s" : ""}`
                                : "No open tickets"}
                        </p>
                    </div>
                </div>

                <div className="flex gap-3">
                    <Link
                        href="/support/tickets"
                        className="px-4 py-2 rounded-xl bg-surface-800/60 text-surface-300 font-medium hover:bg-surface-700/60 transition-colors"
                    >
                        View tickets
                    </Link>
                    <Link
                        href="/support/tickets/new"
                        className="px-4 py-2 rounded-xl bg-primary-500 text-surface-950 font-medium hover:bg-primary-400 transition-colors"
                    >
                        New ticket
                    </Link>
                </div>
            </div>
        </LuminousCard>
    );
}

function AIInsightsWidget() {
    // Mock data - would come from AI service
    const insights = [
        {
            id: "1",
            type: "warning",
            message: "Unusual traffic pattern detected from 3 IPs",
            action: "Review",
        },
        {
            id: "2",
            type: "info",
            message: "Your site speed improved 15% this week",
            action: null,
        },
        {
            id: "3",
            type: "suggestion",
            message: 'Consider enabling "Always On" for better uptime',
            action: "Enable",
        },
    ];

    const typeColors = {
        warning: "border-amber-400/30 bg-amber-500/5",
        info: "border-green-400/30 bg-green-500/5",
        suggestion: "border-primary-400/30 bg-primary-500/5",
    };

    const typeIcons = {
        warning: <ExclamationTriangleIcon className="w-5 h-5 text-amber-400" />,
        info: <CheckCircleIcon className="w-5 h-5 text-green-400" />,
        suggestion: <SparklesIcon className="w-5 h-5 text-primary-400" />,
    };

    return (
        <LuminousCard className="p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20">
                    <SparklesIcon className="w-5 h-5 text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold text-surface-100">AI Insights</h3>
            </div>

            <div className="space-y-3">
                {insights.map((insight) => (
                    <div
                        key={insight.id}
                        className={`p-3 rounded-xl border ${typeColors[insight.type as keyof typeof typeColors]
                            }`}
                    >
                        <div className="flex items-start gap-3">
                            <div className="shrink-0 mt-0.5">
                                {typeIcons[insight.type as keyof typeof typeIcons]}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-surface-300">{insight.message}</p>
                                {insight.action && (
                                    <button className="text-sm text-primary-400 hover:text-primary-300 font-medium mt-1">
                                        {insight.action} →
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Link
                href="/ai-monitor"
                className="block mt-4 text-center text-sm text-surface-400 hover:text-surface-300"
            >
                View all insights →
            </Link>
        </LuminousCard>
    );
}
