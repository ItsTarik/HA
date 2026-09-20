import { InMemoryRepository } from '../../../support/test-utils/inMemoryRepository.ts';
import type { Todo, TodoState } from '../../domain/todo.model.ts';

export class TodosInMemoryRepositoryAdapter extends InMemoryRepository<TodoState> {
  isExisting(title: Todo['title']) {
    return Promise.resolve(this.data.some((d) => d.title === title));
  }
}
