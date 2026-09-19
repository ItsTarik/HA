import { describe, it } from 'node:test';
import { strictEqual } from 'node:assert';
import { Todo } from '../../domain/todo.model.ts';
import { randomUUID } from 'node:crypto';
import { createTodoUC, type CreateTodoDTO } from './create-todo.uc.ts';
import { InMemoryRepository } from '../../../support/test-utils/inMemoryRepository.ts';
import { TodoExistError } from '../../domain/todo.errors.ts';

describe('Create todo UC', () => {
  it('should create a new todo', async () => {
    const id = randomUUID();
    const createTodoDto = {
      id,
      title: 'new todo',
    };
    const todoesRepository = new InMemoryRepository<Todo>();
    await createTodoUC(todoesRepository, createTodoDto);
    const createdTodo = await todoesRepository.getById(id);
    strictEqual(createTodoDto.id, createdTodo?.id);
  });

  it('should fail when the todo title exist', async () => {
    const id = randomUUID();
    const newTodo = new Todo();
    const createTodoDto = {
      id,
      title: 'new todo',
    };
    newTodo.createNew(createTodoDto.id, createTodoDto.title);
    const todoesRepository = new InMemoryRepository<Todo>([newTodo]);
    const createdTodo = await createTodoUC(todoesRepository, newTodo);
    strictEqual(createdTodo instanceof TodoExistError, true);
  });

  it('should fail when the dto is bad', async () => {
    const id = 1;
    const createTodoDto = {
      id,
      title: 'new todo',
    };
    const todoesRepository = new InMemoryRepository<Todo>();
    const createdTodo = await createTodoUC(
      todoesRepository,
      createTodoDto as unknown as CreateTodoDTO
    );
    strictEqual(createdTodo instanceof Error, true);
  });
});
