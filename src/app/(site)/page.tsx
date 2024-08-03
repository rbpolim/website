import { Link } from "@/components/link";
import { Heading } from "@/components/heading";

export default function Home() {
  const links = [
    {
      title: "twitter",
      href: "https://twitter.com/rbpolim",
    },
    {
      title: "github",
      href: "https://github.com/rbpolim",
    },
    {
      title: "linkedIn",
      href: "https://linkedin.com/in/rbpolim",
    },
  ];

  return (
    <section className="space-y-14">
      <div>
        <Heading
          title="about me"
          description="I’m a full-stack developer based in São Paulo with a background in UI development. I’m passionate about frontend technologies, backend solutions, and enhancing the developer experience. Beyond tech, I have a keen interest in product design, technology, film, and craft beer."
        />
      </div>
      <div>
        <Heading title="contact" />
        <ul className="flex items-center gap-x-4 text-slate-600/80 mt-2 text-sm">
          {links.map((link) => (
            <Link key={link.href} title={link.title} href={link.href} />
          ))}
        </ul>
      </div>
    </section>
  );
}
