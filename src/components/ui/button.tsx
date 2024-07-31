import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "flex items-center justify-center whitespace-nowrap text-sm"
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  to?: string;
  href?: string;
  target?: "_self" | "_blank" | "_parent" | "_top";
  onClick?: () => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  className?: string;
  title?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      asChild = false,
      to = "",
      href = "",
      target = "_blank",
      onClick = () => {},
      children,
      type = "button",
      title = "",
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    let classes = [
      "relative",
      "flex",
      "items-center",
      "whitespace-nowrap",
      "text-sm",
      "justify-center",
      "group",
    ];

    if (className) {
      classes = [...classes, className];
    }

    return (
      <>
        {href && (
          <a href={href} className={classes.join(" ")} target={target}>
            {children}
          </a>
        )}
        {to && (
          <Link to={to} className={classes.join(" ")}>
            {children}
            {title && (
              <span className="opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all delay-700 ease-in absolute z-20 -bottom-6 left-1/2 -translate-x-1/2 py-0.5 px-3 bg-blue-600 rounded text-white text-xs before:absolute before:-top-1 before:left-1/2 before:-translate-x-1/2 before:rotate-45 before:size-3 before:-z-10 before:bg-blue-600">
                {title}
              </span>
            )}
          </Link>
        )}
        {!to && !href && (
          <Comp
            className={cn(buttonVariants({ className }))}
            ref={ref}
            {...props}
            type={type}
            onClick={onClick}
          >
            {children}
          </Comp>
        )}
      </>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
