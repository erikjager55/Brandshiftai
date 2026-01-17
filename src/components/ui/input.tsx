import * as React from "react";

import { cn } from "./utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-gray-400 selection:bg-primary selection:text-primary-foreground border-gray-300 flex h-10 w-full min-w-0 rounded-lg border px-3 py-2 text-base bg-white transition-colors outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus:border-primary focus:ring-2 focus:ring-primary/20",
          "aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
          className,
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };