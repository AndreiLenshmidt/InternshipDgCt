import React, { useState, useEffect, ChangeEvent } from 'react';
import Close from '@public/icons/close.svg';
import style from '@/modules/TaskModalCreationEditing/TaskModalCreationEditing.module.scss';
import ModalClose from '@/components/ModalClose';
import SelectCustom from '@/components/SelectCustom';
import SelectCustomCheckbox from '@/components/SelectCustomCheckbox';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import CalendarCustom from '@/components/CalendarCustom';
import TextAreaWithToolbar from '@/components/TextAreaWithToolbar';

interface TaskModalCreationEditingProps {
  isOpen: boolean;
  onClose: () => void;
  taskId?: string; // Если передан, значит редактируем задачу
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
  fileLinks: string[];
};

export default function TaskModalCreationEditing({
  isOpen,
  onClose,
  taskId,
}: TaskModalCreationEditingProps) {
  const [title, setTitle] = useState('');
  const [taskType, setTaskType] = useState('');
  const [selectedOptionTasks, setSelectedOptionTasks] = useState('');
  const [selectedOptionComp, setSelectedOptionComp] = useState('');
  const [selectedOptionUsers, setSelectedOptionUsers] = useState('');
  const [selectedOptionsCheckbox, setSelectedOptionsCheckbox] = useState<
    string[]
  >([]);
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
  const [error, setError] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const [isModalOpen, setModalOpen] = useState(false);

  // схема валидации min(3, 'Ошибка'),
  const formSchema = z.object({
    title: z.string().min(3, 'Ошибка'),
    selectedOptionTasks: z.string().min(1, 'Тип задачи обязателен'),
    selectedOptionComp: z.string().min(1, 'Компонент обязателен'),
    selectedOptionsCheckbox: z
      .array(z.string())
      .min(1, 'Выберите хотя бы одного исполнителя'),

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
    description: z
      .string()
      .min(10, 'Описание должно содержать не менее 10 символов'),
    fileLinks: z.array(z.string().url('Введите корректный URL')).optional(),
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
    },
  });

  // отправляем данные формы -------------------------------------------------
  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValueMain(inputValue);
    setTitle(inputValue);
    if (isTouched) {
      // setError(validate(inputValue));
    }
  };

  // Загрузка данных из API переделать берем из Redux??? !!!
  useEffect(() => {
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
  }, [isOpen, isEditMode, taskId]);

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

  const [options, setOptions] = useState<string[]>([
    'Option 1',
    'Option 2',
    'Option 3',
  ]);

  console.log(startDate, '------------startDate ');

  return (
    <div
      className={style['modal-creation-editing']}
      onClick={handleOverlayClick}
    >
      <button
        className={style['close-button-modal']}
        onClick={() => setModalOpen(true)}
      >
        <Close />
      </button>

      <div className={style.wrapper}>
        <div className={style.heder}>
          <h2 className={style.title}>
            {isEditMode ? 'Редактировать задачу' : 'Создать задачу'}
          </h2>

          <button
            className={style['close-button']}
            onClick={() => setModalOpen(true)}
          >
            <Close />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
          {/* Название */}
          <div
            className={`${style['form-title']} ${
              errors.title ? style['error-title'] : ''
            }`}
          >
            <label>
              Название <span>*</span>
            </label>
            <input
              {...register('title')}
              className={style['form-input']}
              placeholder="Название"
            />
            {errors.title && (
              <p className={style.error}>{errors.title.message}</p>
            )}
          </div>

          {/* Selects */}
          <div className={style['form-selects']}>
            <div className={style['form-select']}>
              <SelectCustom<string>
                value={watch('selectedOptionTasks')}
                onChange={(value) => setValue('selectedOptionTasks', value)}
                options={options}
                label="Тип задачи"
                titleSelect="Задачи"
                required
              />
              {errors.selectedOptionTasks && (
                <p className={style.error}>
                  {errors.selectedOptionTasks.message}
                </p>
              )}
            </div>
            <div className={style['form-select']}>
              <SelectCustom<string>
                value={watch('selectedOptionComp')}
                onChange={(value) => setValue('selectedOptionComp', value)}
                options={[
                  'Задача',
                  'Баг',
                  'Улучшение',
                  'Новая функциональность',
                  'Эпик',
                  'Релиз',
                  'Бэклог',
                ]}
                label="Компонент"
                titleSelect="Не выбран"
                required
              />
              {errors.selectedOptionComp && (
                <p className={style.error}>
                  {errors.selectedOptionComp.message}
                </p>
              )}
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
                <p className={style.error}>
                  {errors.selectedOptionsCheckbox.message}
                </p>
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
                <p className={style.error}>
                  {errors.selectedOptionPriority.message}
                </p>
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
              {errors.estimateMinutes && (
                <p className={style.error}>{errors.estimateMinutes.message}</p>
              )}
            </div>
          </div>

          {/* ---------- Даты ---------- */}
          <div className={style['form-date-start']}>
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <CalendarCustom value={field.value} onChange={field.onChange} />
              )}
            />
            {errors.startDate && <p>{errors.startDate.message}</p>}
            {errors.endDate && <p>{errors.endDate.message}</p>}
          </div>

          <div className={style['form-date-end']}></div>

          {/* Описание */}
          <div className={style['form-description']}>
            <label>
              Описание <span>*</span>
            </label>

            <TextAreaWithToolbar />

            {/* <textarea {...register('description')} required /> */}

            {errors.description && (
              <p className={style.error}>{errors.description.message}</p>
            )}
          </div>

          {/* Ссылки на файлы */}
          <div className={style['form-links-files']}>
            <label>Ссылки на файлы</label>
            <Controller
              name="fileLinks"
              control={control}
              render={({ field }) => (
                <input
                  type="text"
                  value={field.value.join(', ')}
                  onChange={(e) => field.onChange(e.target.value.split(', '))}
                  placeholder="Введите ссылки через запятую"
                />
              )}
            />
            {errors.fileLinks && (
              <p className={style.error}>{errors.fileLinks.message}</p>
            )}
          </div>

          {/* Кнопки */}
          <div className="actions">
            <button
              type="submit"
              className="btn btn_blue"
              onClick={() => onSubmit}
            >
              {isEditMode ? 'Сохранить' : 'Добавить'}
            </button>
            <button type="button" className="btn" onClick={onClose}>
              Отменить
            </button>
          </div>
        </form>
      </div>

      <ModalClose
        title="Закрыть окно?"
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
