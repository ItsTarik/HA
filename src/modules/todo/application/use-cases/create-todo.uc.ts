import { TodoExistError } from '../../domain/todo.errors.ts';
import { Todo } from '../../domain/todo.model.ts';
import type { TodosRepository } from '../ports/todosRepository.port.ts';
import * as z from 'zod/v4';

const createTodoDTO = z.object({
  id: z.string(),
  title: z.string(),
});

export type CreateTodoDTO = z.infer<typeof createTodoDTO>;

export const createTodoUC = async (todosRepository: TodosRepository, todoDto: CreateTodoDTO) => {
  if (!createTodoDTO.validate(todoDto)) {
    return Error('Invalid todo dto');
  }
  const newTodo = new Todo();
  newTodo.createNew(todoDto.id, todoDto.title);
  const todos = await todosRepository.getAll();
  const existing = todos.find((t) => t.title === newTodo.title);
  if (existing) {
    return new TodoExistError();
  }
  return todosRepository.create(newTodo);
};
