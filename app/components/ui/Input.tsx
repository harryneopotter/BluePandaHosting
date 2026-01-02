"use client";

import {
    forwardRef,
    type InputHTMLAttributes,
    type ReactNode,
    useId,
} from "react";

export interface InputProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
    label?: string;
    helperText?: string;
    error?: string;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    size?: "sm" | "md" | "lg";
}

const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2.5 text-sm",
    lg: "px-4 py-3 text-base",
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            label,
            helperText,
            error,
            leftIcon,
            rightIcon,
            size = "md",
            className = "",
            id,
            ...props
        },
        ref
    ) => {
        const generatedId = useId();
        const inputId = id || generatedId;
        const hasError = !!error;

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="block text-sm font-medium text-surface-200 mb-1.5"
                    >
                        {label}
                        {props.required && (
                            <span className="text-accent-400 ml-0.5">*</span>
                        )}
                    </label>
                )}

                <div className="relative">
                    {leftIcon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400 pointer-events-none">
                            {leftIcon}
                        </div>
                    )}

                    <input
                        ref={ref}
                        id={inputId}
                        className={`
              w-full rounded-xl font-normal
              bg-surface-900/50 text-surface-100 placeholder:text-surface-500
              border transition-all duration-200
              ${hasError
                                ? "border-red-400/60 focus:border-red-400 focus:ring-red-400/30"
                                : "border-primary-400/20 focus:border-primary-400/80 focus:ring-primary-400/30"
                            }
              focus:outline-none focus:ring-2
              disabled:opacity-50 disabled:cursor-not-allowed
              ${sizeStyles[size]}
              ${leftIcon ? "pl-10" : ""}
              ${rightIcon ? "pr-10" : ""}
              ${className}
            `}
                        aria-invalid={hasError}
                        aria-describedby={
                            hasError ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
                        }
                        {...props}
                    />

                    {rightIcon && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400">
                            {rightIcon}
                        </div>
                    )}
                </div>

                {hasError && (
                    <p
                        id={`${inputId}-error`}
                        className="mt-1.5 text-sm text-red-400 flex items-center gap-1.5"
                    >
                        <svg
                            className="w-4 h-4 shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        {error}
                    </p>
                )}

                {!hasError && helperText && (
                    <p
                        id={`${inputId}-helper`}
                        className="mt-1.5 text-sm text-surface-400"
                    >
                        {helperText}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

export default Input;
