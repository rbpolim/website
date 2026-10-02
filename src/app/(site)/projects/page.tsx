import Link from "next/link";
import { getPayload } from "payload";
import config from "@payload-config";
import type { Project as ProjectDoc } from "@/payload-types";

import { Heading } from "@/components/heading";
import { Project } from "@/components/project";

async function loadProjects(): Promise<ProjectDoc[]> {
  const payload = await getPayload({ config });

  const { docs } = await payload.find({
    collection: "projects",
    sort: "-createdAt",
    limit: 100,
  });

  return docs;
}

export default async function ProjectsPage() {
  const projects = await loadProjects();

  return (
    <section>
      <Heading
        title="projects"
        description="A short list of things I like having made."
      />
      {projects.length === 0 ? (
        <p className="mt-8 text-sm text-slate-600/70">
          No projects yet. Add them in the{" "}
          <Link href="/admin" className="underline">
            admin
          </Link>
          .
        </p>
      ) : (
        <ul className="mt-8 grid gap-4">
          {projects.map((project) => (
            <Project key={project.id} project={project} />
          ))}
        </ul>
      )}
    </section>
  );
}
