import clsx from "clsx";
import { forwardRef } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, ...rest },
  ref,
) {
  return (
    <input
      ref={ref}
      className={clsx(
        "w-full rounded-md border border-neutral-300 px-3 py-2 text-sm",
        "focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500",
        "disabled:bg-neutral-50 disabled:text-neutral-500",
        className,
      )}
      {...rest}
    />
  );
});
