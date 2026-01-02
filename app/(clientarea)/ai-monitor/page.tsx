"use client";

import { motion } from "framer-motion";
import { LuminousCard } from "../../components/LuminousCard";
import {
    ShieldCheckIcon,
    ChartBarIcon,
    ExclamationTriangleIcon,
    CheckCircleIcon,
    SparklesIcon,
    ClockIcon,
    SignalIcon,
    BugAntIcon,
    LockClosedIcon,
    GlobeAltIcon,
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon,
} from "@heroicons/react/24/outline";

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function AIMonitorPage() {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
        >
            {/* Header */}
            <motion.div variants={itemVariants}>
                <h1 className="text-2xl font-bold text-surface-100">AI Monitor</h1>
                <p className="text-surface-400 mt-1">
                    Real-time security and performance insights powered by AI.
                </p>
            </motion.div>

            {/* Health Score */}
            <motion.div variants={itemVariants}>
                <HealthScoreCard />
            </motion.div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <motion.div variants={itemVariants}>
                    <SecurityDashboard />
                </motion.div>
                <motion.div variants={itemVariants}>
                    <PerformanceDashboard />
                </motion.div>
            </div>

            {/* AI Insights */}
            <motion.div variants={itemVariants}>
                <AIInsightsPanel />
            </motion.div>

            {/* Events Timeline */}
            <motion.div variants={itemVariants}>
                <EventsTimeline />
            </motion.div>
        </motion.div>
    );
}

function HealthScoreCard() {
    const healthScore = 94;
    const lastUpdated = "Just now";

    const getScoreColor = (score: number) => {
        if (score >= 90) return "text-green-400";
        if (score >= 70) return "text-amber-400";
        return "text-red-400";
    };

    const getScoreLabel = (score: number) => {
        if (score >= 90) return "Excellent";
        if (score >= 70) return "Good";
        if (score >= 50) return "Fair";
        return "Needs Attention";
    };

    return (
        <LuminousCard className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                    {/* Score Circle */}
                    <div className="relative w-24 h-24">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle
                                cx="48"
                                cy="48"
                                r="42"
                                strokeWidth="6"
                                fill="none"
                                className="stroke-surface-700"
                            />
                            <circle
                                cx="48"
                                cy="48"
                                r="42"
                                strokeWidth="6"
                                fill="none"
                                className={`${healthScore >= 90
                                        ? "stroke-green-400"
                                        : healthScore >= 70
                                            ? "stroke-amber-400"
                                            : "stroke-red-400"
                                    }`}
                                strokeLinecap="round"
                                strokeDasharray={`${(healthScore / 100) * 264} 264`}
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className={`text-2xl font-bold ${getScoreColor(healthScore)}`}>
                                {healthScore}
                            </span>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-surface-100">
                            System Health
                        </h2>
                        <p className={`text-lg font-medium ${getScoreColor(healthScore)}`}>
                            {getScoreLabel(healthScore)}
                        </p>
                        <p className="text-sm text-surface-500 mt-1">
                            Updated {lastUpdated}
                        </p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="text-center px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/20">
                        <CheckCircleIcon className="w-5 h-5 text-green-400 mx-auto mb-1" />
                        <p className="text-sm text-surface-300">4 Healthy</p>
                    </div>
                    <div className="text-center px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
                        <ExclamationTriangleIcon className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                        <p className="text-sm text-surface-300">1 Warning</p>
                    </div>
                    <div className="text-center px-4 py-2 rounded-xl bg-surface-800/60 border border-surface-700/50">
                        <ClockIcon className="w-5 h-5 text-surface-400 mx-auto mb-1" />
                        <p className="text-sm text-surface-300">0 Critical</p>
                    </div>
                </div>
            </div>
        </LuminousCard>
    );
}

function SecurityDashboard() {
    const securityMetrics = [
        {
            label: "Threat Level",
            value: "Low",
            icon: ShieldCheckIcon,
            color: "text-green-400 bg-green-500/10",
        },
        {
            label: "Attacks Blocked (24h)",
            value: "127",
            icon: BugAntIcon,
            color: "text-amber-400 bg-amber-500/10",
        },
        {
            label: "SSL Status",
            value: "Valid",
            icon: LockClosedIcon,
            color: "text-green-400 bg-green-500/10",
        },
        {
            label: "Malware Scans",
            value: "Clean",
            icon: ShieldCheckIcon,
            color: "text-green-400 bg-green-500/10",
        },
    ];

    return (
        <LuminousCard className="p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-red-500/10">
                    <ShieldCheckIcon className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-surface-100">
                    Security Dashboard
                </h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {securityMetrics.map((metric) => (
                    <div
                        key={metric.label}
                        className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50"
                    >
                        <div className={`inline-flex p-2 rounded-lg ${metric.color} mb-3`}>
                            <metric.icon className="w-4 h-4" />
                        </div>
                        <p className="text-sm text-surface-400">{metric.label}</p>
                        <p className="text-lg font-semibold text-surface-100 mt-0.5">
                            {metric.value}
                        </p>
                    </div>
                ))}
            </div>
        </LuminousCard>
    );
}

