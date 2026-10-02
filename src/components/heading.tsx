import type { ReactNode } from "react";

type Props = {
  title: string;
  description?: ReactNode;
};

export function Heading({ title, description }: Props) {
  return (
    <>
      <h2 className="text-sm uppercase">({title})</h2>
      {!!description && (
        <p className="mt-2 text-sm text-slate-600/70 text-balance">
          {description}
        </p>
      )}
    </>
  );
}
