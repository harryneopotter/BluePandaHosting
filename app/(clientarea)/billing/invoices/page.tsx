"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { LuminousCard } from "../../../components/LuminousCard";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import {
    CreditCardIcon,
    DocumentTextIcon,
    CheckCircleIcon,
    ClockIcon,
    ExclamationTriangleIcon,
    ArrowDownTrayIcon,
    MagnifyingGlassIcon,
    FunnelIcon,
    CalendarIcon,
} from "@heroicons/react/24/outline";

// Status configurations
const statusConfig = {
    Paid: {
        icon: CheckCircleIcon,
        className: "text-green-400 bg-green-400/10",
        label: "Paid",
    },
    Unpaid: {
        icon: ClockIcon,
        className: "text-amber-400 bg-amber-400/10",
        label: "Unpaid",
    },
    Overdue: {
        icon: ExclamationTriangleIcon,
        className: "text-red-400 bg-red-400/10",
        label: "Overdue",
    },
};

// Mock invoices data
const mockInvoices = [
    {
        id: "101",
        invoiceNum: "INV-2026-001",
        date: "2026-01-01",
        dueDate: "2026-01-15",
        total: 39.97,
        status: "Unpaid",
        items: ["Quantum Starter Hosting", "Business Email"],
    },
    {
        id: "102",
        invoiceNum: "INV-2025-012",
        date: "2025-12-01",
        dueDate: "2025-12-15",
        total: 39.97,
        status: "Paid",
        items: ["Quantum Starter Hosting", "Business Email"],
    },
    {
        id: "103",
        invoiceNum: "INV-2025-011",
        date: "2025-11-01",
        dueDate: "2025-11-15",
        total: 39.97,
        status: "Paid",
        items: ["Quantum Starter Hosting", "Business Email"],
    },
    {
        id: "104",
        invoiceNum: "INV-2025-010",
        date: "2025-10-01",
        dueDate: "2025-10-15",
        total: 54.96,
        status: "Paid",
        items: ["Quantum Starter Hosting", "Business Email", "Domain Renewal"],
    },
];