function PerformanceDashboard() {
    const performanceMetrics = [
        {
            label: "Uptime (30d)",
            value: "99.98%",
            change: "+0.02%",
            trend: "up",
            icon: SignalIcon,
        },
        {
            label: "Avg Response",
            value: "145ms",
            change: "-12ms",
            trend: "up",
            icon: ClockIcon,
        },
        {
            label: "Error Rate",
            value: "0.02%",
            change: "-0.01%",
            trend: "up",
            icon: ChartBarIcon,
        },
        {
            label: "Traffic (today)",
            value: "15.2K",
            change: "+23%",
            trend: "up",
            icon: GlobeAltIcon,
        },
    ];

    return (
        <LuminousCard className="p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-primary-500/10">
                    <ChartBarIcon className="w-5 h-5 text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold text-surface-100">
                    Performance Dashboard
                </h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {performanceMetrics.map((metric) => (
                    <div
                        key={metric.label}
                        className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="p-2 rounded-lg bg-primary-500/10">
                                <metric.icon className="w-4 h-4 text-primary-400" />
                            </div>
                            <div
                                className={`flex items-center gap-0.5 text-xs ${metric.trend === "up" ? "text-green-400" : "text-red-400"
                                    }`}
                            >
                                {metric.trend === "up" ? (
                                    <ArrowTrendingUpIcon className="w-3 h-3" />
                                ) : (
                                    <ArrowTrendingDownIcon className="w-3 h-3" />
                                )}
                                {metric.change}
                            </div>
                        </div>
                        <p className="text-sm text-surface-400">{metric.label}</p>
                        <p className="text-lg font-semibold text-surface-100 mt-0.5">
                            {metric.value}
                        </p>
                    </div>
                ))}
            </div>
        </LuminousCard>
    );
}

function AIInsightsPanel() {
    const insights = [
        {
            type: "recommendation",
            title: "Traffic Pattern Analysis",
            message:
                "Traffic is 2x higher than usual for this time. This appears to be organic growth - consider upgrading to handle future spikes.",
            priority: "medium",
        },
        {
            type: "warning",
            title: "Suspicious Activity Detected",
            message:
                "3 IPs from unusual locations attempted multiple failed logins. We've temporarily blocked them.",
            priority: "high",
        },
        {
            type: "info",
            title: "Performance Improvement",
            message:
                "Your average response time improved by 15% this week after enabling browser caching.",
            priority: "low",
        },
    ];

    const priorityStyles = {
        high: "border-red-400/30 bg-red-500/5",
        medium: "border-amber-400/30 bg-amber-500/5",
        low: "border-green-400/30 bg-green-500/5",
    };

    const typeIcons = {
        recommendation: SparklesIcon,
        warning: ExclamationTriangleIcon,
        info: CheckCircleIcon,
    };

    return (
        <LuminousCard className="p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20">
                    <SparklesIcon className="w-5 h-5 text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold text-surface-100">
                    AI Insights & Recommendations
                </h3>
            </div>

            <div className="space-y-4">
                {insights.map((insight, index) => {
                    const Icon = typeIcons[insight.type as keyof typeof typeIcons];
                    return (
                        <div
                            key={index}
                            className={`p-4 rounded-xl border ${priorityStyles[insight.priority as keyof typeof priorityStyles]
                                }`}
                        >
                            <div className="flex items-start gap-3">
                                <Icon
                                    className={`w-5 h-5 shrink-0 mt-0.5 ${insight.priority === "high"
                                            ? "text-red-400"
                                            : insight.priority === "medium"
                                                ? "text-amber-400"
                                                : "text-green-400"
                                        }`}
                                />
                                <div>
                                    <h4 className="font-medium text-surface-100">{insight.title}</h4>
                                    <p className="text-sm text-surface-400 mt-1">{insight.message}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </LuminousCard>
    );
}

function EventsTimeline() {
    const events = [
        {
            time: "2 min ago",
            type: "security",
            message: "Blocked suspicious request from 45.33.32.156",
        },
        {
            time: "15 min ago",
            type: "performance",
            message: "Response time spike detected (890ms peak)",
        },
        {
            time: "1 hour ago",
            type: "security",
            message: "SSL certificate successfully renewed",
        },
        {
            time: "3 hours ago",
            type: "system",
            message: "Daily backup completed successfully",
        },
        {
            time: "6 hours ago",
            type: "security",
            message: "Malware scan completed - no threats found",
        },
    ];

    const typeIcons = {
        security: { icon: ShieldCheckIcon, color: "text-red-400 bg-red-500/10" },
        performance: { icon: ChartBarIcon, color: "text-amber-400 bg-amber-500/10" },
        system: { icon: CheckCircleIcon, color: "text-green-400 bg-green-500/10" },
    };

    return (
        <LuminousCard className="p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-surface-700/50">
                    <ClockIcon className="w-5 h-5 text-surface-400" />
                </div>
                <h3 className="text-lg font-semibold text-surface-100">
                    Recent Events
                </h3>
            </div>

            <div className="space-y-3">
                {events.map((event, index) => {
                    const typeConfig = typeIcons[event.type as keyof typeof typeIcons];
                    const Icon = typeConfig.icon;
                    return (
                        <div
                            key={index}
                            className="flex items-start gap-3 p-3 rounded-xl bg-surface-800/40"
                        >
                            <div className={`p-1.5 rounded-lg ${typeConfig.color}`}>
                                <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-surface-300">{event.message}</p>
                            </div>
                            <span className="text-xs text-surface-500 shrink-0">{event.time}</span>
                        </div>
                    );
                })}
            </div>
        </LuminousCard>
    );
}
