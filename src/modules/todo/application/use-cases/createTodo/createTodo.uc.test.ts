import { describe, it } from 'node:test';
import { strictEqual } from 'node:assert';
import { Todo } from '../../../domain/todo.model.ts';
import { randomUUID } from 'node:crypto';
import { createTodoUC, type CreateTodoDTO } from './createTodo.uc.ts';
import {
  TODO_PARSING_ERROR,
  TodoDtoParsingError,
  TodoExistError,
} from '../../../domain/todo.errors.ts';
import { TodosInMemoryRepositoryAdapter } from '../../../adapters/persistence/todosInMemoryRepositoryAdapter.ts';

describe('Create todo UC', () => {
  it('should create a new todo', async () => {
    const id = randomUUID();
    const createTodoDto = {
      id,
      title: 'new todo',
    };
    const todosInMemoryRepository = new TodosInMemoryRepositoryAdapter();
    await createTodoUC(todosInMemoryRepository, createTodoDto);
    const createdTodo = await todosInMemoryRepository.getById(id);
    strictEqual(createTodoDto.id, createdTodo?.id);
  });

  it('should fail when the todo title exist', async () => {
    const id = randomUUID();
    const createTodoDto = {
      id,
      title: 'new todo',
    };
    const todosInMemoryRepository = new TodosInMemoryRepositoryAdapter([
      new Todo(createTodoDto).getSnapshot(),
    ]);
    const createdTodo = await createTodoUC(todosInMemoryRepository, createTodoDto);
    strictEqual(createdTodo instanceof TodoExistError, true);
  });

  it('should fail when the id in dto is bad', async () => {
    const id = 1;
    const createTodoDto = {
      id,
      title: 'new todo',
    };
    const todosInMemoryRepository = new TodosInMemoryRepositoryAdapter();
    const createdTodoOrError = await createTodoUC(
      todosInMemoryRepository,
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
    const todosInMemoryRepository = new TodosInMemoryRepositoryAdapter();
    const createdTodoOrError = await createTodoUC(
      todosInMemoryRepository,
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
    const todosInMemoryRepository = new TodosInMemoryRepositoryAdapter();
    const createdTodoOrError = await createTodoUC(
      todosInMemoryRepository,
      createTodoDto as unknown as CreateTodoDTO
    );
    strictEqual(createdTodoOrError instanceof TodoDtoParsingError, true);
    strictEqual(
      (createdTodoOrError as TodoDtoParsingError)?.message,
      TODO_PARSING_ERROR.TITLE_IS_TOO_SHORT_MSG
    );
  });
});
