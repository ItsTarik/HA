import { defineConfig } from 'drizzle-kit';
console.log('process.env.DB_URL', process.env.DB_URL);
export default defineConfig({
  schema: ['./src/modules/todo/domain/todo.schema.ts'],
  out: './src/db',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DB_URL as string,
  },
  verbose: true,
  strict: false,
});
