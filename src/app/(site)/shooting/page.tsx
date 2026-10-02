import Image from "next/image";
import Link from "next/link";
import { getPayload } from "payload";
import config from "@payload-config";
import type { Photo } from "@/payload-types";

import { Heading } from "@/components/heading";

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
  const card = photo.sizes?.card;
  const src = card?.url || photo.url;
  const width = card?.width || photo.width;
  const height = card?.height || photo.height;

  if (!src || !width || !height) return null;

  return (
    <figure className="space-y-2">
      <Image
        src={src}
        alt={photo.alt}
        width={width}
        height={height}
        className="h-auto w-full bg-slate-100"
        sizes="(max-width: 672px) 100vw, 672px"
        priority={priority}
        unoptimized={Boolean(card?.url)}
        {...(photo.blurDataURL
          ? { placeholder: "blur" as const, blurDataURL: photo.blurDataURL }
          : {})}
      />
    </figure>
  );
}
