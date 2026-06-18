import "dotenv/config";
// import { Pool } from 'pg';
// import { drizzle } from 'drizzle-orm/node-postgres';
import { gmail } from "@corsair-dev/gmail";
import { googlecalendar } from "@corsair-dev/googlecalendar";
import { conn } from "./db/index";
import { createCorsair } from "corsair";

// const pool = new Pool({ connectionString: process.env.DATABASE_URL });
// const db = drizzle(pool); // your app tables

export const corsair = createCorsair({
  plugins: [
    gmail({ authType: "oauth_2" }),
    googlecalendar({ authType: "oauth_2" }),
  ],
  database: conn,
  kek: process.env.CORSAIR_KEK!,
  multiTenancy: true,
});
