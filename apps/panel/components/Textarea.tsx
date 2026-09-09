import clsx from "clsx";
import { forwardRef } from "react";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ className, ...rest }, ref) {
    return (
      <textarea
        ref={ref}
        className={clsx(
          "w-full rounded-md border border-neutral-300 px-3 py-2 text-sm",
          "focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500",
          className,
        )}
        {...rest}
      />
    );
  },
);
