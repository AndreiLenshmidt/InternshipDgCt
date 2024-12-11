import { FormData } from '@/api/data.types';

export const transformToServerData = (formData: FormData) => {
   const selectedIds = formData.selectedOptionsCheckbox?.map((option) => option.id) || [];

   return {
      name: formData.name || '', // Название задачи (обязательно)
      description: formData.description || '', // Описание задачи
      stage_id: formData.stage_id || 2, // ID стадии (обязательно) приоритет ??? !!!
      task_type_id: formData.selectedOptionTasks?.id || 0, // ID типа задачи (обязательно)
      component_id: formData.selectedOptionComp?.id || 0, // ID компонента задачи (обязательно)
      priority_id: formData.selectedOptionPriority?.id || 0, // ID приоритета задачи (обязательно)
      block_id: formData.block_id || 0, // ID задачи, которая блокирует текущую (по умолчанию 0)

      // epic_id: formData?.epic_id ?? 0, //  ID эпика
      // release_id: formData.release_id || null, //  ID релиза, к которому привязана задача

      related_id: formData.related_id || 0, // ID связанной задачи
      estimate_cost: formData.estimate_cost || 0, // Оценка стоимости задачи
      estimate_worker: formData.estimateMinutes || 0, // Оценка времени для работы
      layout_link: formData.layoutLink || '', // Ссылка на макет
      markup_link: formData.markupLink || '', // Ссылка на вёрстку
      dev_link: formData.devLink || '', // Ссылка на сборку
      executors: selectedIds.length > 0 ? selectedIds : [0], // Исполнители задачи
      begin: formData.date?.startDate || '', // Дата начала работы
      end: formData.date?.endDate || '', // Дата окончания работы
   };
};
