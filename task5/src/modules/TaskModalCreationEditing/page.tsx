import React, { useState, useEffect, ChangeEvent } from 'react';
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
import { useCreateTaskMutation, useGetTasksQuery, useUpdateTaskMutation } from './api/taskApiActions';
import { useGetOAuthTokenMutation } from '../AuthPage/api/authApi';
import { useGetTaskByTaskIdQuery } from '../TaskPage/api/taskApi';
import task from '@/pages/projects/kanban/task';
import { useOptimisticDeleteTask } from './utils/useOptimisticDeleteTask';
import { useDispatch } from 'react-redux';
import { useOptimisticCreateTask } from './utils/useOptimisticCreateTask';

interface TaskModalCreationEditingProps {
   isOpen: boolean;
   onClose: () => void;
   slug: string;
   taskId?: number; // Если передан, значит редактируем задачу
}

type FormData = {
   title: string;
   selectedOptionTasks: string;
   selectedOptionComp: string;
   selectedOptionsCheckbox: string[];
   selectedOptionPriority: string;
   priority: string;
   estimateMinutes: string;
   estimate: string;
   startDate: string;
   endDate: string;
   description: string;
   fileLinks?: string[];
   layoutLink?: string;
   markupLink?: string;
   devLink?: string;
};

export default function TaskModalCreationEditing({ isOpen, onClose, slug, taskId }: TaskModalCreationEditingProps) {
   const [title, setTitle] = useState('');
   const [taskType, setTaskType] = useState('');
   const [selectedOptionTasks, setSelectedOptionTasks] = useState('');
   const [selectedOptionComp, setSelectedOptionComp] = useState('');
   const [selectedOptionUsers, setSelectedOptionUsers] = useState('');
   const [selectedOptionsCheckbox, setSelectedOptionsCheckbox] = useState<string[]>([]);
   const [component, setComponent] = useState('');
   const [assignees, setAssignees] = useState<string[]>([]);
   const [priority, setPriority] = useState('');
   const [estimate, setEstimate] = useState('');
   const [startDate, setStartDate] = useState('');
   const [endDate, setEndDate] = useState('');
   const [description, setDescription] = useState('');
   const [fileLinks, setFileLinks] = useState<string[]>([]);

   const [taskTypes, setTaskTypes] = useState<string[]>([]);
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

   const dispatch = useDispatch();
   // Получаем данные
   // const { data, isLoading, isSuccess } = useGetTaskByTaskIdQuery(7); // taskId !!!

   // const { data, error, isLoading } = useGetTasksQuery('8'); // TaskSingle taskId
   // console.log(data, isLoading, isSuccess, '------------- data, isLoading, isSuccess ----------');

   const { data: projects = [], isLoading } = useGetProjectsQuery();
   console.log(projects, '------------- projects ,isLoading----------');

   // dispatch(taskApi.util.resetApiState());
   const { data: tasks = [] } = useGetTasksQuery('project2');
   console.log(tasks, '------------- tasks,  ----------');

   // !!! ===================================================================================

   // схема валидации
   const formSchema = z.object({
      title: z.string().min(3, 'Ошибка'),
      selectedOptionTasks: z.string().min(1, 'Тип задачи обязателен'),
      selectedOptionComp: z.string().min(1, 'Компонент обязателен'),
      selectedOptionsCheckbox: z.array(z.string()).min(1, 'Выберите хотя бы одного исполнителя'),

      // Приоритет
      selectedOptionPriority: z.string().min(1, 'Приоритет обязателен'),

      // оценка
      estimateMinutes: z
         .string()
         .optional()
         .refine(
            (value) => {
               // Если поле пустое или содержит только числа, валидация успешна
               return value === undefined || value === '' || /^\d+$/.test(value);
            },
            {
               message: 'Оценка должна быть числом',
            }
         ),
      estimate: z.string().optional(),

      // календарь
      startDate: z.string().optional(),
      endDate: z.string().optional(),

      // описание
      description: z.string().min(10, 'Описание должно содержать не менее 10 символов'),

      // ссылки
      fileLinks: z.array(z.string().url('Введите корректный URL')).optional(),

      // ссылки URL
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
         title: '',
         selectedOptionTasks: '',
         selectedOptionComp: '',
         selectedOptionsCheckbox: [],
         selectedOptionPriority: '',
         priority: '',
         estimate: '',
         startDate: '',
         endDate: '',
         description: '',
         fileLinks: [],
         layoutLink: '',
         markupLink: '',
         devLink: '',
      },
   });

   // !!! ===================================================================================
   // Создать задачу -------------------------------------------------
   const handleCreate = useOptimisticCreateTask();
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

   // Обновить данные --------------------------------------------------------
   const { refetch } = useGetTaskByTaskIdQuery(4); // taskId
   // const handleUpdate = async () => {
   //    await updateTask({ id: taskId, body: { name: 'New Name' } });
   //    refetch(); // Обновление данных после успешного запроса
   // };

   // Редактировать (обновить) задачу -------------------------------------------
   const [updateTask, { isLoading: isUpdating, error }] = useUpdateTaskMutation();

   // const handleUpdate = async () => {
   //    try {
   //       await updateTask({
   //          id: taskId,
   //          body: {
   //             name: 'Updated Task Name',
   //             description: 'Updated Task Description',
   //          },
   //       }).unwrap(); // .unwrap() для обработки ошибок
   //       alert('Task updated successfully!');
   //    } catch (err) {
   //       console.error('Failed to update the task:', err);
   //    }
   // };

   // Удалить задачу -------------------------------------------------------------

   // отправляем данные формы -------------------------------------------------
   const onSubmit = (data: FormData) => {
      console.log(data);

      // async (formData: LoginRequest) => {
      //    const paylord = await login(formData);
      //    setAuthToken(paylord.data);
      //    setCookie('token-auth', paylord.data?.token);
      //    setTimeout(() => router.replace('/projects', { scroll: false }), 2000);
      // };
   };

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      setValueMain(inputValue);
      setTitle(inputValue);
      if (isTouched) {
         // setError(validate(inputValue));
      }
   };

   // Загрузка данных из API ----------------------------- !!!
   useEffect(() => {
      //store useGetOAuthTokenMutation
      // const { data: projects = [], isLoading, isSuccess, isError, error } = useGetProjectsQuery();
      // console.log(projects, isLoading, isSuccess, isError, error, 'projects, isLoading, isSuccess, isError, error');
      //       {
      // const { data, error, isLoading } = useGetTaskByTaskIdQuery(7); // taskId
      // const { data, error, isLoading } = useGetTasksQuery('8'); // taskId
      // console.log(data, error, isLoading, 'data, error, isLoading');
      // const [login, { isError, isSuccess }] = useGetOAuthTokenMutation();
      // console.log(login, isError, isSuccess, 'login, isError, isSuccess');
      //   "data": [
      //     {
      //       "id": 0,
      //       "name": "string",
      //       "component": 0,
      //       "priority": 0,
      //       "stage": 0,
      //       "task_type": 0,
      //       "users": 0,
      //       "possibleTaskNextStages": [
      //         0
      //       ],
      //       "deadline": "string",
      //       "created_by": 0,
      //       "created_at": "string",
      //       "updated_at": "string",
      //       "begin": "2022-11-30T08:48:00.000000Z",
      //       "end": "2022-12-31T16:48:00.000000Z",
      //       "rank": "string"
      //     }
      //   ]
      // }
      // async function fetchData() {
      //   const [
      //     taskTypesResponse,
      //     componentsResponse,
      //     assigneesResponse,
      //     prioritiesResponse,
      //   ] = await Promise.all([
      //     fetch('/api/task-types').then((res) => res.json()),
      //     fetch('/api/components').then((res) => res.json()),
      //     fetch('/api/assignees').then((res) => res.json()),
      //     fetch('/api/priorities').then((res) => res.json()),
      //   ]);
      //   setTaskTypes(taskTypesResponse);
      //   setComponents(componentsResponse);
      //   setAvailableAssignees(assigneesResponse);
      //   setPriorities(prioritiesResponse);
      //   if (isEditMode) {
      //     const task = await fetch(`/api/tasks/${taskId}`).then((res) =>
      //       res.json()
      //     );
      //     setTitle(task.title);
      //     setTaskType(task.taskType);
      //     setComponent(task.component);
      //     setAssignees(task.assignees);
      //     setPriority(task.priority);
      //     setEstimate(task.estimate);
      //     setStartDate(task.startDate);
      //     setEndDate(task.endDate);
      //     setDescription(task.description);
      //     setFileLinks(task.fileLinks);
      //   }
      // }
      // if (isOpen) fetchData();
      // isOpen, isEditMode, taskId;
   }, []);

   // const handleSubmit = () => {
   //   const taskData = {
   //     title,
   //     taskType,
   //     component,
   //     assignees,
   //     priority,
   //     estimate,
   //     startDate,
   //     endDate,
   //     description,
   //     fileLinks,
   //   };

   //   if (
   //     !title ||
   //     !taskType ||
   //     !component ||
   //     !assignees.length ||
   //     !priority ||
   //     !description
   //   ) {
   //     // alert('Заполните все обязательные поля!') // !!! ошибка под полем ввода
   //     return;
   //   }

   //   if (isEditMode) {
   //     fetch(`/api/tasks/${taskId}`, {
   //       method: 'PUT',
   //       body: JSON.stringify(taskData),
   //     });
   //   } else {
   //     fetch(`/api/tasks`, {
   //       method: 'POST',
   //       body: JSON.stringify(taskData),
   //     });
   //   }
   //   onClose();
   // };

   //

   // !!!

   const handleEstimateChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setEstimate(value.match(/^\d+$/) ? `${value}м` : value);
   };

   // Маска – число + подстановка буквы. Пример, ввод 90 и отображается 90м
   // Опционально - ввод 90 и парсится на 1ч 30м
   const parseEstimate = (value: string): string => {
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
   const handlePriorityChange = (value: string) => {
      setValue('selectedOptionPriority', value);
      clearErrors('selectedOptionPriority'); // Очищаем ошибку при изменении
   };

   if (!isOpen) return null;
   if (isLoading) return <div>Loading task...</div>;
   if (!task) return <div>Task not found</div>;

   // const [options, setOptions] = useState<string[]>(['Option 1', 'Option 2', 'Option 3']);

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
               <div className={`${style['form-title']} ${errors.title ? style['error-title'] : ''}`}>
                  <label>
                     Название <span>*</span>
                  </label>
                  <input {...register('title')} className={style['form-input']} placeholder="Название" />
                  {errors.title && <p className={style.error}>{errors.title.message}</p>}
               </div>

               {/* Selects */}
               <div className={style['form-selects']}>
                  <div className={style['form-select']}>
                     <SelectCustom<string>
                        value={watch('selectedOptionTasks')}
                        onChange={(value) => setValue('selectedOptionTasks', value)}
                        options={['Option 1', 'Option 2', 'Option 3']}
                        label="Тип задачи"
                        titleSelect="Задачи"
                        required
                     />
                     {errors.selectedOptionTasks && <p className={style.error}>{errors.selectedOptionTasks.message}</p>}
                  </div>
                  <div className={style['form-select']}>
                     <SelectCustom<string>
                        value={watch('selectedOptionComp')}
                        onChange={(value) => setValue('selectedOptionComp', value)}
                        options={['Задача', 'Баг', 'Улучшение', 'Новая функциональность', 'Эпик', 'Релиз', 'Бэклог']}
                        label="Компонент"
                        titleSelect="Не выбран"
                        required
                     />
                     {errors.selectedOptionComp && <p className={style.error}>{errors.selectedOptionComp.message}</p>}
                  </div>
                  <div className={style['form-select']}>
                     <SelectCustomCheckbox<string>
                        value={watch('selectedOptionsCheckbox')}
                        onChange={(value) => setValue('selectedOptionsCheckbox', value)}
                        options={[
                           { label: 'Задача', value: 'task' },
                           { label: 'Баг', value: 'bug' },
                           { label: 'Улучшение', value: 'improvement' },
                           { label: 'Новая функциональность', value: 'new-feature' },
                           { label: 'Эпик', value: 'epic' },
                           { label: 'Релиз', value: 'release' },
                           { label: 'Бэклог', value: 'backlog' },
                        ]}
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
                  {/* Priority */}
                  <div className={style['form-select']}>
                     <SelectCustom
                        value={watch('selectedOptionPriority')}
                        onChange={(value) => handlePriorityChange(value)}
                        options={['Низкий', 'Средний', 'Высокий']}
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
                     name="startDate"
                     control={control}
                     render={({ field }) => <CalendarCustom value={field.value} onChange={field.onChange} />}
                  />
                  {errors.startDate && <p>{errors.startDate.message}</p>}
                  {errors.endDate && <p>{errors.endDate.message}</p>}
               </div>

               <div className={style['form-date-end']}></div>

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
                        <FileUpload files={value || []} onFilesChange={onChange} error={error?.message} />
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
