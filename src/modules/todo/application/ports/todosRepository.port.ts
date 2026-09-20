import type { Todo, TodoState } from '../../domain/todo.model.ts';
import type { Repository } from '../../../support/repository.ts';

export interface TodosRepository extends Repository<TodoState> {
  create: (todo: TodoState) => Promise<TodoState>;
  getAll: () => Promise<TodoState[]>;
  getById: (id: Todo['id']) => Promise<TodoState | undefined>;
  isExisting: (title: Todo['title']) => Promise<boolean>;
}
