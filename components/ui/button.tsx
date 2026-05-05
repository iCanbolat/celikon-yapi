import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center rounded-none justify-center gap-2 whitespace-nowrap text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-neutral-900 text-white hover:bg-white hover:text-neutral-900 tracking-[0.18em] uppercase border-2 border-neutral-900 focus-visible:ring-blue-600",
        outline:
          "border-2 border-neutral-900 px-4  font-black uppercase tracking-[0.18em] text-neutral-900 hover:bg-neutral-900 hover:text-white",
        outlineWhite:
          "border-2 border-white px-4 text-[0.64rem] font-black uppercase tracking-[0.18em] text-white hover:bg-white hover:text-neutral-900",
        ghost: "hover:bg-gray-100 hover:text-gray-900",
        link: "text-blue-600 underline-offset-4 hover:underline",
        yellow:
          "bg-blue-600 text-white hover:bg-blue-600 focus-visible:ring-bg-blue-600",
      },
      size: {
        default: "h-12 px-8 py-3",
        sm: "h-9 px-4 py-2 text-xs",
        lg: "h-14 px-10 py-4 text-sm ",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
