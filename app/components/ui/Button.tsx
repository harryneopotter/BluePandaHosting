"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
    extends Omit<HTMLMotionProps<"button">, "children"> {
    children: ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    isLoading?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
    primary:
        "bg-primary-500 text-surface-950 hover:bg-primary-400 focus-visible:ring-primary-400 shadow-glow-cyan/30",
    secondary:
        "bg-surface-800 text-surface-100 hover:bg-surface-700 focus-visible:ring-surface-500 border border-surface-600",
    outline:
        "bg-transparent text-primary-400 border border-primary-400/50 hover:bg-primary-400/10 hover:border-primary-400 focus-visible:ring-primary-400",
    ghost:
        "bg-transparent text-surface-300 hover:bg-surface-800/60 hover:text-surface-100 focus-visible:ring-surface-400",
    danger:
        "bg-red-500/90 text-white hover:bg-red-500 focus-visible:ring-red-400",
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: "px-3 py-1.5 text-sm gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2.5",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            variant = "primary",
            size = "md",
            isLoading = false,
            leftIcon,
            rightIcon,
            fullWidth = false,
            className = "",
            disabled,
            ...props
        },
        ref
    ) => {
        const isDisabled = disabled || isLoading;

        return (
            <motion.button
                ref={ref}
                className={`
          inline-flex items-center justify-center font-medium rounded-xl
          transition-colors duration-200 ease-out
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-950
          disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${fullWidth ? "w-full" : ""}
          ${className}
        `}
                disabled={isDisabled}
                whileTap={{ scale: isDisabled ? 1 : 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                {...props}
            >
                {isLoading ? (
                    <LoadingSpinner className="w-4 h-4" />
                ) : (
                    leftIcon && <span className="shrink-0">{leftIcon}</span>
                )}
                <span>{children}</span>
                {!isLoading && rightIcon && (
                    <span className="shrink-0">{rightIcon}</span>
                )}
            </motion.button>
        );
    }
);

Button.displayName = "Button";

function LoadingSpinner({ className = "" }: { className?: string }) {
    return (
        <svg
            className={`animate-spin ${className}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            />
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
        </svg>
    );
}

export default Button;
