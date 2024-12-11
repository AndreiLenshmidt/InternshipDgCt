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
   useGetTasksQuery,
   useGetComponentsQuery,
   useGetPrioritiesQuery,
   useGetTaskTypesQuery,
   // useSendFilesTaskMutation,
   // useGetTaskByTaskIdQuery,
   // useGetUsersQuery,
   // useDeleteFileTaskMutation,
   // useCreateTaskMutation,
   // useUpdateTaskMutation,
} from '@/modules/TaskModalCreationEditing/api/taskApiActions';
import {
   useGetTaskByTaskIdQuery,
   useGetUsersQuery,
   useCreateTaskMutation,
   useUpdateTaskMutation,
   useAddFilesToTaskMutation,
} from '@/api/appApi';
import { Priority, Stage, TaskSingle, TaskType, User, ResponseFile } from '@/api/data.types';
import { typesTasksOptions, compOptions, priorOptions, usersOptions } from '@/modules/TaskModalCreationEditing/variors';
import { transformToServerData } from '@/modules/TaskModalCreationEditing/utils/transformToServerData';
import { parseEstimate } from '@/modules/TaskModalCreationEditing/utils/parseEstimate';
import { useUpdateTaskMain } from '@/modules/TaskModalCreationEditing/hook/useUpdateTaskMain';
import { useCreateTaskMain } from '@/modules/TaskModalCreationEditing/hook/useCreateTaskMain';
import { mapTaskType } from './utils/transformTaskSingle';

type ResponseFileWithObject = ResponseFile & {
   fileObject: File;
};

interface TaskModalCreationEditingProps {
   isOpen: boolean;
   onClose: () => void;
   slugName: string;
   taskId?: number; // Если передан, значит редактируем задачу
   newTaskId?: number | undefined;
   onNewTaskId?: (taskId: number) => void;
}

export interface CustomFormData {
   /** Заголовок задачи */
   name?: string; // title: string;
   stage_id: number;
   component_id: number;
   block_id: number;

   epic_id: number;
   release_id: number;

   related_id: number; // ID связанной задачи
   estimate_cost: number;

   /** Тип задачи */
   selectedOptionTasks?: TaskType; // task_type?: TaskType;
   /** Стадий, на которые можно перевести эту задачу */
   selectedOptionComp?: Component; // component?: Component;
   selectedOptionsCheckbox?: User[]; // users?: User[];
   /** Приоритет задачи */
   selectedOptionPriority?: Priority; // priority?: Priority; !!!

   estimateMinutes?: string | undefined; // estimate_worker?: number;
   estimate?: string | undefined; // ------------------!!!

   date: {
      startDate: string; //   date_start?: string;
      endDate: string; // end?: string;
   };

   description?: string; // description?: string;
   fileLinks?: ResponseFileWithObject[] | [] | undefined; // files?: ResponseFile[];  => can_attach_file?: boolean; !!!
   layoutLink?: string; // layout_link?: string | null;
   markupLink?: string; // markup_link?: string | null;
   devLink?: string; // dev_link?: string | null;

   handleSubmit: () => void;
}

