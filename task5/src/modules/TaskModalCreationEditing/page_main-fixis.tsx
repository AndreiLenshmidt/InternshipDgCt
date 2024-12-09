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
import {
   useGetTaskByTaskIdQuery,
   useCreateTaskMutation,
   useGetTasksQuery,
   useGetUsersQuery,
   useGetComponentsQuery,
   useGetPrioritiesQuery,
   useGetTaskTypesQuery,
   useSendFilesTaskMutation,
   useDeleteFileTaskMutation,
} from '@/modules/TaskModalCreationEditing/api/taskApiActions';
import { TaskSingle, User, Component, Priority, TaskType, ResponseFile } from '@/api/data.types';
import { mapTaskType } from './utils/transformTaskSingle';
import { typesTasksOptions, compOptions, priorOptions, usersOptions } from '@/modules/TaskModalCreationEditing/variors';

interface TaskModalCreationEditingProps {
   isOpen: boolean;
   onClose: () => void;
   slug: string;
   taskId?: number; // Если передан, значит редактируем задачу
}

interface FormData {
   name: string;
   selectedOptionTasks?: TaskType;
   selectedOptionComp?: Component;
   selectedOptionsCheckbox: User[];
   selectedOptionPriority?: Priority;
   estimateMinutes?: string;
   estimate?: string;
   date: {
      startDate: string;
      endDate: string;
   };
   description: string;
   fileLinks?: ResponseFile[];
   layoutLink?: string;
   markupLink?: string;
   devLink?: string;
}

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
            id: z.number().optional(),
            created_at: z.string(),
            updated_at: z.string(),
            original_name: z.string(),
            link: z.string().url('Введите корректный URL').optional(),
         })
      )
      .optional(),
   layoutLink: z.string().optional(),
   markupLink: z.string().optional(),
   devLink: z.string().optional(),
});

