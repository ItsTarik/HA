import { describe, it } from 'node:test';
import { strictEqual } from 'node:assert';
import { Todo, type TodoSnapshot } from '../../domain/todo.model.ts';
import { randomUUID } from 'node:crypto';
import { createTodoUC, type CreateTodoDTO } from './create-todo.uc.ts';
import { InMemoryRepository } from '../../../support/test-utils/inMemoryRepository.ts';
import {
  TODO_PARSING_ERROR,
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
    const todosRepository = new InMemoryRepository<TodoSnapshot>();
    await createTodoUC(todosRepository, createTodoDto);
    const createdTodo = await todosRepository.getById(id);
    strictEqual(createTodoDto.id, createdTodo?.id);
  });

  it('should fail when the todo title exist', async () => {
    const id = randomUUID();
    const createTodoDto = {
      id,
      title: 'new todo',
    };
    const todosRepository = new InMemoryRepository<TodoSnapshot>([
      new Todo(createTodoDto).getSnapshot(),
    ]);
    const createdTodo = await createTodoUC(todosRepository, createTodoDto);
    strictEqual(createdTodo instanceof TodoExistError, true);
  });

  it('should fail when the id in dto is bad', async () => {
    const id = 1;
    const createTodoDto = {
      id,
      title: 'new todo',
    };
    const todosRepository = new InMemoryRepository<TodoSnapshot>();
    const createdTodoOrError = await createTodoUC(
      todosRepository,
      createTodoDto as unknown as CreateTodoDTO
    );
    strictEqual(createdTodoOrError instanceof TodoDtoParsingError, true);
    strictEqual(
      (createdTodoOrError as TodoDtoParsingError)?.message,
      TODO_PARSING_ERROR.ID_IS_NOT_VALID_MSG
    );
  });

  it('should fail when the title in dto is bad', async () => {
    const id = randomUUID();
    const createTodoDto = {
      id,
      title: null,
    };
    const todosRepository = new InMemoryRepository<TodoSnapshot>();
    const createdTodoOrError = await createTodoUC(
      todosRepository,
      createTodoDto as unknown as CreateTodoDTO
    );
    strictEqual(createdTodoOrError instanceof TodoDtoParsingError, true);
    strictEqual(
      (createdTodoOrError as TodoDtoParsingError)?.message,
      TODO_PARSING_ERROR.TITLE_IS_NOT_VALID_MSG
    );
  });

  it('should fail when the title in dto is too short', async () => {
    const id = randomUUID();
    const createTodoDto = {
      id,
      title: 't',
    };
    const todosRepository = new InMemoryRepository<TodoSnapshot>();
    const createdTodoOrError = await createTodoUC(
      todosRepository,
      createTodoDto as unknown as CreateTodoDTO
    );
    strictEqual(createdTodoOrError instanceof TodoDtoParsingError, true);
    strictEqual(
      (createdTodoOrError as TodoDtoParsingError)?.message,
      TODO_PARSING_ERROR.TITLE_IS_TOO_SHORT_MSG
    );
  });
});
