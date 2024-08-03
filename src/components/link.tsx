type Props = {
  title: string;
  href: string;
};

export function Link({ title, href }: Props) {
  return (
    <li>
      <a
        href={href}
        className="underline transition-colors hover:bg-[#00ff0059]"
      >
        {title}
      </a>
    </li>
  );
}
