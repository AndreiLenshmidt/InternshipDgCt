import { TaskSingle, TaskType } from '@/api/data.types';

type TaskSingleAPI = {
   task_type: number;
};

export const mapTaskType = (taskTypeId: number): TaskType | undefined => {
   return taskTypes.find((type) => type.id === taskTypeId) || { id: taskTypeId, name: 'Unknown Type' };
};

export const transformTaskSingle = (apiData: TaskSingleAPI): TaskSingle => {
   return {
      ...apiData,
      task_type: mapTaskType(apiData.task_type),
   };
};
