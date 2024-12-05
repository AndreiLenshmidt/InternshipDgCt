import { useCreateTaskMutation } from '@/modules/TaskModalCreationEditing/api/taskApiActions.ts';
import { TaskSingle } from '@/api/data.types.ts';

// Хук для создания задачи
export const useCreateTaskMain = () => {
   const [createTask, { isLoading, isSuccess, error }] = useCreateTaskMutation();

   const createTaskMain = async (slug: string, body: Partial<TaskSingle>) => {
      try {
         const response = await createTask({ slug, body }).unwrap(); // Unwrap выбрасывает ошибку, если запрос не удался
         console.log('Задача успешно создана:', response);
         return response;
      } catch (e) {
         console.error('Не удалось создать задачу:', e);
         throw e; // Бросаем ошибку дальше
      }
   };

   return { createTaskMain, isLoading, isSuccess, error };
};
