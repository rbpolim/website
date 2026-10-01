type Props = {
  title: string;
  href: string;
};

export function Link({ title, href }: Props) {
  return (
    <li>
      <a
        href={href}
        className="underline hover:bg-[#00ff0059] transition-all duration-300"
      >
        {title}
      </a>
    </li>
  );
}
