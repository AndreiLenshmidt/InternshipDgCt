import { TaskSingle, TaskType } from '@/api/data.types';

export const taskTypeVar = ['Баг', 'Задача', 'Улучшение', 'Новая функциональность', 'Эпик', 'Релиз', 'Бэклог'];

type TaskSingleAPI = {
   task_type: number;
};

export const taskTypes: TaskType[] = [
   { id: 1, name: 'Баг' },
   { id: 2, name: 'Задача' },
   { id: 3, name: 'Улучшение' },
   { id: 4, name: 'Новая функциональность' },
   { id: 5, name: 'Эпик' },
   { id: 6, name: 'Релиз' },
   { id: 7, name: 'Бэклог' },
];

export const mapTaskType = (taskTypeId: number): TaskType | undefined => {
   return taskTypes.find((type) => type.id === taskTypeId) || { id: taskTypeId, name: 'Unknown Type' };
};

export const transformTaskSingle = (apiData: TaskSingleAPI): TaskSingle => {
   return {
      ...apiData,
      task_type: mapTaskType(apiData.task_type),
   };
};
