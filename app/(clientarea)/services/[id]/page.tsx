"use client";

import { use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { LuminousCard } from "../../../components/LuminousCard";
import { Button } from "../../../components/ui/Button";
import { Tabs, TabList, TabTrigger, TabContent } from "../../../components/ui/Tabs";
import {
    ArrowLeftIcon,
    ServerStackIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon,
    ChartBarIcon,
    Cog6ToothIcon,
    DocumentTextIcon,
    ChatBubbleLeftRightIcon,
    ArrowPathIcon,
    CpuChipIcon,
    CircleStackIcon,
    SignalIcon,
    CloudIcon,
    ShieldCheckIcon,
    CalendarIcon,
    CurrencyDollarIcon,
    GlobeAltIcon,
} from "@heroicons/react/24/outline";

// Mock service data
const mockServiceData = {
    id: "1",
    name: "Quantum Starter",
    type: "hosting",
    domain: "example.com",
    status: "Active",
    plan: "Shared Hosting",
    price: 9.99,
    billingCycle: "Monthly",
    nextBillingDate: "2026-01-15",
    createdDate: "2024-03-15",
    ipAddress: "192.168.1.100",
    serverLocation: "US East (Virginia)",
    specs: {
        storage: { used: 2.5, total: 10, unit: "GB" },
        bandwidth: { used: 45, total: 100, unit: "GB" },
        cpu: { usage: 15 },
        memory: { usage: 32 },
    },
    features: [
        "LiteSpeed Web Server",
        "Free SSL Certificate",
        "Daily Backups",
        "CloudLinux",
        "Imunify360 Security",
        "1-Click WordPress Install",
    ],
};

interface PageProps {
    params: Promise<{ id: string }>;
}

export default function ServiceDetailPage({ params }: PageProps) {
    const { id } = use(params);
    const service = mockServiceData; // In production, fetch by ID

    return (
        <div className="space-y-6">
            {/* Back button */}
            <Link
                href="/services"
                className="inline-flex items-center gap-2 text-surface-400 hover:text-surface-200 transition-colors"
            >
                <ArrowLeftIcon className="w-4 h-4" />
                <span className="text-sm">Back to Services</span>
            </Link>

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <LuminousCard className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-2xl bg-primary-500/10">
                                <ServerStackIcon className="w-8 h-8 text-primary-400" />
                            </div>
                            <div>
                                <div className="flex items-center gap-3">
                                    <h1 className="text-2xl font-bold text-surface-100">
                                        {service.name}
                                    </h1>
                                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-green-400/10 text-green-400">
                                        <CheckCircleIcon className="w-4 h-4" />
                                        <span className="text-sm font-medium">{service.status}</span>
                                    </span>
                                </div>
                                <p className="text-surface-400 mt-1">
                                    {service.plan} • {service.domain}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <Button
                                variant="outline"
                                leftIcon={<ArrowPathIcon className="w-4 h-4" />}
                            >
                                Reboot
                            </Button>
                            <Button
                                variant="secondary"
                                leftIcon={<Cog6ToothIcon className="w-4 h-4" />}
                            >
                                Settings
                            </Button>
                            <Button>Upgrade Plan</Button>
                        </div>
                    </div>
                </LuminousCard>
            </motion.div>

            {/* Tabs */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <Tabs defaultValue="overview">
                    <TabList className="mb-6">
                        <TabTrigger value="overview">Overview</TabTrigger>
                        <TabTrigger value="performance">Performance</TabTrigger>
                        <TabTrigger value="management">Management</TabTrigger>
                        <TabTrigger value="logs">Logs</TabTrigger>
                        <TabTrigger value="support">Support</TabTrigger>
                    </TabList>

                    <TabContent value="overview">
                        <OverviewTab service={service} />
                    </TabContent>

                    <TabContent value="performance">
                        <PerformanceTab service={service} />
                    </TabContent>

                    <TabContent value="management">
                        <ManagementTab />
                    </TabContent>

                    <TabContent value="logs">
                        <LogsTab />
                    </TabContent>

                    <TabContent value="support">
                        <SupportTab />
                    </TabContent>
                </Tabs>
            </motion.div>
        </div>
    );
}

function OverviewTab({ service }: { service: typeof mockServiceData }) {
    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Service Details */}
            <LuminousCard className="p-6 lg:col-span-2">
                <h3 className="text-lg font-semibold text-surface-100 mb-4">
                    Service Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InfoRow
                        icon={GlobeAltIcon}
                        label="Domain"
                        value={service.domain}
                    />
                    <InfoRow
                        icon={ServerStackIcon}
                        label="IP Address"
                        value={service.ipAddress}
                    />
                    <InfoRow
                        icon={CloudIcon}
                        label="Server Location"
                        value={service.serverLocation}
                    />
                    <InfoRow
                        icon={CalendarIcon}
                        label="Created"
                        value={formatDate(service.createdDate)}
                    />
                    <InfoRow
                        icon={CurrencyDollarIcon}
                        label="Price"
                        value={`$${service.price}/mo`}
                    />
                    <InfoRow
                        icon={CalendarIcon}
                        label="Next Billing"
                        value={formatDate(service.nextBillingDate)}
                    />
                </div>
            </LuminousCard>

            {/* Resource Usage */}
            <LuminousCard className="p-6">
                <h3 className="text-lg font-semibold text-surface-100 mb-4">
                    Resource Usage
                </h3>
                <div className="space-y-4">
                    <ResourceBar
                        icon={CircleStackIcon}
                        label="Storage"
                        used={service.specs.storage.used}
                        total={service.specs.storage.total}
                        unit={service.specs.storage.unit}
                    />
                    <ResourceBar
                        icon={SignalIcon}
                        label="Bandwidth"
                        used={service.specs.bandwidth.used}
                        total={service.specs.bandwidth.total}
                        unit={service.specs.bandwidth.unit}
                    />
                    <ResourceBar
                        icon={CpuChipIcon}
                        label="CPU"
                        used={service.specs.cpu.usage}
                        total={100}
                        unit="%"
                    />
                    <ResourceBar
                        icon={ChartBarIcon}
                        label="Memory"
                        used={service.specs.memory.usage}
                        total={100}
                        unit="%"
                    />
                </div>
            </LuminousCard>

            {/* Features */}
            <LuminousCard className="p-6 lg:col-span-3">
                <h3 className="text-lg font-semibold text-surface-100 mb-4">
                    Included Features
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                    {service.features.map((feature, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-2 p-3 rounded-xl bg-surface-800/40 border border-surface-700/50"
                        >
                            <CheckCircleIcon className="w-4 h-4 text-green-400 shrink-0" />
                            <span className="text-sm text-surface-300">{feature}</span>
                        </div>
                    ))}
                </div>
            </LuminousCard>
        </div>
    );
}

