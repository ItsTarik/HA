import {
  TODO_PARSING_ERROR,
  TodoDtoParsingError,
  TodoExistError,
  type TodoParingErrorMsgType,
} from '../../domain/todo.errors.ts';
import { Todo } from '../../domain/todo.model.ts';
import type { TodosRepository } from '../ports/todosRepository.port.ts';
import * as z from 'zod/v4';

const createTodoDTO = z.object({
  id: z.string({ error: TODO_PARSING_ERROR.ID_IS_NOT_VALID_MSG }),
  title: z
    .string({ error: TODO_PARSING_ERROR.TITLE_IS_NOT_VALID_MSG })
    .min(2, { message: TODO_PARSING_ERROR.TITLE_IS_TOO_SHORT_MSG }),
});

export type CreateTodoDTO = z.infer<typeof createTodoDTO>;

export const createTodoUC = async (todosRepository: TodosRepository, todoDto: CreateTodoDTO) => {
  let parsed = createTodoDTO.safeParse(todoDto);
  if (parsed.error) {
    return new TodoDtoParsingError(parsed.error.issues[0].message as TodoParingErrorMsgType);
  }
  const newTodo = new Todo(todoDto);
  const todos = await todosRepository.getAll();
  const existing = todos.find((t) => t.title === newTodo.title);
  if (existing) {
    return new TodoExistError();
  }
  return todosRepository.create(newTodo);
};
