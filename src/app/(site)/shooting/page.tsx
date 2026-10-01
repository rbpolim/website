import Image from "next/image";
import { getPayload } from "payload";
import config from "@payload-config";

import { Heading } from "@/components/heading";
import type { Photo } from "@/payload-types";

export const dynamic = "force-dynamic";

function formatTakenAt(value: string) {
  const [year, month, day] = value.slice(0, 10).split("-").map(Number);

  return new Date(year, month - 1, day).toLocaleDateString("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function ShootingPage() {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "photos",
    sort: "createdAt",
    limit: 100,
  });

  return (
    <section>
      <Heading title="shooting" description="Random dump of photos." />
      {docs.length === 0 ? (
        <p className="mt-8 text-sm text-slate-600/70">
          No photos yet. Add them in the{" "}
          <a href="/admin" className="underline">
            admin
          </a>
          .
        </p>
      ) : (
        <div className="mt-8 space-y-8">
          {docs.map((photo) => (
            <PhotoFigure key={photo.id} photo={photo} />
          ))}
        </div>
      )}
    </section>
  );
}

function PhotoFigure({ photo }: { photo: Photo }) {
  const tags = photo.tags?.filter(Boolean) ?? [];
  const meta = [
    photo.location,
    photo.takenAt ? formatTakenAt(photo.takenAt) : null,
  ].filter(Boolean);

  if (!photo.url) return null;

  return (
    <figure className="space-y-2">
      <div className="relative aspect-video">
        <Image
          fill
          src={photo.url}
          alt={photo.alt}
          className="object-cover"
          sizes="(max-width: 672px) 100vw, 672px"
        />
      </div>
      {(photo.caption || meta.length > 0 || tags.length > 0) && (
        <figcaption className="space-y-1 text-sm text-slate-600/80">
          {photo.caption && <p>{photo.caption}</p>}
          {meta.length > 0 && <p>{meta.join(" · ")}</p>}
          {tags.length > 0 && <p>{tags.join(", ")}</p>}
        </figcaption>
      )}
    </figure>
  );
}
