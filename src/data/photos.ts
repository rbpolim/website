export type PublishedPhoto = {
  id: string;
  alt: string;
  url: string;
  caption?: string | null;
  takenAt?: string | null;
  location?: string | null;
  tags?: string[] | null;
};

export const publishedPhotos: PublishedPhoto[] = [
  {
    id: "pizza",
    alt: "A simple pizza photo",
    url: "/img/pizza.jpeg",
  },
  {
    id: "mari",
    alt: "mari",
    url: "/img/mari.jpeg",
  },
  {
    id: "ro",
    alt: "ro",
    url: "/img/ro.jpeg",
  },
  {
    id: "saoseba",
    alt: "saoseba",
    url: "/img/saoseba.jpeg",
  },
];
