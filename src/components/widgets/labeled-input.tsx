import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

export interface LabeledInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    variant?: "default";
}

const labelVariants = {
    variants: {
        variant: {
            default: "bg-white text-xs font-bold bg-white",
        }
    },
    height: {
        default: "h-14",
        sm: "h-8",
        md: "h-12",
        lg: "h-16",
    }
};

const LabeledInput = React.forwardRef<HTMLInputElement, LabeledInputProps>(
    ({ className, type, label, variant = "default", ...props }, ref) => {
        const variantClass = labelVariants.variants.variant[variant] || "";
        const heightClass = labelVariants.height[variant] || "";

        return (
            <div className={`relative ${className}`}>
                <Label
                    className={`absolute translate-x-2 -translate-y-2 z-[10] ${variantClass}`}
                >
                    {label}
                </Label>
                <Input
                    type={type}
                    ref={ref}
                    className={heightClass}
                    {...props}
                />
            </div>
        );
    }
);

LabeledInput.displayName = "LabeledInput";

export { LabeledInput };