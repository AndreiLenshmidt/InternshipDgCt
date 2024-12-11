import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormData, TaskType, Component, User, Priority, ResponseFileWithObject } from './types';

interface TaskFormProps {
   initialData: FormData;
   onSubmit: (data: FormData) => void;
   //  taskTypes: TaskType[];
   //  components: Component[];
   //  priorities: Priority[];
   //  users: User[];
}

export default function TaskForm({ initialData, onSubmit }: TaskFormProps) {
   const [taskData, setTaskData] = useState<TaskSingle>();

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
         selectedOptionsCheckbox: taskData?.users || [],
         selectedOptionPriority: taskData?.priority || { id: 0, name: '' },

         stage_id: 0,
         component_id: 0,
         block_id: 0,

         epic_id: 0,
         release_id: 0,

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
   console.log(errors, '!!! --- errors --- !!!'); //!!!

   useEffect(() => {
      if (taskById) setTaskData(taskById?.data);
   }, [taskById, tasks]);

   return (
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

               {errors.selectedOptionPriority && <p className={style.error}>{errors.selectedOptionPriority.message}</p>}
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
                     taskId={idTaskMain}
                     files={files || []}
                     onFilesChange={(newFiles) => {
                        onChange(newFiles);

                        if (handleFilesChange) {
                           handleFilesChange(newFiles);
                        }
                     }}
                     // disabled={!taskData?.can_attach_file} // Разрешение на загрузку файлов // taskData.can_attach_file
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
   );
}
