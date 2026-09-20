console.log('todo');
import Fastify from 'fastify';
import { TodosHttpAdapter } from './modules/todo/adapters/http/todosHttp.adapter.ts';

const fastify = Fastify({ logger: true });

fastify.register(TodosHttpAdapter);

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  // Server is now listening on ${address}
});
