type Props = {
  post: {
    slug: string;
    title: string;
    description: string;
    date: string;
  };
};

export function Post({ post }: Props) {
  return (
    <li
      key={post.slug}
      className="mt-10 group hover:bg-[#00ff0059] transition-colors duration-700"
    >
      <a
        href={`/writing/${post.slug}`}
        className="flex items-start justify-between gap-x-6 text-slate-800"
      >
        <div className="flex-1">
          <h2 className="font-bold text-sm">{post.title}</h2>
          <p className="text-slate-500/80 text-sm leading-relaxed">
            {post.description}
          </p>
        </div>
        <div className="ml-auto hidden md:flex">
          <p className="text-slate-600/40 mt-2 text-xs">{post.date}</p>
        </div>
      </a>
    </li>
  );
}
