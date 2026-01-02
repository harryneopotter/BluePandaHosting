"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { LuminousCard } from "../../../../components/LuminousCard";
import { Button } from "../../../../components/ui/Button";
import { Input } from "../../../../components/ui/Input";
import {
    ArrowLeftIcon,
    PaperAirplaneIcon,
    SparklesIcon,
} from "@heroicons/react/24/outline";

// Mock departments
const departments = [
    { id: "1", name: "General Support" },
    { id: "2", name: "Technical Support" },
    { id: "3", name: "Billing Support" },
    { id: "4", name: "Sales" },
];

const priorities = [
    { id: "Low", name: "Low", description: "General questions, no urgency" },
    { id: "Medium", name: "Medium", description: "Standard issues" },
    { id: "High", name: "High", description: "Urgent, service impacted" },
];

export default function NewTicketPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        subject: "",
        department: "",
        priority: "Medium",
        message: "",
    });
    const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);

    // Simulate AI suggestion based on message content
    const handleMessageChange = (value: string) => {
        setFormData((prev) => ({ ...prev, message: value }));

        // Simple AI suggestion logic (would be API call in production)
        if (value.toLowerCase().includes("slow") || value.toLowerCase().includes("loading")) {
            setAiSuggestion(
                "It sounds like you're experiencing performance issues. Have you tried clearing your browser cache? Check our performance guide for quick fixes."
            );
        } else if (value.toLowerCase().includes("ssl") || value.toLowerCase().includes("certificate")) {
            setAiSuggestion(
                "For SSL issues, try waiting 24 hours after installation for propagation. Our SSL guide covers common certificate problems."
            );
        } else {
            setAiSuggestion(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Redirect to tickets list on success
        router.push("/support/tickets");
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            {/* Back button */}
            <Link
                href="/support/tickets"
                className="inline-flex items-center gap-2 text-surface-400 hover:text-surface-200 transition-colors"
            >
                <ArrowLeftIcon className="w-4 h-4" />
                <span className="text-sm">Back to Tickets</span>
            </Link>

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-2xl font-bold text-surface-100">
                    Create Support Ticket
                </h1>
                <p className="text-surface-400 mt-1">
                    Describe your issue and our team will help you resolve it.
                </p>
            </motion.div>

            {/* Form */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <form onSubmit={handleSubmit}>
                    <LuminousCard className="p-6 space-y-6">
                        {/* Subject */}
                        <Input
                            label="Subject"
                            placeholder="Brief description of your issue"
                            value={formData.subject}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, subject: e.target.value }))
                            }
                            required
                        />

                        {/* Department & Priority */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-surface-200 mb-1.5">
                                    Department
                                </label>
                                <select
                                    value={formData.department}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            department: e.target.value,
                                        }))
                                    }
                                    className="w-full px-4 py-2.5 rounded-xl text-sm bg-surface-900/50 text-surface-100 border border-primary-400/20 focus:border-primary-400/80 focus:outline-none focus:ring-2 focus:ring-primary-400/30"
                                    required
                                >
                                    <option value="">Select department</option>
                                    {departments.map((dept) => (
                                        <option key={dept.id} value={dept.id}>
                                            {dept.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-surface-200 mb-1.5">
                                    Priority
                                </label>
                                <div className="flex gap-2">
                                    {priorities.map((p) => (
                                        <button
                                            key={p.id}
                                            type="button"
                                            onClick={() =>
                                                setFormData((prev) => ({ ...prev, priority: p.id }))
                                            }
                                            className={`flex-1 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${formData.priority === p.id
                                                    ? "bg-primary-500/20 text-primary-400 border border-primary-400/30"
                                                    : "bg-surface-800/60 text-surface-400 border border-surface-700/50 hover:text-surface-200"
                                                }`}
                                        >
                                            {p.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Message */}
                        <div>
                            <label className="block text-sm font-medium text-surface-200 mb-1.5">
                                Message <span className="text-accent-400">*</span>
                            </label>
                            <textarea
                                value={formData.message}
                                onChange={(e) => handleMessageChange(e.target.value)}
                                placeholder="Describe your issue in detail. Include any error messages, screenshots, or steps to reproduce the problem..."
                                rows={6}
                                className="w-full px-4 py-3 rounded-xl text-sm bg-surface-900/50 text-surface-100 border border-primary-400/20 focus:border-primary-400/80 focus:outline-none focus:ring-2 focus:ring-primary-400/30 resize-none"
                                required
                            />
                            <p className="text-xs text-surface-500 mt-1.5">
                                If you're unsure how to describe the problem, just explain what you're seeing.
                            </p>
                        </div>

                        {/* AI Suggestion */}
                        {aiSuggestion && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                className="p-4 rounded-xl bg-gradient-to-r from-primary-500/10 to-accent-500/10 border border-primary-400/20"
                            >
                                <div className="flex items-start gap-3">
                                    <SparklesIcon className="w-5 h-5 text-primary-400 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-primary-400 mb-1">
                                            AI Suggestion
                                        </p>
                                        <p className="text-sm text-surface-300">{aiSuggestion}</p>
                                        <div className="flex gap-2 mt-3">
                                            <Button variant="outline" size="sm">
                                                View Article
                                            </Button>
                                            <Button variant="ghost" size="sm">
                                                Continue with ticket
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Submit */}
                        <div className="flex justify-end gap-3 pt-2">
                            <Link href="/support/tickets">
                                <Button variant="ghost" type="button">
                                    Cancel
                                </Button>
                            </Link>
                            <Button
                                type="submit"
                                isLoading={isSubmitting}
                                leftIcon={<PaperAirplaneIcon className="w-4 h-4" />}
                            >
                                Submit Ticket
                            </Button>
                        </div>
                    </LuminousCard>
                </form>
            </motion.div>
        </div>
    );
}
