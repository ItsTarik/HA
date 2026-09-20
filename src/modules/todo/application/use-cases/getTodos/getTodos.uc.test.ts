import test from 'node:test';
import { TodosInMemoryRepositoryAdapter } from '../../../adapters/persistence/todosInMemoryRepositoryAdapter.ts';
import { strictEqual } from 'node:assert';

test('getAll todos should be empty', async () => {
  const todosInMemoryRepository = new TodosInMemoryRepositoryAdapter();
  const todos = await todosInMemoryRepository.getAll();
  strictEqual(todos.length, 0);
});