function PerformanceTab({ service }: { service: typeof mockServiceData }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* CPU Usage */}
            <LuminousCard className="p-6">
                <h3 className="text-lg font-semibold text-surface-100 mb-4">
                    CPU Usage (Last 24h)
                </h3>
                <div className="h-48 flex items-center justify-center text-surface-500">
                    <div className="text-center">
                        <CpuChipIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p>Chart coming soon</p>
                        <p className="text-sm mt-1">Current: {service.specs.cpu.usage}%</p>
                    </div>
                </div>
            </LuminousCard>

            {/* Memory Usage */}
            <LuminousCard className="p-6">
                <h3 className="text-lg font-semibold text-surface-100 mb-4">
                    Memory Usage (Last 24h)
                </h3>
                <div className="h-48 flex items-center justify-center text-surface-500">
                    <div className="text-center">
                        <ChartBarIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p>Chart coming soon</p>
                        <p className="text-sm mt-1">Current: {service.specs.memory.usage}%</p>
                    </div>
                </div>
            </LuminousCard>

            {/* Uptime */}
            <LuminousCard className="p-6">
                <h3 className="text-lg font-semibold text-surface-100 mb-4">
                    Uptime (Last 30 days)
                </h3>
                <div className="text-center py-8">
                    <p className="text-4xl font-bold text-green-400">99.98%</p>
                    <p className="text-surface-400 mt-2">Total downtime: 8 minutes</p>
                </div>
            </LuminousCard>

            {/* Response Time */}
            <LuminousCard className="p-6">
                <h3 className="text-lg font-semibold text-surface-100 mb-4">
                    Response Time
                </h3>
                <div className="space-y-3">
                    <StatRow label="Average (p50)" value="145ms" />
                    <StatRow label="95th Percentile" value="320ms" />
                    <StatRow label="99th Percentile" value="890ms" />
                </div>
            </LuminousCard>
        </div>
    );
}

function ManagementTab() {
    const managementItems = [
        { icon: DocumentTextIcon, label: "File Manager", description: "Browse and manage your files" },
        { icon: CircleStackIcon, label: "Databases", description: "MySQL & PostgreSQL management" },
        { icon: ArrowPathIcon, label: "Backups", description: "View and restore backups" },
        { icon: ShieldCheckIcon, label: "Security", description: "SSL, firewall, and malware scans" },
        { icon: GlobeAltIcon, label: "Domains", description: "Manage addon and parked domains" },
        { icon: Cog6ToothIcon, label: "PHP Settings", description: "Configure PHP version and settings" },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {managementItems.map((item, index) => (
                <LuminousCard
                    key={index}
                    className="p-5 cursor-pointer hover:border-primary-400/40 transition-colors"
                >
                    <div className="flex items-start gap-4">
                        <div className="p-2.5 rounded-xl bg-primary-500/10">
                            <item.icon className="w-5 h-5 text-primary-400" />
                        </div>
                        <div>
                            <h4 className="font-medium text-surface-100">{item.label}</h4>
                            <p className="text-sm text-surface-400 mt-0.5">{item.description}</p>
                        </div>
                    </div>
                </LuminousCard>
            ))}
        </div>
    );
}

