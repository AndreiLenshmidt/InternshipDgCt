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
import { useCreateTaskMutation, useGetTasksQuery, useGetUsersQuery, useUpdateTaskMutation } from './api/taskApiActions';
import { useGetOAuthTokenMutation } from '../AuthPage/api/authApi';
import { useGetTaskByTaskIdQuery } from '../TaskPage/api/taskApi';
import { useOptimisticDeleteTask } from './utils/useOptimisticDeleteTask';
import { useOptimisticCreateTask } from './utils/useOptimisticCreateTask';
import { useOptimisticUpdateTask } from './utils/useOptimisticUpdateTask';
import { Priority, Stage, TaskSingle, TaskType, User } from '@/api/data.types';
import { mapTaskType, taskTypes } from './utils/transformTaskSingle';
import { File } from '@/api/data.types';

export interface ExtendedFile {
   id?: number;
   original_name: string;
   link: string;
   created_at: string;
   updated_at?: string;
}
export interface Component {
   /** Идентификатор компонента */
   id?: number;
   /** Название компонента */
   name?: string;
}

/** Стадия (колонка) задачи */
export interface Stage {
   /** Идентификатор стадии */
   id?: number;
   /** Название стадии */
   name?: string;
}

/** Приоритет задачи */
export interface Priority {
   /** Идентификатор приоритета */
   id?: number;
   /** Название приоритета */
   name?: string;
}

