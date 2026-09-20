import { pgTable, boolean, text, index, timestamp } from 'drizzle-orm/pg-core';

export const todoDrizzleEntity = pgTable(
  'todo_entity',
  {
    id: text('id').unique().notNull(),
    title: text('title').notNull(),
    completed: boolean('completed').notNull(),
    createdAt: timestamp('createdAt', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updatedAt', { withTimezone: true, mode: 'string' }).defaultNow(),
    isDeleted: boolean('isDeleted').notNull().default(false),
  },
  (table) => [index('todo_id').on(table.id)]
);
