import { useUpdateTaskMutation } from '@/modules/TaskModalCreationEditing/api/taskApiActions.ts';

export const useUpdateTaskMain = () => {
   const [updateTask, { isLoading, isSuccess, error }] = useUpdateTaskMutation();

   const updateTaskMain = async (id: number, body: Partial<TaskSingle>) => {
      try {
         const response = await updateTask({ id, body }).unwrap();
         console.log('Задача успешно обновлена:', response);
         return response;
      } catch (e) {
         console.error('Не удалось обновить задачу:', e);
         throw e;
      }
   };

   return { updateTaskMain, isLoading, isSuccess, error };
};
