import { describe, it } from 'node:test';
import { strictEqual } from 'node:assert';
import { Todo, type TodoSnapshot } from '../../domain/todo.model.ts';
import { randomUUID } from 'node:crypto';
import { createTodoUC, type CreateTodoDTO } from './create-todo.uc.ts';
import { InMemoryRepository } from '../../../support/test-utils/inMemoryRepository.ts';
import {
  ID_IS_NOT_VALID_MSG,
  TITLE_IS_NOT_VALID_MSG,
  TITLE_IS_TOO_SHORT_MSG,
  TodoDtoParsingError,
  TodoExistError,
} from '../../domain/todo.errors.ts';

describe('Create todo UC', () => {
  it('should create a new todo', async () => {
    const id = randomUUID();
    const createTodoDto = {
      id,
      title: 'new todo',
    };
    const todoesRepository = new InMemoryRepository<TodoSnapshot>();
    await createTodoUC(todoesRepository, createTodoDto);
    const createdTodo = await todoesRepository.getById(id);
    strictEqual(createTodoDto.id, createdTodo?.id);
  });

  it('should fail when the todo title exist', async () => {
    const id = randomUUID();
    const createTodoDto = {
      id,
      title: 'new todo',
    };
    const todoesRepository = new InMemoryRepository<TodoSnapshot>([
      new Todo(createTodoDto).getSnapshot(),
    ]);
    const createdTodo = await createTodoUC(todoesRepository, createTodoDto);
    strictEqual(createdTodo instanceof TodoExistError, true);
  });

  it('should fail when the id in dto is bad', async () => {
    const id = 1;
    const createTodoDto = {
      id,
      title: 'new todo',
    };
    const todoesRepository = new InMemoryRepository<TodoSnapshot>();
    const createdTodoOrError = await createTodoUC(
      todoesRepository,
      createTodoDto as unknown as CreateTodoDTO
    );
    strictEqual(createdTodoOrError instanceof TodoDtoParsingError, true);
    strictEqual((createdTodoOrError as TodoDtoParsingError)?.message, ID_IS_NOT_VALID_MSG);
  });

  it('should fail when the title in dto is bad', async () => {
    const id = randomUUID();
    const createTodoDto = {
      id,
      title: null,
    };
    const todoesRepository = new InMemoryRepository<TodoSnapshot>();
    const createdTodoOrError = await createTodoUC(
      todoesRepository,
      createTodoDto as unknown as CreateTodoDTO
    );
    strictEqual(createdTodoOrError instanceof TodoDtoParsingError, true);
    strictEqual((createdTodoOrError as TodoDtoParsingError)?.message, TITLE_IS_NOT_VALID_MSG);
  });

  it('should fail when the title in dto is too short', async () => {
    const id = randomUUID();
    const createTodoDto = {
      id,
      title: 't',
    };
    const todoesRepository = new InMemoryRepository<TodoSnapshot>();
    const createdTodoOrError = await createTodoUC(
      todoesRepository,
      createTodoDto as unknown as CreateTodoDTO
    );
    strictEqual(createdTodoOrError instanceof TodoDtoParsingError, true);
    strictEqual((createdTodoOrError as TodoDtoParsingError)?.message, TITLE_IS_TOO_SHORT_MSG);
  });
});
