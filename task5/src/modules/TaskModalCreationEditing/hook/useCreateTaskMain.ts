import { taskApiActions, useCreateTaskMutation } from '@/modules/TaskModalCreationEditing/api/taskApiActions';
import { TaskSingle } from '@/api/data.types';

// Хук для создания задачи
export const useCreateTaskMain = () => {
   const [createTask, { isLoading, isSuccess, error }] = useCreateTaskMutation();
   const { updateQueryData } = taskApiActions.util;

   const createTaskMain = async (slug: string, newTask: Partial<TaskSingle>) => {
      try {
         // Оптимистично добавляем новую задачу в кэш
         updateQueryData('getTasks', slug, (draftTasks: TaskSingle[]) => {
            draftTasks.push({
               ...newTask,
               id: Math.random() * -1000, // Временный ID
            });
         });

         // Отправка задачи на сервер
         const response = await createTask(newTask).unwrap();

         // Если запрос успешен, заменяем временный ID на реальный
         updateQueryData('getTasks', slug, (draftTasks: TaskSingle[]) => {
            const index = draftTasks.findIndex((task) => task.id < 0);

            if (index !== -1) {
               draftTasks[index] = response;
            }
         });

         return response;
      } catch (err) {
         console.error('Ошибка создания задачи:', err);

         // Убираем временную задачу из кэша в случае ошибки
         updateQueryData('getTasks', slug, (draftTasks: TaskSingle[]) => {
            return draftTasks.filter((task) => task.id >= 0);
         });

         throw err;
      }
   };

   //    const createTaskMain = async (slug: string, body: Partial<TaskSingle>) => {
   //       try {
   //          const response = await createTask({ slug, body }).unwrap(); // Unwrap выбрасывает ошибку, если запрос не удался
   //          console.log('Задача успешно создана:', response);
   //          return response;
   //       } catch (e) {
   //          console.error('Не удалось создать задачу:', e);
   //          throw e; // Бросаем ошибку дальше
   //       }
   //    };

   return { createTaskMain, isLoading, isSuccess, error };
};
