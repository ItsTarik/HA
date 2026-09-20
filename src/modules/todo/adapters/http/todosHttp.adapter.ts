import type { FastifyInstance } from 'fastify';
import {
  createTodoUC,
  type CreateTodoDTO,
} from '../../application/use-cases/createTodo/createTodo.uc.ts';
import { randomUUID } from 'node:crypto';
import { getTodosUC } from '../../application/use-cases/getTodos/getTodos.uc.ts';
import { TodosDrizzleRepositoryAdapter } from '../persistence/todosDrizzleRepositoryAdapter.ts';

export const TodosHttpAdapter = (fastify: FastifyInstance) => {
  fastify.post<{ Body: Omit<CreateTodoDTO, 'id'> }>('/todos', async (request, reply) => {
    fastify.db;
    const drizzleTodosRepositoryAdapter = new TodosDrizzleRepositoryAdapter(fastify.db);
    const created = await createTodoUC(drizzleTodosRepositoryAdapter, {
      id: randomUUID(),
      title: request.body.title,
    });

    if (created instanceof Error) {
      return reply.status(400).send({
        error: created.message,
      });
    }

    return reply.status(201).send(created);
  });

  fastify.get('/todos', async (request, reply) => {
    const drizzleTodosRepositoryAdapter = new TodosDrizzleRepositoryAdapter(fastify.db);

    const todos = await getTodosUC(drizzleTodosRepositoryAdapter);
    return reply.status(200).send(todos);
  });
};
