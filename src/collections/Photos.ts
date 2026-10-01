import { revalidatePath } from "next/cache";
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  CollectionBeforeChangeHook,
  CollectionConfig,
} from "payload";
import sharp from "sharp";

const CARD_SIZE = "card";

function revalidateShooting() {
  try {
    revalidatePath("/shooting");
  } catch {
    // Payload CLI and other non-Next callers have no static generation store.
  }
}

const attachBlurDataURL: CollectionBeforeChangeHook = async ({ data, req }) => {
  const uploadSizes = (
    req as typeof req & { payloadUploadSizes?: Record<string, Buffer> }
  ).payloadUploadSizes;
  const input =
    uploadSizes?.[CARD_SIZE] ??
    req.file?.tempFilePath ??
    (req.file?.data?.length ? req.file.data : undefined);

  if (!input) return data;

  try {
    const buffer = await sharp(input)
      .rotate()
      .resize(8, 8, { fit: "inside" })
      .webp({ quality: 40 })
      .toBuffer();

    return {
      ...data,
      blurDataURL: `data:image/webp;base64,${buffer.toString("base64")}`,
    };
  } catch (error) {
    req.payload.logger.error(error);
    return data;
  }
};

const revalidateShootingAfterChange: CollectionAfterChangeHook = ({ doc }) => {
  revalidateShooting();
  return doc;
};

const revalidateShootingAfterDelete: CollectionAfterDeleteHook = ({ doc }) => {
  revalidateShooting();
  return doc;
};

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
      {
        name: CARD_SIZE,
        width: 1400,
        fit: "inside",
        withoutEnlargement: true,
        formatOptions: {
          format: "webp",
          options: { quality: 80 },
        },
      },
    ],
  },
  hooks: {
    beforeChange: [attachBlurDataURL],
    afterChange: [revalidateShootingAfterChange],
    afterDelete: [revalidateShootingAfterDelete],
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
    {
      name: "blurDataURL",
      type: "text",
      admin: {
        hidden: true,
      },
    },
  ],
};
