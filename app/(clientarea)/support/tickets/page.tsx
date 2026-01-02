"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { LuminousCard } from "../../../components/LuminousCard";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import {
    ChatBubbleLeftRightIcon,
    PlusIcon,
    MagnifyingGlassIcon,
    FunnelIcon,
    ClockIcon,
    CheckCircleIcon,
    ChatBubbleLeftEllipsisIcon,
    ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

// Status configurations
const statusConfig = {
    Open: {
        icon: ExclamationCircleIcon,
        className: "text-amber-400 bg-amber-400/10",
        label: "Open",
    },
    Answered: {
        icon: ChatBubbleLeftEllipsisIcon,
        className: "text-primary-400 bg-primary-400/10",
        label: "Answered",
    },
    "Customer-Reply": {
        icon: ClockIcon,
        className: "text-blue-400 bg-blue-400/10",
        label: "Awaiting Reply",
    },
    Closed: {
        icon: CheckCircleIcon,
        className: "text-surface-400 bg-surface-400/10",
        label: "Closed",
    },
};

// Priority configurations
const priorityConfig = {
    Low: "text-surface-400",
    Medium: "text-amber-400",
    High: "text-red-400",
};

// Mock tickets data
const mockTickets = [
    {
        id: "201",
        tid: "TKT-2026-001",
        subject: "Site loading slowly after recent update",
        status: "Answered",
        priority: "Medium",
        department: "Technical Support",
        lastReply: "2026-01-02 10:30",
        unread: true,
    },
    {
        id: "202",
        tid: "TKT-2025-042",
        subject: "Question about upgrading my hosting plan",
        status: "Open",
        priority: "Low",
        department: "Sales",
        lastReply: "2026-01-01 15:45",
        unread: false,
    },
    {
        id: "203",
        tid: "TKT-2025-041",
        subject: "SSL certificate not renewing automatically",
        status: "Closed",
        priority: "High",
        department: "Technical Support",
        lastReply: "2025-12-28 09:15",
        unread: false,
    },
    {
        id: "204",
        tid: "TKT-2025-039",
        subject: "Request for invoice copy",
        status: "Closed",
        priority: "Low",
        department: "Billing",
        lastReply: "2025-12-20 14:00",
        unread: false,
    },
];

export default function TicketsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

    // Filter tickets
    const filteredTickets = mockTickets.filter((ticket) => {
        const matchesSearch =
            ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ticket.tid.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = !selectedStatus || ticket.status === selectedStatus;
        return matchesSearch && matchesStatus;
    });

    const openCount = mockTickets.filter(
        (t) => t.status !== "Closed"
    ).length;

    const filterStatuses = [
        { value: null, label: "All" },
        { value: "Open", label: "Open" },
        { value: "Answered", label: "Answered" },
        { value: "Closed", label: "Closed" },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-surface-100">Support</h1>
                    <p className="text-surface-400 mt-1">
                        Get help with your services, migrations, or account questions.
                    </p>
                </div>
                <Link href="/support/tickets/new">
                    <Button leftIcon={<PlusIcon className="w-4 h-4" />}>
                        New Ticket
                    </Button>
                </Link>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <LuminousCard className="p-5">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-xl bg-amber-500/10">
                                <ClockIcon className="w-5 h-5 text-amber-400" />
                            </div>
                            <span className="text-surface-400">Open Tickets</span>
                        </div>
                        <p className="text-2xl font-bold text-surface-100">{openCount}</p>
                    </LuminousCard>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                >
                    <LuminousCard className="p-5">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-xl bg-green-500/10">
                                <CheckCircleIcon className="w-5 h-5 text-green-400" />
                            </div>
                            <span className="text-surface-400">Resolved</span>
                        </div>
                        <p className="text-2xl font-bold text-surface-100">
                            {mockTickets.filter((t) => t.status === "Closed").length}
                        </p>
                    </LuminousCard>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <LuminousCard className="p-5">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-xl bg-primary-500/10">
                                <ChatBubbleLeftRightIcon className="w-5 h-5 text-primary-400" />
                            </div>
                            <span className="text-surface-400">Avg Response Time</span>
                        </div>
                        <p className="text-2xl font-bold text-surface-100">&lt;2 hours</p>
                    </LuminousCard>
                </motion.div>
            </div>

            {/* Filters */}
            <LuminousCard className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <Input
                            placeholder="Search tickets..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            leftIcon={<MagnifyingGlassIcon className="w-5 h-5" />}
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <FunnelIcon className="w-5 h-5 text-surface-400 shrink-0" />
                        {filterStatuses.map(({ value, label }) => (
                            <button
                                key={value ?? "all"}
                                onClick={() => setSelectedStatus(value)}
                                className={`
                  px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
                  ${selectedStatus === value
                                        ? "bg-primary-500/20 text-primary-400 border border-primary-400/30"
                                        : "bg-surface-800/60 text-surface-400 border border-transparent hover:text-surface-200"
                                    }
                `}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>
            </LuminousCard>

            {/* Tickets List */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-3"
            >
                {filteredTickets.length === 0 ? (
                    <LuminousCard className="p-12 text-center">
                        <ChatBubbleLeftRightIcon className="w-12 h-12 text-surface-600 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-surface-300 mb-2">
                            No tickets found
                        </h3>
                        <p className="text-surface-500 mb-4">
                            {searchQuery
                                ? "Try adjusting your search or filters."
                                : "You haven't opened any support tickets yet."}
                        </p>
                        <Link href="/support/tickets/new">
                            <Button>Create a ticket</Button>
                        </Link>
                    </LuminousCard>
                ) : (
                    filteredTickets.map((ticket, index) => (
                        <TicketRow key={ticket.id} ticket={ticket} index={index} />
                    ))
                )}
            </motion.div>
        </div>
    );
}

interface TicketRowProps {
    ticket: (typeof mockTickets)[0];
    index: number;
}

function TicketRow({ ticket, index }: TicketRowProps) {
    const status = statusConfig[ticket.status as keyof typeof statusConfig];
    const StatusIcon = status.icon;

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr.replace(" ", "T"));
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffHours / 24);

        if (diffHours < 1) return "Just now";
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
        >
            <Link href={`/support/tickets/${ticket.id}`}>
                <LuminousCard
                    className={`p-4 hover:border-primary-400/40 transition-colors ${ticket.unread ? "border-l-2 border-l-primary-400" : ""
                        }`}
                >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-1">
                                <span className="text-sm text-surface-500 font-mono">
                                    {ticket.tid}
                                </span>
                                <div
                                    className={`flex items-center gap-1 px-2 py-0.5 rounded-lg ${status.className}`}
                                >
                                    <StatusIcon className="w-3.5 h-3.5" />
                                    <span className="text-xs font-medium">{status.label}</span>
                                </div>
                                <span
                                    className={`text-xs font-medium ${priorityConfig[ticket.priority as keyof typeof priorityConfig]
                                        }`}
                                >
                                    {ticket.priority}
                                </span>
                            </div>
                            <h3 className="font-medium text-surface-100 truncate">
                                {ticket.subject}
                            </h3>
                            <p className="text-sm text-surface-500 mt-0.5">
                                {ticket.department}
                            </p>
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                            <div className="text-right">
                                <p className="text-surface-400">Last reply</p>
                                <p className="text-surface-200">{formatDate(ticket.lastReply)}</p>
                            </div>
                            <Button variant="ghost" size="sm">
                                View
                            </Button>
                        </div>
                    </div>
                </LuminousCard>
            </Link>
        </motion.div>
    );
}
