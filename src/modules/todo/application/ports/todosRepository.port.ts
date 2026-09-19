import type { Todo, TodoSnapshot } from '../../domain/todo.model.ts';
import type { Repository } from '../../../support/repository.ts';

export interface TodosRepository extends Repository<TodoSnapshot> {
  create: (todo: TodoSnapshot) => Promise<TodoSnapshot>;
  getAll: () => Promise<TodoSnapshot[]>;
  getById: (id: Todo['id']) => Promise<TodoSnapshot | undefined>;
}
