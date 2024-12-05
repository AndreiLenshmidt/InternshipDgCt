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
   // useUpdateTaskMutation,
} from './api/taskApiActions';
import { useGetOAuthTokenMutation } from '../AuthPage/api/authApi';
// import { useGetTaskByTaskIdQuery } from '../TaskPage/api/taskApi';
import { useOptimisticDeleteTask } from './utils/useOptimisticDeleteTask';
import { useOptimisticCreateTask } from './utils/useOptimisticCreateTask';
import { useOptimisticUpdateTask } from './utils/useOptimisticUpdateTask';
import { Priority, Stage, TaskSingle, TaskType, User } from '@/api/data.types';
import { mapTaskType, taskTypes, compTypes } from './utils/transformTaskSingle';
import { File } from '@/api/data.types';
import { useUpdateTaskMain } from '@/modules/TaskModalCreationEditing/hook/useUpdateTaskMain.ts';

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

type FormData = {
   /** Заголовок задачи */
   name?: string; // title: string;
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
};

export default function TaskModalCreationEditing({ isOpen, onClose, slug, taskId }: TaskModalCreationEditingProps) {
   const [name, setName] = useState('');
   // const [taskType, setTaskType] = useState(taskTypes);
   const [taskData, setTaskData] = useState<TaskSingle>({});
   // Тип задачи
   const [selectedOptionTasks, setSelectedOptionTasks] = useState<TaskType | undefined>(undefined);
   const [selectedOptionComp, setSelectedOptionComp] = useState<Component | undefined>(undefined);
   const [selectedPriority, setSelectedPriority] = useState<Priority | undefined>(undefined);
   const [selectedOptionUsers, setSelectedOptionUsers] = useState<User | undefined>(undefined);
   // !!!
   const [users, setUsers] = useState<User[]>([
      { id: 1, name: 'Иван', surname: 'Иванов', email: 'ivanov@mail.com' },
      { id: 2, name: 'Мария', surname: 'Петрова', email: 'petrova@mail.com' },
      { id: 3, name: 'Анна', surname: 'Сидорова', email: 'sidorova@mail.com' },
   ]);
   const [priority, setPriority] = useState([
      { id: 1, name: 'Низкий' },
      { id: 2, name: 'Средний' },
      { id: 3, name: 'Высокий' },
   ]);
   const [files, setFiles] = useState<File[]>([]);

   const [selectedOptionsCheckbox, setSelectedOptionsCheckbox] = useState<string[]>([]);
   const [component, setComponent] = useState('');
   const [assignees, setAssignees] = useState<string[]>([]);
   const [estimate, setEstimate] = useState('');
   const [startDate, setStartDate] = useState('');
   const [endDate, setEndDate] = useState('');
   const [description, setDescription] = useState('');
   const [fileLinks, setFileLinks] = useState<string[]>([]);

   // const [taskTypesOptions, setTaskTypesOptions] = useState<TaskType | undefined>(undefined);
   const [components, setComponents] = useState<string[]>([]);
   const [availableAssignees, setAvailableAssignees] = useState<string[]>([]);
   const [priorities, setPriorities] = useState<string[]>([]);

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
   const { data: projects = [] } = useGetProjectsQuery();
   console.log(projects, '------------- projects ,isLoading----------');

   const { data, isLoading: isGetTaskByTaskIdLoading } = useGetTaskByTaskIdQuery(8);
   console.log(data, '*-*-**--* data ,isLoading useGetTaskByTaskIdQuery *-*-*-*-*');

   // const { updateTaskMain, isLoading: isUpdateLoading, error: updateError } = useUpdateTaskMain();
   // const { createTaskMain, isLoading: isCreateLoading, error: createError } = useCreateTaskMain();

   // const { data, isLoading } = useGetTasksQuery({ slug: 'project4', filters: { id: [] } });
   // const { data: tasks = [], isLoading } = useGetTasksQuery({
   //    slug: 'project1',
   //    filters: { component: [] },
   // });
   // console.log(data, '------------- data filter,  ----------');

   // const { data: projectUsers, error } = useGetUsersQuery('project2');
   // console.log(projectUsers, '------------- projectUsers,  ----------');

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

   // Общие состояния
   const isLoading = isUpdateLoading || isGetTaskByTaskIdLoading;
   const error = updateError;

   // Получаем данные
   // useEffect(() => {
   //    if (!isLoading && data) {
   //       setTaskData(data.data);
   //       console.log(taskData.id);
   //    }
   // }, [data]);

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
         selectedOptionsCheckbox: taskData?.users || users.user || [],
         selectedOptionPriority: taskData?.priority || { id: 0, name: '' },
         estimateMinutes: '',
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
   // Создать задачу -------------------------------------------------
   // const handleCreate = useOptimisticCreateTask();

   // setIsLoading();
   // setIsSuccess();
   // setError();
   // const updateTaskMain = () => {
   //    const handleUpdateTask = async () => {
   //       try {
   //          const response = await updateTask({
   //             id: 1, // ID задачи, которую нужно обновить
   //             body: {
   //                date_start: '2024-11-28T08:22:33.000000Z',
   //                // name: 'Updated Task_1',
   //                // description: 'Updated Task Description',
   //             }, // Частичные данные, которые вы хотите обновить
   //          }).unwrap(); // `unwrap` выбросит ошибку, если запрос не удался
   //          console.log('Task updated successfully:', response);
   //       } catch (e) {
   //          console.error('Failed to update task:', e);
   //       }
   //    };
   // };
   // handleUpdateTask();

   // const transformFiles = (
   //    files: (File | ExtendedFile | null)[] | undefined
   // ): { original_name: string; link: string }[] | undefined => {
   //    return files?.map((file) => {
   //       console.log(file);
   //       if (file && file instanceof File) {
   //          return {
   //             original_name: file.name || '',
   //             link: URL.createObjectURL(file) || '',
   //          };
   //       } else {
   //          return {
   //             original_name: file?.original_name || '',
   //             link: file?.link || '',
   //          };
   //       }
   //    });
   // };

   const transformToServerData = (formData: FormData): TaskSingle => ({
      name: formData.name,
      task_type: formData.selectedOptionTasks,
      component: formData.selectedOptionComp,
      users: formData.selectedOptionsCheckbox,
      priority: formData.selectedOptionPriority,
      estimate_worker: formData.estimateMinutes,
      date_start: formData.date.startDate,
      date_end: formData.date.endDate,
      files: formData.fileLinks,
      layout_link: formData.layoutLink || null,
      markup_link: formData.markupLink || null,
      dev_link: formData.devLink || null,
   });

   // const handleUpdate = useOptimisticUpdateTask();
   // //    const [taskName, setTaskName] = useState('');

   // const handleSave = () => {
   //    // handleUpdate(slug, taskId, { name: taskName... TaskSingle  });
   // };

   // отправляем данные формы -------------------------------------------------
   const onSubmit = (data: FormData) => {
      console.log('*************** onSubmit ***************');
      console.log('data', data);

      const serverData = transformToServerData(data);

      console.log('serverData', serverData);

      handleUpdateTask();

      // const handleSubmit = async (e: React.FormEvent) => {
      //    e.preventDefault();
      //    try {
      //       await updateTask({
      //          id: 1, // реальный ID задачи
      //          body: taskData,
      //       }).unwrap();
      //       alert('Task updated successfully!');
      //    } catch (e) {
      //       console.error('Failed to update task:', e);
      //    }
      // };
   };

   // const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
   //    const inputValue = e.target.value;
   //    setValueMain(inputValue);
   //    setName(inputValue);
   //    if (isTouched) {
   //       // setError(validate(inputValue));
   //    }
   // };

   // Загрузка данных из API ----------------------------- !!!
   // console.log(tasks, '------------- tasks filter,  ----------');

   // useEffect(() => {
   // if (tasks.length !== 0) {
   // }
   // console.log(tasks?.data?.[0]?.task_type, '------------- tasks.data[0].task_type  ----------');
   // console.log(mapTaskType(tasks?.data?.[0]?.task_type), 'mapTaskType(3)');
   // console.log('*********selectedTaskType', selectedTaskType);
   // console.log('selectedOptionTasks', selectedOptionTasks);
   // }, [data]);

   const handleEstimateChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setEstimate(value.match(/^\d+$/) ? `${value}м` : value);
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

   // Обработчик изменения Тип Задачи
   const handleTaskTypeChange = (value) => {
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
   if (isLoading) return <div>Loading task...</div>;
   if (!taskData) return <div>Task not found</div>;

   console.log(taskData, 'taskData222222222222222');

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
                        options={taskTypes}
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
                        options={compTypes}
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
                        options={priority}
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
                           onFilesChange={taskData.can_attach_file ? handleFilesChange : undefined} // Разрешение на загрузку файлов
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
