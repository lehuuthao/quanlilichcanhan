import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/styles";
import Spinner from "../../components/Spinner";

const buttonVariants = cva(
  "inline-flex animate-fade gap-2 items-center justify-center duration-300 ease-out whitespace-nowrap",
  {
    variants: {
      variant: {
        primary: [
          "bg-violet-950 h-[60px] text-2xl font-extrabold text-violet-50",
          "rounded-2xl px-6 py-[14px]",
          //   "hover:bg-primary-700",
          //   "disabled:bg-primary-100 disabled:text-primary-50",
        ],
        secondary: [
          "text-primary-500 shadow-border-primary-500",
          "rounded-lg px-6 py-2",
          "hover:text-primary-700 hover:shadow-border-primary-700",
          "disabled:text-gray-500 disabled:shadow-border-gray-500",
        ],
      },
      size: {
        xs: "h-8",
        sm: "h-10",
        md: "h-[60px]",
        lg: "h-14",
        icon: "px-1 w-12 h-12",
        "icon-sm": "px-1 w-9 h-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, loading, children, disabled, ...props },
    ref
  ) => {
    return (
      <button
        className={cn(
          buttonVariants({ variant, size }),
          { relative: loading },
          className
        )}
        disabled={loading || disabled}
        ref={ref}
        {...props}
      >
        {children}
        {loading && (
          <div className="absolute inset-0 flex h-full w-full items-center justify-center">
            <Spinner />
          </div>
        )}
      </button>
    );
  }
);

export { Button };
