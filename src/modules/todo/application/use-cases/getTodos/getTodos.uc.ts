import type { TodosRepository } from '../../ports/todosRepository.port.ts';

export const getTodosUC = async (todosRepository: TodosRepository) => {
  return todosRepository.getAll();
};
