import fp from 'fastify-plugin';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

export type DrizzleDb = ReturnType<typeof drizzle>;

export const FastifyDrizzlePluging = fp(async (fastify) => {
  const pool = new Pool({
    connectionString: process.env.DB_URL,
  });

  const db = drizzle({ client: pool });

  fastify.decorate('db', db);

  fastify.addHook('onClose', async () => {
    await pool.end();
  });
});