export default function InvoicesPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

    // Calculate summary stats
    const unpaidTotal = mockInvoices
        .filter((inv) => inv.status === "Unpaid" || inv.status === "Overdue")
        .reduce((sum, inv) => sum + inv.total, 0);

    const paidThisYear = mockInvoices
        .filter(
            (inv) =>
                inv.status === "Paid" && inv.date.startsWith("2025")
        )
        .reduce((sum, inv) => sum + inv.total, 0);

    // Filter invoices
    const filteredInvoices = mockInvoices.filter((inv) => {
        const matchesSearch =
            inv.invoiceNum.toLowerCase().includes(searchQuery.toLowerCase()) ||
            inv.items.some((item) =>
                item.toLowerCase().includes(searchQuery.toLowerCase())
            );
        const matchesStatus = !selectedStatus || inv.status === selectedStatus;
        return matchesSearch && matchesStatus;
    });

    const filterStatuses = [
        { value: null, label: "All" },
        { value: "Unpaid", label: "Unpaid" },
        { value: "Paid", label: "Paid" },
        { value: "Overdue", label: "Overdue" },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-surface-100">Billing</h1>
                <p className="text-surface-400 mt-1">
                    View your invoices, payment history, and manage payment methods.
                </p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <LuminousCard className="p-5">
                        <div className="flex items-center gap-3 mb-3">
                            <div
                                className={`p-2 rounded-xl ${unpaidTotal > 0
                                        ? "bg-amber-500/10"
                                        : "bg-green-500/10"
                                    }`}
                            >
                                <CreditCardIcon
                                    className={`w-5 h-5 ${unpaidTotal > 0 ? "text-amber-400" : "text-green-400"
                                        }`}
                                />
                            </div>
                            <span className="text-surface-400">Outstanding Balance</span>
                        </div>
                        <p className="text-2xl font-bold text-surface-100">
                            ${unpaidTotal.toFixed(2)}
                        </p>
                        {unpaidTotal > 0 && (
                            <Link
                                href={`/billing/invoices/${mockInvoices.find((i) => i.status === "Unpaid")?.id}`}
                                className="text-sm text-primary-400 hover:text-primary-300 mt-2 inline-block"
                            >
                                Pay now →
                            </Link>
                        )}
                    </LuminousCard>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                >
                    <LuminousCard className="p-5">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-xl bg-primary-500/10">
                                <CalendarIcon className="w-5 h-5 text-primary-400" />
                            </div>
                            <span className="text-surface-400">Paid This Year</span>
                        </div>
                        <p className="text-2xl font-bold text-surface-100">
                            ${paidThisYear.toFixed(2)}
                        </p>
                        <p className="text-sm text-surface-500 mt-2">
                            {mockInvoices.filter((i) => i.status === "Paid").length} invoices
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
                            <div className="p-2 rounded-xl bg-surface-700/50">
                                <DocumentTextIcon className="w-5 h-5 text-surface-400" />
                            </div>
                            <span className="text-surface-400">Payment Methods</span>
                        </div>
                        <p className="text-2xl font-bold text-surface-100">1</p>
                        <Link
                            href="/billing/payment-methods"
                            className="text-sm text-primary-400 hover:text-primary-300 mt-2 inline-block"
                        >
                            Manage methods →
                        </Link>
                    </LuminousCard>
                </motion.div>
            </div>

            {/* Filters */}
            <LuminousCard className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <Input
                            placeholder="Search invoices..."
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

            {/* Invoices List */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-3"
            >
                {filteredInvoices.length === 0 ? (
                    <LuminousCard className="p-12 text-center">
                        <DocumentTextIcon className="w-12 h-12 text-surface-600 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-surface-300 mb-2">
                            No invoices found
                        </h3>
                        <p className="text-surface-500">
                            Try adjusting your search or filters.
                        </p>
                    </LuminousCard>
                ) : (
                    filteredInvoices.map((invoice, index) => (
                        <InvoiceRow key={invoice.id} invoice={invoice} index={index} />
                    ))
                )}
            </motion.div>
        </div>
    );
}

interface InvoiceRowProps {
    invoice: (typeof mockInvoices)[0];
    index: number;
}

function InvoiceRow({ invoice, index }: InvoiceRowProps) {
    const status = statusConfig[invoice.status as keyof typeof statusConfig];
    const StatusIcon = status.icon;

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
        >
            <Link href={`/billing/invoices/${invoice.id}`}>
                <LuminousCard className="p-4 hover:border-primary-400/40 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3">
                                <h3 className="font-medium text-surface-100">
                                    {invoice.invoiceNum}
                                </h3>
                                <div
                                    className={`flex items-center gap-1 px-2 py-0.5 rounded-lg ${status.className}`}
                                >
                                    <StatusIcon className="w-3.5 h-3.5" />
                                    <span className="text-xs font-medium">{status.label}</span>
                                </div>
                            </div>
                            <p className="text-sm text-surface-500 mt-1 truncate">
                                {invoice.items.join(", ")}
                            </p>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="text-right">
                                <p className="text-lg font-semibold text-surface-100">
                                    ${invoice.total.toFixed(2)}
                                </p>
                                <p className="text-sm text-surface-500">
                                    Due {formatDate(invoice.dueDate)}
                                </p>
                            </div>

                            <div className="flex gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    leftIcon={<ArrowDownTrayIcon className="w-4 h-4" />}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        // Download PDF
                                    }}
                                >
                                    PDF
                                </Button>
                                {invoice.status !== "Paid" && (
                                    <Button size="sm">Pay Now</Button>
                                )}
                            </div>
                        </div>
                    </div>
                </LuminousCard>
            </Link>
        </motion.div>
    );
}
