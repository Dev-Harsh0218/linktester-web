import clsx from "clsx";

export function Table({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="overflow-x-auto">
      <table className={clsx("w-full text-sm", className)}>{children}</table>
    </div>
  );
}

export function THead({ children }: { children: React.ReactNode }) {
  return (
    <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
      {children}
    </thead>
  );
}

export function TR({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <tr className={clsx("border-b border-neutral-100 last:border-0", className)}>
      {children}
    </tr>
  );
}

export function TH({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      className={clsx(
        "text-left font-medium text-xs uppercase tracking-wide px-4 py-2.5",
        className,
      )}
    >
      {children}
    </th>
  );
}

export function TD({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <td className={clsx("px-4 py-3 text-neutral-800 align-middle", className)}>
      {children}
    </td>
  );
}
