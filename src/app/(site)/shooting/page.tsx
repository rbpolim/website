import Image from "next/image";
import Link from "next/link";
import { getPayload } from "payload";
import config from "@payload-config";

import { Heading } from "@/components/heading";
import type { Photo } from "@/payload-types";

export const revalidate = 3600;

function formatTakenAt(value: string) {
  const [year, month, day] = value.slice(0, 10).split("-").map(Number);

  return new Date(year, month - 1, day).toLocaleDateString("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

async function loadPhotos(): Promise<Photo[]> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "photos",
    sort: "-createdAt",
    limit: 100,
  });

  return docs;
}

export default async function ShootingPage() {
  const docs = await loadPhotos();

  return (
    <section>
      <Heading title="shooting" description="Random dump of photos." />
      {docs.length === 0 ? (
        <p className="mt-8 text-sm text-slate-600/70">
          No photos yet. Add them in the{" "}
          <Link href="/admin" className="underline">
            admin
          </Link>
          .
        </p>
      ) : (
        <div className="mt-8 space-y-8">
          {docs.map((photo, index) => (
            <PhotoFigure key={photo.id} photo={photo} priority={index === 0} />
          ))}
        </div>
      )}
    </section>
  );
}

function PhotoFigure({
  photo,
  priority = false,
}: {
  photo: Photo;
  priority?: boolean;
}) {
  const tags = photo.tags?.filter(Boolean) ?? [];
  const meta = [
    photo.location,
    photo.takenAt ? formatTakenAt(photo.takenAt) : null,
  ].filter(Boolean);
  const src = photo.sizes?.card?.url || photo.url;

  if (!src) return null;

  return (
    <figure className="space-y-2">
      <div className="relative aspect-video bg-slate-100">
        <Image
          fill
          src={src}
          alt={photo.alt}
          className="object-cover"
          sizes="(max-width: 672px) 100vw, 672px"
          priority={priority}
          unoptimized={Boolean(photo.sizes?.card?.url)}
          {...(photo.blurDataURL
            ? { placeholder: "blur" as const, blurDataURL: photo.blurDataURL }
            : {})}
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
