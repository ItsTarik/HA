import fp from 'fastify-plugin';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

export type DrizzleDb = ReturnType<typeof drizzle>;

export const FastifyDrizzlePluging = fp(async (fastify) => {
  const pool = new Pool({
    connectionString: process.env.DB_URL,
  });

  try {
    const db = drizzle({ client: pool });

    fastify.decorate('db', db);

    fastify.log.info('Database connected successfully');

    fastify.addHook('onClose', async () => {
      await pool.end();
    });
  } catch (error) {
    fastify.log.error(error, 'Database connection failed', error);
    await pool.end();
    throw error;
  }
});
