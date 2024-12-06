import React, { useState, useEffect, ChangeEvent, Component } from 'react';
import Close from '@public/icons/close.svg';
import style from '@/modules/TaskModalCreationEditing/task-modal-creation-editing.module.scss';
import ModalClose from '@/components/modal_close/ModalClose';
import SelectCustom from '@/components/select_custom/SelectCustom';
import SelectCustomCheckbox from '@/components/select_custom_checkbox/select-custom-checkbox';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import CalendarCustom from '@/components/calendar_custom/CalendarCustom';
import TextAreaWithToolbar from '@/components/text_area_with_toolbar/TextAreaWithToolbar';
import FileUpload from '@/components/file_upload/FileUpload';
import { useGetProjectsQuery } from '../ProjectsPage/api/api';
import {
   useGetTaskByTaskIdQuery,
   useCreateTaskMutation,
   useGetTasksQuery,
   useGetUsersQuery,
   useGetComponentsQuery,
   useGetPrioritiesQuery,
   useGetTaskTypesQuery,
   // useUpdateTaskMutation,
} from '@/modules/TaskModalCreationEditing/api/taskApiActions';
import { useGetOAuthTokenMutation } from '../AuthPage/api/authApi';
// import { useGetTaskByTaskIdQuery } from '../TaskPage/api/taskApi';
import { useOptimisticDeleteTask } from '@/modules/TaskModalCreationEditing/utils/useOptimisticDeleteTask';
import { useOptimisticCreateTask } from '@/modules/TaskModalCreationEditing/utils/useOptimisticCreateTask';
import { useOptimisticUpdateTask } from '@/modules/TaskModalCreationEditing/utils/useOptimisticUpdateTask';
import { Priority, Stage, TaskSingle, TaskType, User } from '@/api/data.types';
import { mapTaskType } from './utils/transformTaskSingle';
import { typesTasksOptions, compOptions, priorOptions, usersOptions } from '@/modules/TaskModalCreationEditing/variors';
import { File } from '@/api/data.types';
import { useUpdateTaskMain } from '@/modules/TaskModalCreationEditing/hook/useUpdateTaskMain';
import { useCreateTaskMain } from '@/modules/TaskModalCreationEditing/hook/useCreateTaskMain';

import { getCookie } from '@/utils/cookies';
// export interface ExtendedFile {
//    id?: number;
//    original_name?: string;
//    link?: string;
//    created_at: string;
//    updated_at?: string;
// }

// interface TaskCreateRequest {
//    name: string;
//    description?: string | null;
//    stage_id: number;
//    task_type_id: number;
//    component_id?: number;
//    priority_id: number;
//    block_id?: number | null;
//    release_id?: number | null;
//    related_id?: number | null;
//    epic_id?: number | null;
//    estimate_cost?: number | null;
//    estimate_worker?: number | null;
//    layout_link?: string | null;
//    markup_link?: string | null;
//    dev_link?: string | null;
//    executors?: number[];
//    begin?: string;
//    end?: string;
// }

interface TaskModalCreationEditingProps {
   isOpen: boolean;
   onClose: () => void;
   slug: string;
   taskId?: number; // Если передан, значит редактируем задачу
}

interface FormData {
   /** Заголовок задачи */
   name?: string; // title: string;
   stage_id: number;
   component_id: number;
   block_id: number;

   epic_id: number;
   release_id: number;

   /** Тип задачи */
   selectedOptionTasks?: TaskType; // task_type?: TaskType;
   /** Стадий, на которые можно перевести эту задачу */
   selectedOptionComp?: Component; // component?: Component;
   selectedOptionsCheckbox?: User[]; // users?: User[];
   /** Приоритет задачи */
   selectedOptionPriority?: Priority; // priority?: Priority; !!!
   // priority: string; // priority?: Priority;
   // /**
   //  * Оценка разработчика
   //  * @min 0
   //  */
   estimateMinutes?: number; // estimate_worker?: number;
   estimate?: string; // ------------------!!!

