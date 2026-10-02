import { revalidatePath } from "next/cache";
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  CollectionConfig,
  TextFieldSingleValidation,
} from "payload";

function revalidateProjects() {
  try {
    revalidatePath("/projects");
  } catch {
    // Payload CLI and other non-Next callers have no static generation store.
  }
}

const revalidateProjectsAfterChange: CollectionAfterChangeHook = ({ doc }) => {
  revalidateProjects();
  return doc;
};

const revalidateProjectsAfterDelete: CollectionAfterDeleteHook = ({ doc }) => {
  revalidateProjects();
  return doc;
};

const validateUrl: TextFieldSingleValidation = (value) => {
  if (typeof value !== "string" || value.length === 0) {
    return "Enter a URL.";
  }

  try {
    const url = new URL(value);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return "Use an http or https URL.";
    }
  } catch {
    return "Enter a valid URL.";
  }

  return true;
};

export const Projects: CollectionConfig = {
  slug: "projects",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "url", "updatedAt"],
  },
  hooks: {
    afterChange: [revalidateProjectsAfterChange],
    afterDelete: [revalidateProjectsAfterDelete],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "url",
      type: "text",
      label: "URL",
      required: true,
      validate: validateUrl,
    },
  ],
};
