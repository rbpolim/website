import type { CollectionConfig } from "payload";

export const Photos: CollectionConfig = {
  slug: "photos",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "alt",
    defaultColumns: ["filename", "alt", "takenAt", "location", "tags"],
  },
  upload: {
    staticDir: "media",
    mimeTypes: ["image/*"],
    adminThumbnail: "thumbnail",
    imageSizes: [
      {
        name: "thumbnail",
        width: 400,
        height: 400,
        position: "centre",
      },
    ],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
    {
      name: "caption",
      type: "textarea",
    },
    {
      name: "takenAt",
      type: "date",
      admin: {
        date: {
          pickerAppearance: "dayOnly",
        },
      },
    },
    {
      name: "location",
      type: "text",
    },
    {
      name: "tags",
      type: "text",
      hasMany: true,
    },
  ],
};
