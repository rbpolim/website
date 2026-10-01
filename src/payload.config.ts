import path from "path";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
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
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || "file:./payload.db",
    },
    busyTimeout: 10000,
    wal: true,
  }),
  sharp,
});
