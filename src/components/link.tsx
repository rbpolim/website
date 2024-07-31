type Props = {
  title: string;
  href: string;
};

export function Link({ title, href }: Props) {
  return (
    <a href={href} className="underline hover:bg-[#D0F490] transition-colors">
      {title}
    </a>
  );
}
