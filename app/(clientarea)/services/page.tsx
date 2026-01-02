"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { LuminousCard } from "../../components/LuminousCard";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { SkeletonServiceCard } from "../../components/ui/Skeleton";
import {
    ServerStackIcon,
    GlobeAltIcon,
    ShieldCheckIcon,
    EnvelopeIcon,
    MagnifyingGlassIcon,
    FunnelIcon,
    PlusIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon,
    ClockIcon,
} from "@heroicons/react/24/outline";

// Service type icons
const serviceIcons = {
    hosting: ServerStackIcon,
    domain: GlobeAltIcon,
    ssl: ShieldCheckIcon,
    email: EnvelopeIcon,
};

// Status configurations
const statusConfig = {
    Active: {
        icon: CheckCircleIcon,
        className: "text-green-400 bg-green-400/10",
        label: "Active",
    },
    Suspended: {
        icon: ExclamationTriangleIcon,
        className: "text-red-400 bg-red-400/10",
        label: "Suspended",
    },
    Pending: {
        icon: ClockIcon,
        className: "text-amber-400 bg-amber-400/10",
        label: "Pending",
    },
};

// Mock services data
const mockServices = [
    {
        id: "1",
        name: "Quantum Starter",
        type: "hosting",
        domain: "example.com",
        status: "Active",
        billingDate: "2026-01-15",
        price: 9.99,
        plan: "Shared Hosting",
    },
    {
        id: "2",
        name: "example.com",
        type: "domain",
        domain: "example.com",
        status: "Active",
        billingDate: "2026-06-10",
        price: 14.99,
        plan: "Domain Registration",
    },
    {
        id: "3",
        name: "SSL Certificate",
        type: "ssl",
        domain: "example.com",
        status: "Active",
        billingDate: "2026-01-30",
        price: 0,
        plan: "Let's Encrypt (Free)",
    },
    {
        id: "4",
        name: "Business Email",
        type: "email",
        domain: "example.com",
        status: "Active",
        billingDate: "2026-01-15",
        price: 4.99,
        plan: "5 Mailboxes",
    },
    {
        id: "5",
        name: "myshop.com",
        type: "hosting",
        domain: "myshop.com",
        status: "Active",
        billingDate: "2026-02-01",
        price: 29.99,
        plan: "Business Hosting",
    },
];

export default function ServicesPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [isLoading] = useState(false);

    // Filter services
    const filteredServices = mockServices.filter((service) => {
        const matchesSearch =
            service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            service.domain.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = !selectedType || service.type === selectedType;
        return matchesSearch && matchesType;
    });

    const filterTypes = [
        { value: null, label: "All", icon: null },
        { value: "hosting", label: "Hosting", icon: ServerStackIcon },
        { value: "domain", label: "Domains", icon: GlobeAltIcon },
        { value: "ssl", label: "SSL", icon: ShieldCheckIcon },
        { value: "email", label: "Email", icon: EnvelopeIcon },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-surface-100">Services</h1>
                    <p className="text-surface-400 mt-1">
                        Manage your hosting services, domains, and more.
                    </p>
                </div>
                <Button leftIcon={<PlusIcon className="w-4 h-4" />}>
                    New Service
                </Button>
            </div>

            {/* Filters */}
            <LuminousCard className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1">
                        <Input
                            placeholder="Search services..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            leftIcon={<MagnifyingGlassIcon className="w-5 h-5" />}
                        />
                    </div>

                    {/* Type filter */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                        <FunnelIcon className="w-5 h-5 text-surface-400 shrink-0" />
                        {filterTypes.map(({ value, label, icon: Icon }) => (
                            <button
                                key={value ?? "all"}
                                onClick={() => setSelectedType(value)}
                                className={`
                  flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium
                  transition-colors whitespace-nowrap
                  ${selectedType === value
                                        ? "bg-primary-500/20 text-primary-400 border border-primary-400/30"
                                        : "bg-surface-800/60 text-surface-400 border border-transparent hover:text-surface-200"
                                    }
                `}
                            >
                                {Icon && <Icon className="w-4 h-4" />}
                                {label}
                            </button>
                        ))}
                    </div>
                </div>
            </LuminousCard>

            {/* Services Grid */}
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, i) => (
                        <SkeletonServiceCard key={i} />
                    ))}
                </div>
            ) : filteredServices.length === 0 ? (
                <LuminousCard className="p-12 text-center">
                    <ServerStackIcon className="w-12 h-12 text-surface-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-surface-300 mb-2">
                        No services found
                    </h3>
                    <p className="text-surface-500">
                        {searchQuery
                            ? "Try adjusting your search or filters"
                            : "Your services will appear here once you add them."}
                    </p>
                </LuminousCard>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
                >
                    {filteredServices.map((service, index) => (
                        <ServiceCard key={service.id} service={service} index={index} />
                    ))}
                </motion.div>
            )}
        </div>
    );
}

interface ServiceCardProps {
    service: (typeof mockServices)[0];
    index: number;
}

function ServiceCard({ service, index }: ServiceCardProps) {
    const Icon = serviceIcons[service.type as keyof typeof serviceIcons];
    const status = statusConfig[service.status as keyof typeof statusConfig];
    const StatusIcon = status.icon;

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
        >
            <Link href={`/services/${service.id}`}>
                <LuminousCard className="p-5 h-full hover:border-primary-400/40 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-primary-500/10">
                                <Icon className="w-5 h-5 text-primary-400" />
                            </div>
                            <div>
                                <h3 className="font-medium text-surface-100">{service.name}</h3>
                                <p className="text-sm text-surface-500">{service.plan}</p>
                            </div>
                        </div>
                        <div
                            className={`flex items-center gap-1.5 px-2 py-1 rounded-lg ${status.className}`}
                        >
                            <StatusIcon className="w-3.5 h-3.5" />
                            <span className="text-xs font-medium">{status.label}</span>
                        </div>
                    </div>

                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-surface-500">Domain</span>
                            <span className="text-surface-300">{service.domain}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-surface-500">Next Billing</span>
                            <span className="text-surface-300">
                                {formatDate(service.billingDate)}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-surface-500">Price</span>
                            <span className="text-surface-100 font-medium">
                                {service.price === 0
                                    ? "Free"
                                    : `$${service.price.toFixed(2)}/mo`}
                            </span>
                        </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-surface-700/50 flex gap-2">
                        <Button variant="ghost" size="sm" className="flex-1">
                            Manage
                        </Button>
                        <Button variant="outline" size="sm">
                            Renew
                        </Button>
                    </div>
                </LuminousCard>
            </Link>
        </motion.div>
    );
}