/** Тип задачи */
export interface TaskType {
   /** Идентификатор типа задачи */
   id?: number;
   /** Название типа задачи */
   name?: string;
}
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
   selectedOptionTasks?: TaskType[]; // task_type?: TaskType;
   /** Стадий, на которые можно перевести эту задачу */
   selectedOptionComp?: Component[]; // component?: Component;
   selectedOptionsCheckbox?: User[]; // users?: User[];
   /** Приоритет задачи */
   selectedOptionPriority?: Priority[]; // priority?: Priority; !!!
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
      startDate: string; //  begin?: string;
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
   const [task, setTask] = useState<TaskSingle>({});
   const [selectedOptionTasks, setSelectedOptionTasks] = useState([]);
   const [selectedOptionComp, setSelectedOptionComp] = useState('');
   const [selectedOptionUsers, setSelectedOptionUsers] = useState('');
   const [priority, setPriority] = useState([
      { id: 1, name: 'Низкий' },
      { id: 2, name: 'Средний' },
      { id: 3, name: 'Высокий' },
   ]);

   const [selectedOptionsCheckbox, setSelectedOptionsCheckbox] = useState<string[]>([]);
   const [component, setComponent] = useState('');
   const [assignees, setAssignees] = useState<string[]>([]);
   const [estimate, setEstimate] = useState('');
   const [startDate, setStartDate] = useState('');
   const [endDate, setEndDate] = useState('');
   const [description, setDescription] = useState('');
   const [fileLinks, setFileLinks] = useState<string[]>([]);

   const [taskTypesOptions, setTaskTypesOptions] = useState(taskTypes);
   const [components, setComponents] = useState<string[]>([]);
   const [availableAssignees, setAvailableAssignees] = useState<string[]>([]);
   const [priorities, setPriorities] = useState<string[]>([]);

   const isEditMode = Boolean(taskId);

   // const [errors, setErrors] = useState('');
   const [titleSelect, setTitleSelect] = useState('Задача');
   const [itemsOptions, setItemsOptions] = useState([]);

   const [valueMain, setValueMain] = useState('');
   // const [error, setError] = useState('');
   const [isTouched, setIsTouched] = useState(false);

   const [isModalOpen, setModalOpen] = useState(false);

   /// !!!
   const users: User[] = [
      { id: 1, name: 'Иван', surname: 'Иванов', email: 'ivanov@mail.com' },
      { id: 2, name: 'Мария', surname: 'Петрова', email: 'petrova@mail.com' },
      { id: 3, name: 'Анна', surname: 'Сидорова', email: 'sidorova@mail.com' },
   ];

   const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
   const [files, setFiles] = useState<File[]>([]);

   const handleFilesChange = (newFiles: File[]) => {
      setFiles(newFiles);
   };

   // Получаем данные
   const { data: projects = [], isLoading } = useGetProjectsQuery();
   console.log(projects, '------------- projects ,isLoading----------');

   // const { data: tasks = [] } = useGetTasksQuery({ slug: 'project1', filters: { id: [2] } });
   const { data: tasks = [] } = useGetTasksQuery({
      slug: 'project3',
      filters: { type_id: [] },
   });
   console.log(tasks, '------------- tasks filter,  ----------');

   const { data: projectUsers, error } = useGetUsersQuery('project2');
   console.log(projectUsers, '------------- projectUsers,  ----------');

   // !!! ===================================================================================

   // схема валидации Zod
   const formSchema = z.object({
      name: z.string().min(3, 'Ошибка'),
      selectedOptionTasks: z
         .array(
            z.object({
               id: z.number().optional(),
               name: z.string().optional(),
            })
         )
         .min(1, 'Тип задачи обязателен'),
      selectedOptionComp: z
         .array(
            z.object({
               id: z.number().optional(),
               name: z.string().optional(),
            })
         )
         .min(1, 'Компонент обязателен'),
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
         .array(
            z.object({
               id: z.number().optional(),
               name: z.string().optional(),
            })
         )
         .min(1, 'Приоритет обязателен'),
      estimateMinutes: z
         .string()
         .optional()
         .refine((value) => value === '' || /^\d+$/.test(value), {
            message: 'Оценка должна быть числом',
         }),
      estimate: z.string().optional(),
      date: z.object({
         startDate: z.string().optional(),
         endDate: z.string().optional(),
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
      layoutLink: z
         .string()
         .url('Введите корректный URL')
         .refine((value) => value.startsWith('http'), 'Ссылка должна начинаться с http')
         .optional(),
      markupLink: z
         .string()
         .url('Введите корректный URL')
         .refine((value) => value.startsWith('http'), 'Ссылка должна начинаться с http')
         .optional(),
      devLink: z
         .string()
         .url('Введите корректный URL')
         .refine((value) => value.startsWith('http'), 'Ссылка должна начинаться с http')
         .optional(),
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
         name: '',
         selectedOptionTasks: [{ id: 0, name: '' }],
         selectedOptionComp: [{ id: 0, name: '' }],
         selectedOptionsCheckbox: [],
         selectedOptionPriority: [{ id: 0, name: '' }],
         // priority: '',
         estimateMinutes: 0,
         estimate: '',
         date: { startDate: '', endDate: '' },
         description: '',
         fileLinks: [],
         layoutLink: '',
         markupLink: '',
         devLink: '',
      },
   });
   console.log(errors, 'errors '); //!!!

   // !!! ===================================================================================
   // Создать задачу -------------------------------------------------
   const handleCreate = useOptimisticCreateTask();

   // Редактировать (обновить) задачу -------------------------------------------
   console.log('======= files', files, 'files =======');

   const transformFiles = (
      files: (File | ExtendedFile | null)[] | undefined
   ): { original_name: string; link: string }[] | undefined => {
      return files?.map((file) => {
         if (file instanceof File) {
            return {
               original_name: file.name || '',
               link: URL.createObjectURL(file) || '',
            };
         } else {
            return {
               original_name: file?.original_name || '',
               link: file?.link || '',
            };
         }
      });
   };

   const transformToServerData = (formData: FormData): TaskSingle => ({
      name: formData.name,
      task_type: formData.selectedOptionTasks.id,

      possibleTaskNextStages: formData.selectedOptionComp,
      users: formData.selectedOptionsCheckbox,
      priority: { name: formData.selectedOptionPriority.name },
      estimate_worker: parseInt(formData.estimateMinutes, 10),
      begin: formData.date.startDate,
      end: formData.date.endDate,
      files: transformFiles(formData.fileLinks),
      layout_link: formData.layoutLink || null,
      markup_link: formData.markupLink || null,
      dev_link: formData.devLink || null, // Преобразование в null, если пусто
   });

   const handleUpdate = useOptimisticUpdateTask();
   //    const [taskName, setTaskName] = useState('');

   const handleSave = () => {
      // handleUpdate(slug, taskId, { name: taskName... TaskSingle  });
   };

   // отправляем данные формы -------------------------------------------------
   const onSubmit = (data: FormData) => {
      console.log('------------ onSubmit ----------');
      console.log('data', data);

      const serverData = transformToServerData(data);

      console.log('serverData', serverData);
   };

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      setValueMain(inputValue);
      setName(inputValue);
      if (isTouched) {
         // setError(validate(inputValue));
      }
   };

   // Загрузка данных из API ----------------------------- !!!
   useEffect(() => {
      console.log(tasks?.data?.[1]?.task_type, '------------- tasks.data[0].task_type  ----------');

      console.log(mapTaskType(5), 'mapTaskType(3)');

      const selectedOptionTasks = watch('selectedOptionTasks');

      console.log('*********selectedOptionTasks', selectedOptionTasks);
   }, [selectedOptionTasks]);

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

   // Обработчик изменения приоритета
   const handlePriorityChange = (value: Priority) => {
      setValue('selectedOptionPriority', value.id);
      clearErrors('selectedOptionPriority'); // Очищаем ошибку при изменении
   };

   if (!isOpen) return null;
   if (isLoading) return <div>Loading task...</div>;
   if (!task) return <div>Task not found</div>;

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
                  <div className={style['form-select']}>
                     <SelectCustom<TaskType>
                        value={watch('selectedOptionTasks')}
                        onChange={(value) => {
                           setValue('selectedOptionTasks', value);
                           console.log('@@@Selected Option Comp:', value);
                        }}
                        options={taskTypes}
                        label="Тип задачи"
                        titleSelect="Задачи"
                        required
                     />
                     {errors.selectedOptionTasks && <p className={style.error}>{errors.selectedOptionTasks.message}</p>}
                  </div>
                  <div className={style['form-select']}>
                     <SelectCustom<Stage>
                        value={watch('selectedOptionComp')}
                        onChange={(value) => setValue('selectedOptionComp', value)}
                        options={taskTypesOptions}
                        label="Компонент"
                        titleSelect="Не выбран"
                        required
                     />
                     {errors.selectedOptionComp && <p className={style.error}>{errors.selectedOptionComp.message}</p>}
                  </div>
                  <div className={style['form-select']}>
                     <SelectCustomCheckbox
                        value={watch('selectedOptionsCheckbox')}
                        onChange={(value) => setValue('selectedOptionsCheckbox', value)}
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
                        onChange={(value) => handlePriorityChange(value)}
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
                        onBlur={(e) => {
                           const rawValue = e.target.value;
                           const parsed = parseEstimate(rawValue);
                           setValue('estimate', parsed, { shouldValidate: false });
                           setValue('estimateMinutes', rawValue, {
                              shouldValidate: true,
                           });
                        }}
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

                  {errors.date && <p>{errors.date.message}</p>}
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
                           onFilesChange={handleFilesChange} // разрешение на загрузку файлов task.can_attach_file // as unknown as (files: File[]) => void
                           // onFilesChange={task.can_attach_file ? handleFilesChange : null} //!!!!!!!
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
