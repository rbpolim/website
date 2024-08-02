type Props = {
  title: string;
  description?: string;
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
