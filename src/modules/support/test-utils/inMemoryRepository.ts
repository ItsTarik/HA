import type { Id } from '../id.ts';
import type { Repository } from '../repository.ts';

export class InMemoryRepository<T extends { id: Id }> implements Repository<T> {
  data: T[] = [];
  constructor(initialData?: T[]) {
    if (initialData) {
      this.data = initialData;
    }
  }
  create(newItem: T) {
    this.data.push(newItem);
    return Promise.resolve(newItem);
  }
  getAll() {
    return Promise.resolve(this.data);
  }
  getById(id: T['id']) {
    return Promise.resolve(this.data.find((d) => d.id === id));
  }
}
