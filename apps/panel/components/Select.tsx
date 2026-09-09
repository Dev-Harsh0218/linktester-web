import clsx from "clsx";
import { forwardRef } from "react";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, children, ...rest },
  ref,
) {
  return (
    <select
      ref={ref}
      className={clsx(
        "rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm",
        "focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500",
        className,
      )}
      {...rest}
    >
      {children}
    </select>
  );
});
