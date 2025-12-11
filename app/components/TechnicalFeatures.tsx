"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface FeatureItemProps {
    title: string;
    description: string;
    impact: string;
    retailCost: string;
}

interface FeatureCategoryProps {
    category: string;
    items: FeatureItemProps[];
}

const featuresData: FeatureCategoryProps[] = [
    {
        category: "Premium Software Stack",
        items: [
            {
                title: "LiteSpeed Web Server",
                description: "A high-performance web server that replaces Apache. Delivers static content 40% faster, handles 3-5x more concurrent connections, and includes built-in caching for popular applications like WordPress.",
                impact: "Your pages load faster, your site handles traffic spikes better, and you rank higher in search engines.",
                retailCost: "$45/month"
            },
            {
                title: "CloudLinux OS",
                description: "A specialized OS that isolates each account into its own protected environment. Guarantees your allocated RAM and CPU, and prevents 'noisy neighbors' from slowing down your site.",
                impact: "Consistent performance regardless of what other sites on the server are doing. Your allocated resources are truly yours.",
                retailCost: "$20/month"
            },
            {
                title: "Imunify360 Security Suite",
                description: "An AI-powered security system providing real-time threat detection, malware scanning, and intrusion prevention. It proactively blocks malicious IPs and catches new, unknown threats.",
                impact: "Your site stays secure without you having to think about it. Attacks are stopped before they succeed.",
                retailCost: "$20/month"
            }
        ]
    },
    {
        category: "Performance Technologies",
        items: [
            {
                title: "NVMe SSD Storage",
                description: "Next-generation solid-state storage that is 5-10x faster than traditional SATA SSDs, resulting in faster database queries, site load times, and backups.",
                impact: "Everything that touches storage is noticeably quicker, leading to a snappier user experience.",
                retailCost: "Included"
            },
            {
                title: "HTTP/3 and QUIC Protocol",
                description: "The latest version of HTTP, which provides faster initial connections and better performance on poor or mobile networks. Includes built-in encryption by default.",
                impact: "Visitors on mobile networks or with poor connections get dramatically better loading times.",
                retailCost: "Included"
            }
        ]
    },
    {
        category: "Security Technologies",
        items: [
            {
                title: "ModSecurity & DDoS Protection",
                description: "A web application firewall that filters malicious traffic, combined with network-level filtering that blocks denial-of-service attacks before they can overwhelm your site.",
                impact: "Protects against a wide range of common attacks, from SQL injection to large-scale DDoS floods.",
                retailCost: "Included"
            },
            {
                title: "CageFS Isolation",
                description: "A virtualized file system that gives each hosting account its own isolated environment, preventing users from seeing other accounts' files and stopping exploits from jumping between sites.",
                impact: "Eliminates a common and dangerous vulnerability of traditional shared hosting environments.",
                retailCost: "Included"
            }
        ]
    }
];

const FeatureItem: React.FC<FeatureItemProps> = ({ title, description, impact, retailCost }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-xl bg-white/5 p-5 border border-cyan-500/20 backdrop-blur-sm"
    >
        <div className="flex items-center justify-between">
            <h4 className="font-semibold text-cyan-100">{title}</h4>
            <span className="text-xs text-emerald-300 bg-emerald-500/20 px-2 py-1 rounded-full">{retailCost}</span>
        </div>
        <p className="mt-2 text-sm text-slate-300">{description}</p>
        <p className="mt-2 text-sm text-cyan-200"><span className="font-medium">Impact:</span> {impact}</p>
    </motion.div>
);

const FeatureCategory: React.FC<FeatureCategoryProps> = ({ category, items }) => (
    <div className="mb-10">
        <h3 className="text-2xl font-bold text-cyan-200 mb-4">{category}</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => (
                <FeatureItem key={`${category}-item-${index}`} {...item} />
            ))}
        </div>
    </div>
);

export default function TechnicalFeatures() {
    return (
        <section className="py-16">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-emerald-300">
                    Included Premium Features
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-slate-300">
                    Every hosting plan includes enterprise-grade software and technologies that would cost hundreds of dollars if purchased separately.
                </p>
            </div>
            {featuresData.map((cat, index) => (
                <FeatureCategory key={`category-${index}`} {...cat} />
            ))}
        </section>
    );
}
