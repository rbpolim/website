import { Link } from "@/components/link";
import { Heading } from "@/components/heading";

export default function Home() {
  return (
    <main className="max-w-2xl mx-auto ">
      <div className="mt-20">
        <Heading
          title="about me"
          description="I'm a Frontend developer with a real love for crafting digital
          experiences. Professionally, I've been immersed in web and mobile
          development since 2020, diving deep into technologies like Typescript,
          React.js, Next.js, React Native, and Node.js."
        />
      </div>
      <div className="mt-8">
        <Heading title="contact" />
        <li className="flex items-center gap-x-4 text-slate-600/80 mt-4 text-sm">
          <Link title="twitter" href="https://twitter.com/rbpolim" />
          <Link title="github" href="https://github.com/rbpolim" />
          <Link title="linkedIn" href="https://linkedin.com/in/rbpolim" />
        </li>
      </div>
    </main>
  );
}
