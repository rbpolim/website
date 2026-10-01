import Image from "next/image";
import Link from "next/link";
import { getPayload } from "payload";
import config from "@payload-config";

import { Heading } from "@/components/heading";
import { publishedPhotos, type PublishedPhoto } from "@/data/photos";

export const dynamic = "force-dynamic";

function usesRemoteDatabase(url: string | undefined) {
  return Boolean(url && !url.startsWith("file:"));
}

function formatTakenAt(value: string) {
  const [year, month, day] = value.slice(0, 10).split("-").map(Number);

  return new Date(year, month - 1, day).toLocaleDateString("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

async function loadPhotos(): Promise<PublishedPhoto[]> {
  if (process.env.VERCEL && !usesRemoteDatabase(process.env.DATABASE_URL)) {
    return publishedPhotos;
  }

  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "photos",
      sort: "createdAt",
      limit: 100,
    });

    return docs.map((photo) => ({
      id: String(photo.id),
      alt: photo.alt,
      url: photo.url ?? "",
      caption: photo.caption,
      takenAt: photo.takenAt,
      location: photo.location,
      tags: photo.tags,
    }));
  } catch (error) {
    console.error("Failed to load photos from Payload", error);
    return publishedPhotos;
  }
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
          {docs.map((photo) => (
            <PhotoFigure key={photo.id} photo={photo} />
          ))}
        </div>
      )}
    </section>
  );
}

function PhotoFigure({ photo }: { photo: PublishedPhoto }) {
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
