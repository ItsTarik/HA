import { type Id } from './id.ts';

export interface Repository<T extends { id: Id }> {
  create: (item: T) => Promise<T>;
  getAll: () => Promise<T[]>;
  getById: (id: T['id']) => Promise<T | undefined>;
}
