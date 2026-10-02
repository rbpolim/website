import type { Project as ProjectDoc } from "@/payload-types";

type Props = {
  project: ProjectDoc;
};

function displayUrl(url: string) {
  try {
    const { host, pathname } = new URL(url);
    const path = pathname === "/" ? "" : pathname.replace(/\/$/, "");
    return `${host}${path}`;
  } catch {
    return url;
  }
}

export function Project({ project }: Props) {
  if (!project.url) return null;

  return (
    <li>
      <a
        href={project.url}
        className="block border border-slate-200 px-4 py-3 transition-colors duration-700 hover:border-transparent hover:bg-[#00ff001d] bg-white"
      >
        <h2 className="font-bold text-sm">{project.title}</h2>
        <p className="mt-1 text-sm leading-relaxed text-slate-500/80">
          {project.description}
        </p>
        <p className="mt-3 text-xs text-slate-600/50">
          {displayUrl(project.url)}
        </p>
      </a>
    </li>
  );
}