   date: {
      //  * Дата начала работ
      //  * @example "2022-11-30T08:48:00.000000Z"
      //  */
      startDate: string; //   date_start?: string;
      //  * Дата окончания работ
      //  * @example "2022-12-31T16:48:00.000000Z"
      //  */
      endDate: string; // end?: string;
   };

   description?: string; // description?: string;
   fileLinks?: File[] | undefined; // files?: File[];  => can_attach_file?: boolean; !!!
   layoutLink?: string; // layout_link?: string | null;
   markupLink?: string; // markup_link?: string | null;
   devLink?: string; // dev_link?: string | null;

   handleSubmit: () => void;
}

export default function TaskModalCreationEditing({ isOpen, onClose, slug, taskId }: TaskModalCreationEditingProps) {
   const [name, setName] = useState('');
   // const [taskType, setTaskType] = useState(taskTypes);
   const [taskData, setTaskData] = useState<TaskSingle>();
   const [selectedOptionTasks, setSelectedOptionTasks] = useState<TaskType | undefined>(undefined);
   const [selectedOptionComp, setSelectedOptionComp] = useState<Component | undefined>(undefined);
   const [selectedPriority, setSelectedPriority] = useState<Priority | undefined>(undefined);
   const [selectedOptionUsers, setSelectedOptionUsers] = useState<User | undefined>(undefined);
   const [selectedOptionsCheckbox, setSelectedOptionsCheckbox] = useState<string[]>([]);

   const [files, setFiles] = useState<File[]>([]);

   // const [component, setComponent] = useState('');

   const [taskTypesOptions, setTaskTypesOptions] = useState<TaskType | undefined>(typesTasksOptions);
   const [componentsOptions, setComponentsOptions] = useState<Component | undefined>(compOptions);
   const [priorityOptions, setPriorityOptions] = useState<Priority | undefined>(priorOptions);

   const [users, setUsersOptions] = useState<User | undefined>(usersOptions);

   const [assignees, setAssignees] = useState<string[]>([]);
   const [estimate, setEstimate] = useState('');
   const [startDate, setStartDate] = useState('');
   const [endDate, setEndDate] = useState('');
   const [description, setDescription] = useState('');
   const [fileLinks, setFileLinks] = useState<string[]>([]);

   const [availableAssignees, setAvailableAssignees] = useState<string[]>([]);
   // const [priorities, setPriorities] = useState([]);

   const isEditMode = Boolean(taskId);

   // const [errors, setErrors] = useState('');
   // const [error, setError] = useState('');

   const [titleSelect, setTitleSelect] = useState('Задача');
   const [itemsOptions, setItemsOptions] = useState([]);

   // const [valueMain, setValueMain] = useState(null);

   const [isTouched, setIsTouched] = useState(false);
   const [isModalOpen, setModalOpen] = useState(false);
   const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

   // !!! ===================================================================================
   // Получаем данные
   const { data: getComponents } = useGetComponentsQuery();
   const { data: getPriorities } = useGetPrioritiesQuery();
   const { data: getTaskTypes } = useGetTaskTypesQuery();
   const { data: getUsers } = useGetUsersQuery('project3');
   const {
      data: tasks = [],
      isLoading: isGetTasksIdLoading,
      isSuccess: tasksIsSuccess,
      error: tasksError,
   } = useGetTasksQuery({ slug: 'project4' });

   // const {
   //    data: tasks = [],
   //    isLoading: isGetTasksIdLoading,
   //    isSuccess: tasksIsSuccess,
   //    error: tasksError,
   // } = useGetTasksQuery({
   //    slug: 'project3',
   //    filters: {},
   // });

   console.log(
      tasks,
      isGetTasksIdLoading,
      tasksIsSuccess,
      tasksError,
      '------------- project3 tasks filter tasks,isGetTasksIdLoading,tasksIsSuccess,tasksError  ----------'
   );

   const { data: projects = [] } = useGetProjectsQuery();
   console.log(projects, '------------- projects ,isLoading----------');

   // const { updateTaskMain, isLoading: isUpdateLoading, error: updateError } = useUpdateTaskMain();
   // const { createTaskMain, isLoading: isCreateLoading, error: createError } = useCreateTaskMain();

   const { data: taskById = [], isLoading: isGetTaskByTaskIdLoading } = useGetTaskByTaskIdQuery(27);
   console.log(taskById, '******** taskById ,isLoading useGetTaskByTaskIdQuery ******');

   // Редактировать (обновить) задачу -------------------------------------------
   const {
      updateTaskMain,
      isLoading: isUpdateLoading,
      isSuccess: updateIsSuccess,
      error: updateError,
   } = useUpdateTaskMain();

   const handleUpdateTask = () => {
      updateTaskMain(8, { date_start: '31.12.2024' });
   };
   // Добавить (создать) задачу -------------------------------------------
   const [createTask, { isLoading: isCreateLoading, isSuccess: createIsSuccess, error: createError }] =
      useCreateTaskMutation();

   const handleCreateTask = async (slugName, taskData) => {
      const taskDataTransform = transformToServerData(taskData);

      try {
         const response = await createTask({ slug: slugName, body: taskDataTransform }).unwrap();
         console.log('Задача успешно создана:', response);
      } catch (err) {
         console.error('Ошибка при создании задачи:', err);
      }
   };

   // Общие состояния
   const isLoading = isUpdateLoading || isCreateLoading; //|| isGetTaskByTaskIdLoading
   const error = updateError || createError;

   // Получаем данные
   useEffect(() => {
      setComponentsOptions(getComponents?.data);
      setPriorityOptions(getPriorities?.data);
      setTaskTypesOptions(getTaskTypes?.data);
      setUsersOptions(getUsers?.data);
   }, [getComponents, getPriorities, getTaskTypes, getUsers]);

   useEffect(() => {
      console.log(tasks, 'tasks-------------++++++++++++++');
      if (tasks) setTaskData(tasks?.data);
   }, [tasks]);

   // !!! ===================================================================================
   // схема валидации Zod  // .min(1, 'Тип задачи обязателен'),
   const formSchema = z.object({
      name: z.string().min(3, 'Ошибка'),
      selectedOptionTasks: z
         .object({
            id: z.number().optional(),
            name: z.string().optional(),
         })
         .refine((value) => value.id !== 0 && value.name !== '', {
            message: 'Тип задачи обязателен',
         }),
      selectedOptionComp: z
         .object({
            id: z.number().optional(),
            name: z.string().optional(),
            color: z.string().optional(),
         })
         .refine((value) => value.id !== 0 && value.name !== '', {
            message: 'Компонент обязателен',
         }),
      selectedOptionsCheckbox: z
         .array(
            z.object({
               id: z.number(),
               name: z.string(),
               surname: z.string(),
               email: z.string(),
            })
         )
         .min(1, 'Выберите хотя бы одного исполнителя'),
      selectedOptionPriority: z
         .object({
            id: z.number().optional(),
            name: z.string().optional(),
         })
         .refine((value) => value.id !== 0 && value.name !== '', {
            message: 'Приоритет обязателен',
         }),
      estimateMinutes: z
         .string()
         .refine((value) => value === '' || /^\d+$/.test(value), {
            message: 'Оценка должна быть числом',
         })
         .optional(),
      estimate: z.string().optional(),
      date: z
         .object({
            startDate: z.string().nullable().optional(),
            endDate: z.string().nullable().optional(),
         })
         .refine((value) => (value.startDate && value.endDate) || (!value.startDate && !value.endDate), {
            message: 'Заполните обе даты или оставьте их пустыми',
         }),
      description: z.string().min(10, 'Описание должно содержать не менее 10 символов'),
      fileLinks: z
         .array(
            z.object({
               created_at: z.string(),
               updated_at: z.string(),
               original_name: z.string(),
               link: z.string().url('Введите корректный URL'),
            })
         )
         .optional(),
      layoutLink: z.string().optional(),
      // .url('Введите корректный URL')
      // .refine((value) => value.startsWith('http'), 'Ссылка должна начинаться с http')

      markupLink: z.string().optional(),
      // .url('Введите корректный URL')
      // .refine((value) => value.startsWith('http'), 'Ссылка должна начинаться с http')

      devLink: z.string().optional(),
      // .url('Введите корректный URL')
      // .refine((value) => value.startsWith('http'), 'Ссылка должна начинаться с http')
   });

   //
   console.log(taskData, '*************** taskData');
   const {
      register,
      handleSubmit,
      control,
      setValue,
      watch,
      formState: { errors },
      clearErrors,
   } = useForm<FormData>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         name: taskData?.name || '',
         selectedOptionTasks: taskData?.task_type || { id: 0, name: '' },
         selectedOptionComp: taskData?.component || { id: 0, name: '', color: '' },
         selectedOptionsCheckbox: taskData?.users || [],
         selectedOptionPriority: taskData?.priority || { id: 0, name: '' },
         estimateMinutes: '',

         stage_id: 0,
         component_id: 0,
         block_id: 0,

         epic_id: 0,
         release_id: 0,

         estimate: taskData?.estimate_worker || '',
         date: { startDate: taskData?.date_start || null, endDate: taskData?.date_end || null },
         description: taskData?.description || '',
         fileLinks: taskData?.files || [],
         layoutLink: taskData?.layout_link || '',
         markupLink: taskData?.markup_link || '',
         devLink: taskData?.dev_link || '',
      },
   });
   console.log(errors, 'errors '); //!!!

   // !!! ===================================================================================
   const transformToServerData = (formData: FormData) => {
      const selectedIds = formData.selectedOptionsCheckbox?.map((option) => option.id) || [];
      const temporaryId = parseInt(Math.random() * 100); // !!!

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

   // отправляем данные формы -------------------------------------------------
   const onSubmit = (data: FormData) => {
      console.log('*************** onSubmit ***************');
      console.log('data', data);

      const serverData = transformToServerData(data);

      console.log('serverData', serverData);

      if (serverData) handleCreateTask('project4', data);

      //if (serverData) handleUpdateTask(); // если редактировать задачу !!!
   };

   // Маска – число + подстановка буквы. Пример, ввод 90 и отображается 90м
   // Опционально - ввод 90 и парсится на 1ч 30м
   const parseEstimate = (value: string | number): string => {
      if (!value) return '';
      if (/^\d+$/.test(value)) {
         const minutes = parseInt(value, 10);
         const hours = Math.floor(minutes / 60);
         const remainingMinutes = minutes % 60;
         return `${hours > 0 ? `${hours}ч ` : ''}${remainingMinutes}м`.trim();
      }
      return value;
   };

   // модалка "Закрыть окно?"
   const handleCloseModal = () => {
      setModalOpen(false); // закрыть  модалку
   };

   const handleConfirm = () => {
      // закрыть окно и модалку
      setModalOpen(false);
      onClose();
   };

   // При клике вне его области открывается модалка "Закрыть окно?"
   const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
         setModalOpen(true);
      }
   };

   // Обработчик изменения Название
   // const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
   //    const inputValue = e.target.value;
   //    setValueMain(inputValue);
   //    setName(inputValue);
   //    if (isTouched) {
   //       // setError(validate(inputValue));
   //    }
   // };

   // Обработчик изменения Тип Задачи
   const handleTaskTypeChange = (value: TaskType) => {
      setValue('selectedOptionTasks', value);

      setSelectedOptionTasks(value);
   };

   // Обработчик изменения Компонент
   const handleComponentChange = (value) => {
      setValue('selectedOptionComp', value);
      setSelectedOptionComp(value);
   };

   // Обработчик изменения Исполнитель
   const handleUsersChange = (value) => {
      setValue('selectedOptionsCheckbox', value);
      setSelectedOptionUsers(value);
   };

   // Обработчик изменения Приоритета
   const handlePriorityChange = (value: Priority) => {
      setSelectedPriority(value);
      setValue('selectedOptionPriority', value);

      clearErrors('selectedOptionPriority'); // Очищаем ошибку при изменении
   };

   // Обработчик изменения Оценка
   const handleEstimateChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setEstimate(value.match(/^\d+$/) ? `${value}м` : value);
   };

   // Обработчик изменения Оценка
   const onBlurFilesChange = (e: React.FocusEvent<HTMLInputElement>) => {
      const rawValue = e.target.value;
      const parsed = parseEstimate(rawValue);
      setValue('estimate', parsed, { shouldValidate: false });
      setValue('estimateMinutes', rawValue, { shouldValidate: true });
   };

   // Обработчик изменения Файлы
   const handleFilesChange = (newFiles: File[]) => {
      setValue('fileLinks', newFiles);
      setFiles(newFiles);
   };

   if (!isOpen) return null;
   if (isGetTasksIdLoading) return <div>Loading task...</div>;
   if (!taskData) return <div>Task not found</div>;

   return (
      <div className={style['modal-creation-editing']} onClick={handleOverlayClick}>
         <button className={style['close-button-modal']} type="button" onClick={() => setModalOpen(true)}>
            <Close />
         </button>

         <div className={style.wrapper}>
            <div className={style.heder}>
               <h2 className={style.title}>{isEditMode ? 'Редактировать задачу' : 'Создать задачу'}</h2>

               <button className={style['close-button']} type="button" onClick={() => setModalOpen(true)}>
                  <Close />
               </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
               {/* Название */}
               <div className={`${style['form-title']} ${errors.name ? style['error-title'] : ''}`}>
                  <label>
                     Название <span>*</span>
                  </label>
                  <input {...register('name')} className={style['form-input']} placeholder="Название" />
                  {errors.name && <p className={style.error}>{errors.name.message}</p>}
               </div>

               {/* Selects */}
               <div className={style['form-selects']}>
                  {/* Тип задачи */}
                  <div className={style['form-select']}>
                     <SelectCustom<TaskType>
                        value={watch('selectedOptionTasks')}
                        onChange={handleTaskTypeChange}
                        options={taskTypesOptions}
                        label="Тип задачи"
                        titleSelect="Задача"
                        required
                     />
                     {errors.selectedOptionTasks && <p className={style.error}>{errors.selectedOptionTasks.message}</p>}
                  </div>

                  {/* Компонент */}
                  <div className={style['form-select']}>
                     <SelectCustom<Stage>
                        value={watch('selectedOptionComp')}
                        onChange={handleComponentChange}
                        options={componentsOptions}
                        label="Компонент"
                        titleSelect="Не выбран"
                        required
                     />
                     {errors.selectedOptionComp && <p className={style.error}>{errors.selectedOptionComp.message}</p>}
                  </div>

                  {/* Исполнитель */}
                  <div className={style['form-select']}>
                     <SelectCustomCheckbox
                        value={watch('selectedOptionsCheckbox')}
                        onChange={handleUsersChange}
                        options={users}
                        label="Исполнитель"
                        titleSelect="Исполнитель"
                        required
                     />
                     {errors.selectedOptionsCheckbox && (
                        <p className={style.error}>{errors.selectedOptionsCheckbox.message}</p>
                     )}
                  </div>
               </div>

               <div className={style['form-selects']}>
                  {/*  Приоритет */}
                  <div className={style['form-select']}>
                     <SelectCustom<Priority>
                        value={watch('selectedOptionPriority')}
                        onChange={handlePriorityChange}
                        options={priorityOptions}
                        label="Приоритет"
                        titleSelect="Приоритет"
                        required
                     />

                     {errors.selectedOptionPriority && (
                        <p className={style.error}>{errors.selectedOptionPriority.message}</p>
                     )}
                  </div>

                  {/* ----------- Оценка -------- */}
                  <div className={style['form-select']}>
                     <label>Оценка</label>
                     <input
                        {...register('estimate')}
                        onBlur={onBlurFilesChange}
                        className={style['form-input']}
                        type="text"
                        placeholder="Оценка"
                     />
                     {errors.estimateMinutes && <p className={style.error}>{errors.estimateMinutes.message}</p>}
                  </div>
               </div>

               {/* ---------- Даты ---------- */}
               <div className={style['form-date-start']}>
                  <Controller
                     name="date"
                     control={control}
                     render={({ field }) => <CalendarCustom value={field.value} onChange={field.onChange} />}
                  />

                  {errors.date && <p className={style.error}>{errors.date.message}</p>}
               </div>

               {/* <div className={style['form-date-end']}></div> */}

               {/* Описание */}
               <div className={style['form-description']}>
                  <Controller
                     name="description"
                     control={control}
                     defaultValue=""
                     render={({ field }) => (
                        <TextAreaWithToolbar
                           value={field.value}
                           onChange={field.onChange}
                           error={errors.description?.message}
                        />
                     )}
                  />

                  {errors.description && <p className={style.error}>{errors.description.message}</p>}
               </div>

               {/* Блок поле загрузки файлов */}
               <div className={style['form-files']}>
                  <Controller
                     name="fileLinks"
                     control={control}
                     render={({ field: { value, onChange }, fieldState: { error } }) => (
                        <FileUpload
                           files={files || []}
                           onFilesChange={true ? handleFilesChange : undefined} // Разрешение на загрузку файлов // taskData.can_attach_file
                           error={error?.message}
                        />
                     )}
                  />
               </div>

               {/* Ссылки на файлы */}
               <div className={style['form-links-files']}>
                  {/* Layout Link */}
                  <div className={style['form-link-item']}>
                     <label>Layout Link</label>
                     <Controller
                        name="layoutLink"
                        control={control}
                        render={({ field }) => (
                           <input
                              type="text"
                              value={field.value || ''}
                              onChange={(e) => field.onChange(e.target.value)}
                              placeholder="Layout link"
                           />
                        )}
                     />
                     {errors.layoutLink && <p className={style.error}>{errors.layoutLink.message}</p>}
                  </div>

                  {/* Markup Link */}
                  <div className={style['form-link-item']}>
                     <label>Markup Link</label>
                     <Controller
                        name="markupLink"
                        control={control}
                        render={({ field }) => (
                           <input
                              type="text"
                              value={field.value || ''}
                              onChange={(e) => field.onChange(e.target.value)}
                              placeholder="Markup link"
                           />
                        )}
                     />
                     {errors.markupLink && <p className={style.error}>{errors.markupLink.message}</p>}
                  </div>

                  {/* Dev Link */}
                  <div className={style['form-link-item']}>
                     <label>Dev Link</label>
                     <Controller
                        name="devLink"
                        control={control}
                        render={({ field }) => (
                           <input
                              type="text"
                              value={field.value || ''}
                              onChange={(e) => field.onChange(e.target.value)}
                              placeholder="Dev link"
                           />
                        )}
                     />
                     {errors.devLink && <p className={style.error}>{errors.devLink.message}</p>}
                  </div>
               </div>

               {/* Кнопки */}
               <div className={style['actions']}>
                  {/*  */}
                  <button type="submit" className={style['btn_blue']} onClick={() => onSubmit}>
                     {isEditMode ? 'Сохранить' : 'Добавить'}
                  </button>
                  <button className={style['btn']} type="button" onClick={onClose}>
                     Отменить
                  </button>
               </div>
            </form>
         </div>

         <ModalClose title="Закрыть окно?" isOpen={isModalOpen} onClose={handleCloseModal} onConfirm={handleConfirm} />
      </div>
   );
}
