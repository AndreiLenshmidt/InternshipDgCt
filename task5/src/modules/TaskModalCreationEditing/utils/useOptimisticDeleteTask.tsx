import { taskApiActions } from '../api/taskApiActions';

// Оптимистичное удаление задачи (DELETE)
export const useOptimisticDeleteTask = () => {
   const [deleteTask] = taskApiActions.useDeleteTaskMutation();
   const { updateQueryData } = taskApiActions.util;

   const handleDelete = async (slug: string, taskId: number) => {
      try {
         // Оптимистично удаляем задачу из кэша
         updateQueryData('getTasks', slug, (draft) => {
            return draft.filter((task) => task.id !== taskId); // Удаляем задачу
         });

         await deleteTask(taskId).unwrap();
      } catch (err) {
         console.error('Error deleting task:', err);
      }
   };

   return handleDelete;
};

// Использование
//  const tasks = useGetTasksQuery();
//  const handleDelete = useOptimisticDeleteTask();
//  <button onClick={() => handleDelete(slug,task.id)}>Delete</button>;
