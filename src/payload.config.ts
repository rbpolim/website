import path from "path";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Photos } from "./collections/Photos";
import { Users } from "./collections/Users";

const srcDir = path.resolve(process.cwd(), "src");

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: srcDir,
    },
  },
  collections: [Users, Photos],
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(srcDir, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
  }),
  plugins: [
    vercelBlobStorage({
      collections: {
        photos: {
          disablePayloadAccessControl: true,
        },
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
      clientUploads: true,
    }),
  ],
  sharp,
});
