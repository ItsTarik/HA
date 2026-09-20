import { InMemoryRepository } from '../../../support/test-utils/inMemoryRepository.ts';
import type { TodoState } from '../../domain/todo.model.ts';

export class TodosInMemoryRepositoryAdapter extends InMemoryRepository<TodoState> {}