export default function TaskModalCreationEditing({ isOpen, onClose, slug, taskId }: TaskModalCreationEditingProps) {
   const [isModalOpen, setModalOpen] = useState(false);
   const [files, setFiles] = useState<ResponseFile[]>([]);

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
         selectedOptionTasks: { id: 0, name: '' },
         selectedOptionComp: { id: 0, name: '', color: '' },
         selectedOptionsCheckbox: [],
         selectedOptionPriority: { id: 0, name: '' },
         estimateMinutes: '',
         estimate: '',
         date: { startDate: null, endDate: null },
         description: '',
         fileLinks: [],
         layoutLink: '',
         markupLink: '',
         devLink: '',
      },
   });

   const { data: taskData, isLoading: isGetTaskByTaskIdLoading } = useGetTaskByTaskIdQuery(taskId || 0);
   const { data: components = [], isLoading: isGetComponentsLoading } = useGetComponentsQuery();
   const { data: priorities = [], isLoading: isGetPrioritiesLoading } = useGetPrioritiesQuery();
   const { data: taskTypes = [], isLoading: isGetTaskTypesLoading } = useGetTaskTypesQuery();
   const { data: users = [], isLoading: isGetUsersLoading } = useGetUsersQuery(slug);

   const [createTask, { isLoading: isCreateLoading, isSuccess: createIsSuccess, error: createError }] =
      useCreateTaskMutation();

   const handleCreateTask = async (slugName: string, taskData: FormData) => {
      const taskDataTransform = transformToServerData(taskData);

      try {
         const response = await createTask({ slug: slugName, body: taskDataTransform }).unwrap();
         console.log('Задача успешно создана:', response);
      } catch (err) {
         console.error('Ошибка при создании задачи:', err);
      }
   };

   const transformToServerData = (formData: FormData) => {
      const selectedIds = formData.selectedOptionsCheckbox?.map((option) => option.id) || [];

      return {
         name: formData.name || '',
         description: formData.description || '',
         stage_id: 2, // ID стадии (обязательно) приоритет ??? !!!
         task_type_id: formData.selectedOptionTasks?.id || 0,
         component_id: formData.selectedOptionComp?.id || 0,
         priority_id: formData.selectedOptionPriority?.id || 0,
         block_id: 0,
         related_id: 0,
         estimate_cost: 0,
         estimate_worker: formData.estimateMinutes || 0,
         layout_link: formData.layoutLink || '',
         markup_link: formData.markupLink || '',
         dev_link: formData.devLink || '',
         executors: selectedIds.length > 0 ? selectedIds : [0],
         begin: formData.date?.startDate || '',
         end: formData.date?.endDate || '',
      };
   };

   const handleTaskTypeChange = (value: TaskType) => {
      setValue('selectedOptionTasks', value);
   };

   const handleComponentChange = (value: Component) => {
      setValue('selectedOptionComp', value);
   };

   const handleUsersChange = (value: User[]) => {
      setValue('selectedOptionsCheckbox', value);
   };

   const handlePriorityChange = (value: Priority) => {
      setValue('selectedOptionPriority', value);
      clearErrors('selectedOptionPriority');
   };

   const handleEstimateChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setValue('estimate', value.match(/^\d+$/) ? `${value}м` : value);
   };

   const onBlurFilesChange = (e: React.FocusEvent<HTMLInputElement>) => {
      const rawValue = e.target.value;
      const parsed = parseEstimate(rawValue);
      setValue('estimate', parsed, { shouldValidate: false });
      setValue('estimateMinutes', rawValue, { shouldValidate: true });
   };

   const handleFilesChange = (newFiles: ResponseFile[]) => {
      const updatedFiles: ResponseFile[] = newFiles.map((file) => ({
         ...file,
         id: file.id || Math.floor(Math.random() * 1000),
      }));
      setValue('fileLinks', updatedFiles);
      setFiles(updatedFiles);
   };

   const handleCloseModal = () => {
      setModalOpen(false);
   };

   const handleConfirm = () => {
      setModalOpen(false);
      onClose();
   };

   const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
         setModalOpen(true);
      }
   };

   const onSubmit = (data: FormData) => {
      console.log('*************** onSubmit ***************');
      console.log('data', data);

      const serverData = transformToServerData(data);

      console.log('serverData', serverData);

      if (serverData) handleCreateTask(slug, data);

      if (data.fileLinks?.length > 0) {
         handleFileUpload(data.fileLinks);
         handleFileTaskLinked(27, 61);
      }
   };

   if (!isOpen) return null;
   if (
      isGetTaskByTaskIdLoading ||
      isGetComponentsLoading ||
      isGetPrioritiesLoading ||
      isGetTaskTypesLoading ||
      isGetUsersLoading
   )
      return <div>Loading...</div>;

   return (
      <div className={style['modal-creation-editing']} onClick={handleOverlayClick}>
         <button className={style['close-button-modal']} type="button" onClick={() => setModalOpen(true)}>
            <Close />
         </button>

         <div className={style.wrapper}>
            <div className={style.heder}>
               <h2 className={style.title}>{taskId ? 'Редактировать задачу' : 'Создать задачу'}</h2>

               <button className={style['close-button']} type="button" onClick={() => setModalOpen(true)}>
                  <Close />
               </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
               <div className={`${style['form-title']} ${errors.name ? style['error-title'] : ''}`}>
                  <label>
                     Название <span>*</span>
                  </label>
                  <input {...register('name')} className={style['form-input']} placeholder="Название" />
                  {errors.name && <p className={style.error}>{errors.name.message}</p>}
               </div>

               <div className={style['form-selects']}>
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

                  <div className={style['form-select']}>
                     <SelectCustom<Component>
                        value={watch('selectedOptionComp')}
                        onChange={handleComponentChange}
                        options={components}
                        label="Компонент"
                        titleSelect="Не выбран"
                        required
                     />
                     {errors.selectedOptionComp && <p className={style.error}>{errors.selectedOptionComp.message}</p>}
                  </div>

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
                  <div className={style['form-select']}>
                     <SelectCustom<Priority>
                        value={watch('selectedOptionPriority')}
                        onChange={handlePriorityChange}
                        options={priorities}
                        label="Приоритет"
                        titleSelect="Приоритет"
                        required
                     />

                     {errors.selectedOptionPriority && (
                        <p className={style.error}>{errors.selectedOptionPriority.message}</p>
                     )}
                  </div>

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

               <div className={style['form-date-start']}>
                  <Controller
                     name="date"
                     control={control}
                     render={({ field }) => <CalendarCustom value={field.value} onChange={field.onChange} />}
                  />

                  {errors.date && <p className={style.error}>{errors.date.message}</p>}
               </div>

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

               <div className={style['form-files']}>
                  <Controller
                     name="fileLinks"
                     control={control}
                     render={({ field: { value, onChange }, fieldState: { error } }) => (
                        <FileUpload
                           files={files || []}
                           onFilesChange={(newFiles) => {
                              onChange(newFiles);
                              handleFilesChange(newFiles);
                           }}
                           error={error?.message}
                        />
                     )}
                  />
               </div>

               <div className={style['form-links-files']}>
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

               <div className={style['actions']}>
                  <button type="submit" className={style['btn_blue']} onClick={() => onSubmit}>
                     {taskId ? 'Сохранить' : 'Добавить'}
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
