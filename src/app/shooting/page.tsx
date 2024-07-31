import Image from "next/image";

import { Heading } from "@/components/heading";

const photos = [
  {
    src: "/img/pizza.jpeg",
    alt: "A simple pizza photo",
  },
  {
    src: "/img/mari.jpeg",
    alt: "A simple pizza photo",
  },
  {
    src: "/img/ro.jpeg",
    alt: "A simple pizza photo",
  },
];

export default function ShottingPage() {
  return (
    <section>
      <Heading title="shooting" description="Random dump of photos." />
      <div className="mt-8 space-y-2">
        {photos.map((photo) => (
          <div key={photo.alt} className="relative aspect-video">
            <Image
              fill
              src={photo.src}
              alt={photo.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
