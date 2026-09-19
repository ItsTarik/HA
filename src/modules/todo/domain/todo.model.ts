import type { Id } from '../../support/id.ts';
import type { CreateTodoDTO } from '../application/use-cases/create-todo.uc.ts';

export type TodoSnapshot = {
  id: Id;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string | null;
  isDeleted: boolean;
};

export class Todo {
  id: Id;
  title: string;
  completed: boolean = false;
  createdAt: string;
  updatedAt: string | null = null;
  isDeleted: boolean = false;

  constructor(newTodo: CreateTodoDTO) {
    this.id = newTodo.id;
    this.title = newTodo.title;
    this.createdAt = new Date().toISOString();
  }

  getSnapshot(): TodoSnapshot {
    return {
      id: this.id,
      title: this.title,
      completed: this.completed,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      isDeleted: this.isDeleted,
    };
  }
}