export default function TaskModalCreationEditing({
   isOpen,
   onClose,
   slugName,
   taskId,
   newTaskId,
   onNewTaskId,
}: TaskModalCreationEditingProps) {
   const isEditMode = Boolean(taskId);

   const [taskData, setTaskData] = useState<TaskSingle>();
   const [selectedOptionTasks, setSelectedOptionTasks] = useState<TaskType | undefined>(undefined);
   const [selectedOptionComp, setSelectedOptionComp] = useState<Component | undefined>(undefined);
   const [selectedPriority, setSelectedPriority] = useState<Priority | undefined>(undefined);
   const [selectedOptionUsers, setSelectedOptionUsers] = useState<User | undefined>(undefined);
   const [selectedOptionsCheckbox, setSelectedOptionsCheckbox] = useState<string[]>([]);

   const [files, setFiles] = useState<ResponseFile[]>([]);
   const [idTaskMain, setIdTaskMain] = useState(taskId);
   const [isModalOpen, setModalOpen] = useState(false);

   // variors
   const [taskTypesOptions, setTaskTypesOptions] = useState(typesTasksOptions);
   const [componentsOptions, setComponentsOptions] = useState(compOptions);
   const [priorityOptions, setPriorityOptions] = useState(priorOptions);
   const [users, setUsersOptions] = useState(usersOptions);

   // const [name, setName] = useState('');
   // const [assignees, setAssignees] = useState<string[]>([]);
   // const [estimate, setEstimate] = useState('');
   // const [startDate, setStartDate] = useState('');
   // const [endDate, setEndDate] = useState('');
   // const [description, setDescription] = useState('');

   // const [availableAssignees, setAvailableAssignees] = useState<string[]>([]);

   // const [titleSelect, setTitleSelect] = useState('Задача');
   // const [itemsOptions, setItemsOptions] = useState([]);

   // const [isTouched, setIsTouched] = useState(false);
   // const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

   // const [errors, setErrors] = useState('');
   // const [error, setError] = useState('');
   // const [priorities, setPriorities] = useState([]);
   // const [valueMain, setValueMain] = useState(null);
   // const [taskType, setTaskType] = useState(taskTypes);
   // const [component, setComponent] = useState('');
   // const [fileLinks, setFileLinks] = useState<string[]>([]);
   // !!! ===================================================================================

   const [sendFilesTaskMutation] = useAddFilesToTaskMutation();
   // Получаем данные
   const { data: getComponents } = useGetComponentsQuery();
   const { data: getPriorities } = useGetPrioritiesQuery();
   const { data: getTaskTypes } = useGetTaskTypesQuery({
      skip: taskId || isOpen, // Пропускаем запрос, если taskId есть
   });
   const { data: getUsers } = useGetUsersQuery(slugName); // !!! slug
   const {
      data: tasks = [],
      isLoading: isGetTasksIdLoading,
      isSuccess: tasksIsSuccess,
      error: tasksError,
   } = useGetTasksQuery({ slug: slugName });

   // const { data: projects = [] } = useGetProjectsQuery();
   // console.log(projects, '------------- projects ,isLoading----------');

   const [createTaskMutation, { isLoading: isCreateLoading, isSuccess: createIsSuccess, error: createError }] =
      useCreateTaskMutation();

   const [updateTaskMutation, { isLoading: isUpdateLoading, isSuccess: updateIsSuccess, error: updateError }] =
      useUpdateTaskMutation();

   const { data: taskById = {}, isLoading: isGetTaskByTaskIdLoading } = useGetTaskByTaskIdQuery(idTaskMain, {
      refetchOnMountOrArgChange: true, // Автоматически обновлять данные при изменении taskId
      skip: !taskId || !isOpen, // Пропускаем запрос, если taskId нет или окно закрыто
   });
   console.log(taskById, '******** taskById ,isLoading useGetTaskByTaskIdQuery ******');

   // Привязываем файлы к задаче
   const handleFileTaskLinked = async (idTask: number | undefined, filesTask: ResponseFileWithObject[]) => {
      try {
         console.log(`Привязываем файлы к задаче Файл ${filesTask} к задаче:`, idTask, filesTask);

         for (const file of filesTask) {
            const response = await sendFilesTaskMutation({
               task: idTask,
               file: file.id,
            }).unwrap();

            if (response.data) {
               setTaskData(response.data); //  Обновляем данные
               if (response?.data?.files?.length > 0) setFiles(response.data.files); //  Обновляем данные

               console.log(`Файл ${file.original_name} успешно привязан к задаче:`, response.data);
            }
         }
      } catch (error) {
         console.error('Ошибка при привязке файла:', error);
      }
   };

   // Редактировать (обновить) задачу -------------------------------------------
   const handleUpdateTask = async (
      idTask: number | undefined,
      taskDataUpd: TaskSingle,
      filesTask: ResponseFileWithObject[]
   ) => {
      try {
         const response = await updateTaskMutation({ id: idTask, body: taskDataUpd }).unwrap();

         if (response?.data) {
            setTaskData((prev) => ({
               ...prev,
               ...response.data,
            })); //  Обновляем данные

            if (response?.data?.files?.length > 0) setFiles(response.data.files); //  Обновляем данные

            const taskId: number = response.data.id; // Получение id задачи

            console.log('Задача обновлена response, taskId:', response, taskId);

            if (filesTask?.length > 0) {
               // Исключаем дублирование
               const uniqueFilesTask = filesTask.filter(
                  (newFile) =>
                     !taskData.files?.some(
                        (existingFile: ResponseFile) =>
                           existingFile.id === newFile.id ||
                           existingFile.original_name === newFile.original_name ||
                           existingFile.link === newFile.link
                     )
               );

               if (uniqueFilesTask.length > 0) {
                  await handleFileTaskLinked(taskId, uniqueFilesTask); // Привязка только уникальных файлов к задаче
               }
            }
         }

         if (response) {
            onClose();
         }
      } catch (error) {
         console.error('Ошибка при обновлении задачи:', error);
      }
   };

   // Добавить (создать) задачу -------------------------------------------
   const handleCreateTask = async (slugName: string, taskData: TaskSingle, files: ResponseFileWithObject[]) => {
      try {
         const response = await createTaskMutation({ slug: slugName, body: taskData }).unwrap();

         console.log('************** Задача создана response:', response.data);

         if (response.data) {
            setTaskData(response.data); //  Обновляем данные
            if (response?.data?.files?.length > 0) setFiles(response.data.files); //  Обновляем данные
            onNewTaskId(response.data.id);
            setIdTaskMain(response.data.id);

            const idTask = response.data?.id; // Получение id задачи

            if (files?.length > 0 && (idTask || idTaskMain) && response.data.can_attach_file) {
               await handleFileTaskLinked(idTask, files);
               // const createdFiles = files.map((file, index) => {
               // await handleFileTaskLinked(idTask, file.fileObject);  //!! Привязка файлов к задаче
               // });
            }
         }

         if (response) {
            onClose();
         }
      } catch (error) {
         console.error('Ошибка при создании задачи:', error);
      }
   };

   // Общие состояния
   const isLoading = isUpdateLoading || isCreateLoading || isGetTaskByTaskIdLoading;
   const error = updateError || createError;

   // !!! ===================================================================================
   // схема валидации Zod
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
         .transform((value) => (value === '' ? undefined : parseInt(value, 10)))
         .optional(),

      estimate: z.string().optional(),
      date: z
         .object({
            startDate: z
               .string()
               .nullable()
               .transform((value) => (value ? new Date(value).toISOString() : null)),
            endDate: z
               .string()
               .nullable()
               .transform((value) => (value ? new Date(value).toISOString() : null)),
         })
         .refine(
            (value) => {
               // Проверка: либо обе даты заданы, либо обе отсутствуют
               const bothDatesEmpty = !value.startDate && !value.endDate;
               const bothDatesPresent = value.startDate && value.endDate;
               return bothDatesEmpty || bothDatesPresent;
            },
            {
               message: 'Заполните обе даты или оставьте их пустыми',
            }
         ),
      description: z.string().min(10, 'Описание должно содержать не менее 10 символов'),
      fileLinks: z
         .array(
            z.object({
               id: z.number().optional(),
               created_at: z.string(),
               updated_at: z.string(),
               original_name: z.string(),
               link: z.string().optional(),
               fileObject: z.instanceof(File).optional(),
            })
         )
         .optional(),
      layoutLink: z
         .string()
         // .url('Введите корректный URL')
         // .refine((value) => value.startsWith('http'), 'Ссылка должна начинаться с http')
         .optional(),

      markupLink: z
         .string()
         // .url('Введите корректный URL')
         // .refine((value) => value.startsWith('http'), 'Ссылка должна начинаться с http')
         .optional(),

      devLink: z
         .string()
         // .url('Введите корректный URL')
         // .refine((value) => value.startsWith('http'), 'Ссылка должна начинаться с http')
         .optional(),
   });

   const {
      register,
      reset,
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

         stage_id: 0,
         component_id: 0,
         block_id: 0,

         epic_id: 0,
         release_id: 0,

         estimateMinutes: '',
         estimate: taskData?.estimate_worker || '',
         date: {
            startDate: taskData?.begin ? new Date(taskData.begin) : undefined,
            endDate: taskData?.end ? new Date(taskData.end) : undefined,
         },
         description: taskData?.description || '',
         fileLinks: [],
         layoutLink: taskData?.layout_link || '',
         markupLink: taskData?.markup_link || '',
         devLink: taskData?.dev_link || '',
      },
   });
   console.log(errors, '!!! --- errors --- !!!'); //!!!
   // !!! ===================================================================================

   // Редактировать (обновить) задачу -------------------------------------------
   // console.log('======= files', files, 'files =======');

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
   // модалка "Закрыть окно?"
   const handleCloseModal = () => {
      onClose();
      setModalOpen(false); // закрыть  модалку
   };

   // НЕ закрыть окно и закрыть модалку
   const handleConfirm = () => {
      setModalOpen(false);
   };

   // При клике вне его области открывается модалка "Закрыть окно?"
   const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
         setModalOpen(true);
      }
   };

   // Обработчик изменения Тип Задачи
   const handleTaskTypeChange = (value: TaskType[]) => {
      setValue('selectedOptionTasks', value);
      setSelectedOptionTasks(value);
   };

   // Обработчик изменения Компонент
   const handleComponentChange = (value: Component[]) => {
      setValue('selectedOptionComp', value);
      setSelectedOptionComp(value);
   };

   // Обработчик изменения Исполнитель
   const handleUsersChange = (value: User[]) => {
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
   // const handleEstimateChange = (e: ChangeEvent<HTMLInputElement>) => {
   //    const value = e.target.value;
   //    setEstimate(value.match(/^\d+$/) ? `${value}м` : value);
   // };

   // Обработчик изменения Оценка
   const onBlurFilesChange = (e: React.FocusEvent<HTMLInputElement>) => {
      const rawValue = e.target.value;
      const parsed = parseEstimate(rawValue);
      setValue('estimate', parsed, { shouldValidate: false });
      setValue('estimateMinutes', rawValue, { shouldValidate: true });
   };

   // Обработчик изменения Файлы
   const handleFilesChange = (newFiles: File[]): void => {
      setValue('fileLinks', newFiles);

      console.log(newFiles, 'newFiles ++++++++++');
      setFiles(newFiles);
   };
   // !!! ------------------------------------------------------------------------------
   // отправляем данные формы -------------------------------------------------
   const onSubmit = (data: CustomFormData) => {
      console.log('*************** onSubmit ***************');
      console.log('***** data *****', data);

      const serverData = transformToServerData(data);

      console.log('serverData ,isEditMode', serverData, isEditMode);
      // console.log('*********** data.fileLinks, !isEditMode ***********', data.fileLinks, !isEditMode);

      // создать задачу
      if (serverData && !isEditMode) handleCreateTask(slugName, serverData, data.fileLinks);

      // редактировать задачу
      if (serverData && isEditMode) handleUpdateTask(idTaskMain, serverData, data.fileLinks);
   };

   // Получаем данные
   useEffect(() => {
      setComponentsOptions(getComponents?.data || []);
      setPriorityOptions(getPriorities?.data);

      if (taskId) setTaskTypesOptions(taskData?.possibleTaskNextStages);
      if (!taskId || getTaskTypes?.data) {
         setTaskTypesOptions(getTaskTypes?.data);
      }
      if (!taskId || !getTaskTypes?.data) {
         setTaskTypesOptions(typesTasksOptions);
      }

      setUsersOptions(getUsers?.data);
   }, [getTaskTypes, getComponents, getPriorities, getUsers, taskData]);

   useEffect(() => {
      if (taskById?.data) {
         setTaskData(taskById?.data);
         setFiles(taskById?.data?.files || []);
      }
   }, [taskById?.data]);

   useEffect(() => {
      if (taskId) setIdTaskMain(taskId);
      if (taskId && taskById) setTaskData(taskById?.data);
      if (taskData?.files) setFiles(taskData.files);
   }, [isOpen, taskId, taskById, taskData?.files]);

   // Установка значений формы после загрузки данных
   useEffect(() => {
      if (taskData) {
         const updatedFiles = taskData?.files || [];
         setFiles(updatedFiles);

         if (taskData) {
            reset({
               ...taskData,
               name: taskData.name || '',
               selectedOptionTasks: taskData.task_type || { id: 0, name: '' },
               selectedOptionComp: taskData.component || { id: 0, name: '', color: '' },
               selectedOptionsCheckbox: taskData.users || [],
               selectedOptionPriority: taskData.priority || { id: 0, name: '' },

               stage_id: 0,
               component_id: 0,
               block_id: 0,

               epic_id: 0,
               release_id: 0,

               estimateMinutes: '',
               estimate: taskData?.estimate_worker || '',
               date: {
                  startDate: taskData.begin ? new Date(taskData.begin).toISOString() : null,
                  endDate: taskData.end ? new Date(taskData.end).toISOString() : null,
               },
               description: taskData.description || '',
               fileLinks: updatedFiles, // Принудительно создаём новый массив
               layoutLink: taskData.layout_link || '',
               markupLink: taskData.markup_link || '',
               devLink: taskData.dev_link || '',
            });
         }
      }
   }, [taskData, reset, taskData?.files]);

   if (!isOpen) return null;
   if (isGetTasksIdLoading) return <div className={style.loading}>Загрузка...</div>;

   console.log(taskData, '*************** taskData WRAPPER');
   // console.log(files, 'files *************** files WRAPPER');
   // console.log(tasks, 'tasks *************** tasks WRAPPER');
   // console.log(watch('date'), 'watch(date) *************** watch(date) WRAPPER');

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
                           taskId={idTaskMain}
                           files={files || []}
                           onFilesChange={(newFiles) => {
                              onChange(newFiles);

                              if (handleFilesChange) {
                                 handleFilesChange(newFiles);
                              }
                           }}
                           disabled={!taskData?.can_attach_file} // Разрешение на загрузку файлов // taskData.can_attach_file
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
                  <button type="submit" className={style['btn_blue']} onClick={() => onSubmit}>
                     {isEditMode ? 'Сохранить' : 'Добавить'}
                  </button>
                  <button className={style['btn']} type="button" onClick={() => onClose(false)}>
                     Отменить
                  </button>
               </div>
            </form>
         </div>

         <ModalClose title="Закрыть окно?" isOpen={isModalOpen} onClose={handleCloseModal} onConfirm={handleConfirm} />
      </div>
   );
}
