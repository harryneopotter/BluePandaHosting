"use client";

import { type HTMLAttributes } from "react";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
    variant?: "text" | "circular" | "rectangular" | "card";
    width?: string | number;
    height?: string | number;
    lines?: number;
}

export function Skeleton({
    variant = "rectangular",
    width,
    height,
    lines = 1,
    className = "",
    ...props
}: SkeletonProps) {
    const baseClasses =
        "bg-gradient-to-r from-surface-800 via-surface-700 to-surface-800 bg-[length:200%_100%] animate-shimmer";

    if (variant === "text" && lines > 1) {
        return (
            <div className={`space-y-2 ${className}`} {...props}>
                {Array.from({ length: lines }).map((_, i) => (
                    <div
                        key={i}
                        className={`${baseClasses} h-4 rounded ${i === lines - 1 ? "w-4/5" : "w-full"
                            }`}
                    />
                ))}
            </div>
        );
    }

    const variantClasses = {
        text: "h-4 rounded",
        circular: "rounded-full",
        rectangular: "rounded-xl",
        card: "rounded-2xl",
    };

    const style = {
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
    };

    return (
        <div
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
            style={style}
            {...props}
        />
    );
}

// Preset skeleton configurations
export function SkeletonCard({ className = "" }: { className?: string }) {
    return (
        <div
            className={`rounded-2xl border border-surface-700/50 bg-surface-900/50 p-6 ${className}`}
        >
            <Skeleton variant="rectangular" height={20} width="60%" className="mb-4" />
            <Skeleton variant="text" lines={3} className="mb-4" />
            <Skeleton variant="rectangular" height={32} width={100} />
        </div>
    );
}

export function SkeletonServiceCard() {
    return (
        <div className="rounded-2xl border border-surface-700/50 bg-surface-900/50 p-5">
            <div className="flex items-center gap-3 mb-4">
                <Skeleton variant="circular" width={40} height={40} />
                <div className="flex-1">
                    <Skeleton height={16} width="70%" className="mb-2" />
                    <Skeleton height={12} width="40%" />
                </div>
            </div>
            <Skeleton height={12} width="50%" className="mb-3" />
            <div className="flex gap-2">
                <Skeleton height={32} width={80} />
                <Skeleton height={32} width={80} />
            </div>
        </div>
    );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
    return (
        <div className="space-y-3">
            {/* Header */}
            <div className="flex gap-4 pb-3 border-b border-surface-700/50">
                <Skeleton height={14} width="20%" />
                <Skeleton height={14} width="25%" />
                <Skeleton height={14} width="15%" />
                <Skeleton height={14} width="30%" />
            </div>
            {/* Rows */}
            {Array.from({ length: rows }).map((_, i) => (
                <div key={i} className="flex gap-4 py-2">
                    <Skeleton height={14} width="20%" />
                    <Skeleton height={14} width="25%" />
                    <Skeleton height={14} width="15%" />
                    <Skeleton height={14} width="30%" />
                </div>
            ))}
        </div>
    );
}

export default Skeleton;
