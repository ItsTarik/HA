import type { DrizzleDb } from '../db/drizzle/drizzle.plugin.ts';

declare module 'fastify' {
  interface FastifyInstance {
    db: DrizzleDb;
  }
}
