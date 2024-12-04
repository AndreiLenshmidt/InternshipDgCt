import { TaskSingle } from '@/api/data.types';
import { taskApiActions } from '../api/taskApiActions';

//Оптимистичное обновление задачи (PATCH)
export const useOptimisticUpdateTask = () => {
   const [updateTask] = taskApiActions.useUpdateTaskMutation();
   const { updateQueryData } = taskApiActions.util;

   const handleUpdate = async (slug: string, taskId: number, updatedFields: TaskSingle) => {
      try {
         // Оптимистично обновляем данные задачи в кэше
         updateQueryData('getTasks', slug, (draft) => {
            const taskIndex = draft.findIndex((task) => task.id === taskId);
            if (taskIndex !== -1) {
               draft.splice(taskIndex, 1); // Удаление задачи
            }
         });

         await updateTask({ id: taskId, body: updatedFields }).unwrap();
      } catch (err) {
         console.error('Error updating task:', err);
      }
   };

   return handleUpdate;
};

// Использование
// const handleUpdate = useOptimisticUpdateTask();
//    const [taskName, setTaskName] = useState('');

//    const handleSave = () => {
//       handleUpdate(slug, taskId, { name: taskName... TaskSingle  });
//    };

//  <input
//     type="text"
//     value={taskName}
//     onChange={(e) => setTaskName(e.target.value)}
// />
// <button onClick={handleSave}>Save</button>
