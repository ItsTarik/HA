import type { Todo } from '../../domain/todo.model.ts';
import type { Repository } from '../../../support/repository.ts';

export interface TodosRepository extends Repository<Todo> {
  create: (todo: Todo) => Promise<Todo>;
  getAll: () => Promise<Todo[]>;
  getById: (id: Todo['id']) => Promise<Todo | undefined>;
}
