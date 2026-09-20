import 'dotenv/config';
import Fastify from 'fastify';
import { TodosHttpAdapter } from './modules/todo/adapters/http/todosHttp.adapter.ts';
import { FastifyDrizzlePluging } from './db/drizzle/drizzle.plugin.ts';

const fastify = Fastify({ logger: true });

fastify.register(FastifyDrizzlePluging);

fastify.register(TodosHttpAdapter);

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  // Server is now listening on ${address}
});
