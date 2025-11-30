"use client";

import React from 'react';
import { motion } from 'framer-motion';

const featuresData = [
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

interface FeatureItemProps {
    title: string;
    description: string;
    impact: string;
    retailCost: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ title, description, impact, retailCost }) => (
    <motion.div
        className="rounded-xl border border-slate-700/50 bg-slate-800/20 p-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
    >
        <h3 className="text-xl font-bold text-sky-200">{title}</h3>
        <p className="mt-2 text-slate-300">{description}</p>
        <p className="mt-4 text-sm text-sky-300/80 italic">
            <span className="font-semibold text-sky-200">Real-world impact:</span> {impact}
        </p>
        <div className="mt-4 text-xs font-semibold uppercase text-sky-200/70">
            Retail Value: <span className="font-bold text-sky-100">{retailCost}</span>
        </div>
    </motion.div>
);

const TechnicalFeatures = () => {
    return (
        <section className="py-16 sm:py-24">
            <div className="mx-auto max-w-6xl px-6">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-transparent sm:text-4xl bg-clip-text bg-gradient-to-r from-sky-300 to-cyan-400">
                        Our Technology Stack
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
                        We don&apos;t just provide hosting; we provide a high-performance platform. Every piece of software in our stack is chosen to deliver the best speed, security, and reliability.
                    </p>
                </div>

                <div className="mt-12 space-y-12">
                    {featuresData.map((category) => (
                        <div key={category.category}>
                            <h3 className="text-2xl font-bold text-center text-sky-200">{category.category}</h3>
                            <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                {category.items.map((feature) => (
                                    <FeatureItem key={feature.title} {...feature} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechnicalFeatures;
