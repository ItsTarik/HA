import type { Id } from '../../support/id.ts';

export class Todo {
  id: Id;
  title: string;
  completed: boolean = false;
  createdAt: string;
  updatedAt: string | null = null;
  isDeleted: boolean = false;

  createNew(id: string, title: string) {
    this.id = id;
    this.title = title;
    this.createdAt = new Date().toISOString();
  }
}
