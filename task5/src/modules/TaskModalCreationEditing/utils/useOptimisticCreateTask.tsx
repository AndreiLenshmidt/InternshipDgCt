import { TaskSingle } from '@/api/data.types';
import { taskApiActions, useCreateTaskMutation } from '../api/taskApiActions';

// Оптимистичное создание задачи (POST)
export const useOptimisticCreateTask = () => {
   const [createTask, { isLoading, isSuccess, error }] = taskApiActions.useCreateTaskMutation();
   const { updateQueryData } = taskApiActions.util;

   const handleCreate = async (slug: string, newTask: TaskSingle) => {
      try {
         // Оптимистично добавляем новую задачу в кэш
         updateQueryData('getTasks', slug, (task) => {
            task.push({ ...newTask, id: Math.random() * -1000 }); // Временный ID
         });

         await createTask(newTask).unwrap();
      } catch (err) {
         console.error('Error creating task:', err);
      }
   };

   return handleCreate;
};

// Использование
// const handleCreate = useOptimisticCreateTask();
// const [taskName, setTaskName] = useState('');

// const handleSubmit = () => {
//    handleCreate(slug,{ name: taskName, description: 'Temporary description' TaskSingle  });
// };

//  <input
//     type="text"
//     value={taskName}
//     onChange={(e) => setTaskName(e.target.value)}
// />
// <button onClick={handleSubmit}>Create Task</button>
