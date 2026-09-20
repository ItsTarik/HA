import type { FastifyInstance } from 'fastify';
import { TodosInMemoryRepositoryAdapter } from '../persistence/todosInMemoryRepositoryAdapter.ts';
import {
  createTodoUC,
  type CreateTodoDTO,
} from '../../application/use-cases/createTodo/createTodo.uc.ts';
import { randomUUID } from 'node:crypto';
import { getTodosUC } from '../../application/use-cases/getTodos/getTodos.uc.ts';

const inMemoryTodosRepositoryAdapter = new TodosInMemoryRepositoryAdapter();

export const TodosHttpAdapter = (fastify: FastifyInstance) => {
  fastify.post<{ Body: Omit<CreateTodoDTO, 'id'> }>('/todos', async (request, reply) => {
    const created = await createTodoUC(inMemoryTodosRepositoryAdapter, {
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
    const todos = await getTodosUC(inMemoryTodosRepositoryAdapter);
    return reply.status(200).send(todos);
  });
};
