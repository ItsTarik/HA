import { eq } from 'drizzle-orm';
import type { DrizzleDb } from '../../../../db/drizzle/drizzle.plugin.ts';
import type { TodosRepository } from '../../application/ports/todosRepository.port.ts';
import type { Todo, TodoState } from '../../domain/todo.model.ts';
import { todoDrizzleEntity } from '../../domain/todo.schema.ts';

export class TodosDrizzleRepositoryAdapter implements TodosRepository {
  drizzleDb: DrizzleDb;
  constructor(db: DrizzleDb) {
    this.drizzleDb = db;
  }
  async create(todo: TodoState) {
    const [created] = await this.drizzleDb.insert(todoDrizzleEntity).values(todo).returning();
    return created;
  }
  getAll() {
    return this.drizzleDb.select().from(todoDrizzleEntity);
  }
  async getById(id: TodoState['id']) {
    const [stateOrUndefined] = await this.drizzleDb
      .select()
      .from(todoDrizzleEntity)
      .where(eq(todoDrizzleEntity.id, id));
    return stateOrUndefined;
  }
  async isExisting(title: Todo['title']) {
    const res = await this.drizzleDb
      .select()
      .from(todoDrizzleEntity)
      .where(eq(todoDrizzleEntity.title, title));

    return res.length > 0;
  }
}