function LogsTab() {
    const logs = [
        { time: "2026-01-02 14:30:22", level: "info", message: "Connection established from 192.168.1.50" },
        { time: "2026-01-02 14:28:15", level: "warning", message: "High memory usage detected (85%)" },
        { time: "2026-01-02 14:25:00", level: "info", message: "Backup completed successfully" },
        { time: "2026-01-02 14:20:10", level: "error", message: "Failed login attempt from 45.33.32.156" },
        { time: "2026-01-02 13:45:30", level: "info", message: "SSL certificate renewed" },
    ];

    const levelColors = {
        info: "text-blue-400 bg-blue-400/10",
        warning: "text-amber-400 bg-amber-400/10",
        error: "text-red-400 bg-red-400/10",
    };

    return (
        <LuminousCard className="p-6">
            <h3 className="text-lg font-semibold text-surface-100 mb-4">Recent Logs</h3>
            <div className="space-y-2 font-mono text-sm">
                {logs.map((log, index) => (
                    <div
                        key={index}
                        className="flex items-start gap-3 p-3 rounded-lg bg-surface-800/40"
                    >
                        <span className="text-surface-500 shrink-0">{log.time}</span>
                        <span
                            className={`px-2 py-0.5 rounded text-xs uppercase ${levelColors[log.level as keyof typeof levelColors]
                                }`}
                        >
                            {log.level}
                        </span>
                        <span className="text-surface-300">{log.message}</span>
                    </div>
                ))}
            </div>
        </LuminousCard>
    );
}

function SupportTab() {
    const tickets = [
        { id: "TKT-001", subject: "Site loading slowly", status: "Open", date: "2026-01-01" },
        { id: "TKT-002", subject: "SSL certificate issue", status: "Resolved", date: "2025-12-28" },
    ];

    return (
        <div className="space-y-4">
            <LuminousCard className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-surface-100">Related Tickets</h3>
                    <Link href="/support/tickets/new">
                        <Button size="sm">New Ticket</Button>
                    </Link>
                </div>
                <div className="space-y-2">
                    {tickets.map((ticket) => (
                        <Link
                            key={ticket.id}
                            href={`/support/tickets/${ticket.id}`}
                            className="flex items-center justify-between p-4 rounded-xl bg-surface-800/40 hover:bg-surface-800/60 transition-colors"
                        >
                            <div>
                                <p className="font-medium text-surface-100">{ticket.subject}</p>
                                <p className="text-sm text-surface-500">
                                    {ticket.id} • {ticket.date}
                                </p>
                            </div>
                            <span
                                className={`px-2 py-1 rounded-lg text-xs font-medium ${ticket.status === "Open"
                                        ? "bg-amber-400/10 text-amber-400"
                                        : "bg-green-400/10 text-green-400"
                                    }`}
                            >
                                {ticket.status}
                            </span>
                        </Link>
                    ))}
                </div>
            </LuminousCard>
        </div>
    );
}

// Helper Components
function InfoRow({
    icon: Icon,
    label,
    value,
}: {
    icon: typeof GlobeAltIcon;
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-800/40">
            <Icon className="w-5 h-5 text-surface-400" />
            <div>
                <p className="text-xs text-surface-500">{label}</p>
                <p className="text-surface-200 font-medium">{value}</p>
            </div>
        </div>
    );
}

function ResourceBar({
    icon: Icon,
    label,
    used,
    total,
    unit,
}: {
    icon: typeof CircleStackIcon;
    label: string;
    used: number;
    total: number;
    unit: string;
}) {
    const percentage = (used / total) * 100;
    const isHigh = percentage > 80;

    return (
        <div>
            <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-surface-400 flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    {label}
                </span>
                <span className={`text-sm ${isHigh ? "text-amber-400" : "text-surface-300"}`}>
                    {used}{unit} / {total}{unit}
                </span>
            </div>
            <div className="h-2 bg-surface-800 rounded-full overflow-hidden">
                <div
                    className={`h-full rounded-full transition-all ${isHigh ? "bg-amber-400" : "bg-primary-500"
                        }`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}

function StatRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex justify-between items-center py-2 border-b border-surface-700/50 last:border-0">
            <span className="text-surface-400">{label}</span>
            <span className="text-surface-100 font-medium">{value}</span>
        </div>
    );
}
