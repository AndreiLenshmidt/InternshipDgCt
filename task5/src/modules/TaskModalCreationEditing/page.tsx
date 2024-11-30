import React, { useState, useEffect, ChangeEvent } from 'react';
import Close from '@public/images/icons/close.svg';
import style from '@/modules/TaskModalCreationEditing/TaskModalCreationEditing.module.scss';
import ModalClose from '@/ui/ModalClose';
import SelectCustom from '@/ui/SelectCustom';
import SelectCustomCheckbox from '@/ui/SelectCustomCheckbox';

interface TaskModalCreationEditingProps {
  isOpen: boolean;
  onClose: () => void;
  taskId?: string; // Если передан, значит редактируем задачу
}

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

  const [errors, setErrors] = useState('');
  const [titleSelect, setTitleSelect] = useState('Задача'); // !!!
  const [itemsOptions, setItemsOptions] = useState([]);

  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  // валидация поля название
  const validate = (value: string) => {
    if (value.length < 3) {
      return 'Минимальная длина — 3 символа';
    }
    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    setTitle(inputValue);
    if (isTouched) {
      setError(validate(inputValue));
    }
  };

  const handleBlur = () => {
    setIsTouched(true);
    setError(validate(value)); // Выполняем валидацию на потере фокуса
  };

  // Загрузка данных из API переделать берем из Redux??? !!!
  useEffect(() => {
    async function fetchData() {
      const [
        taskTypesResponse,
        componentsResponse,
        assigneesResponse,
        prioritiesResponse,
      ] = await Promise.all([
        fetch('/api/task-types').then((res) => res.json()),
        fetch('/api/components').then((res) => res.json()),
        fetch('/api/assignees').then((res) => res.json()),
        fetch('/api/priorities').then((res) => res.json()),
      ]);
      setTaskTypes(taskTypesResponse);
      setComponents(componentsResponse);
      setAvailableAssignees(assigneesResponse);
      setPriorities(prioritiesResponse);

      if (isEditMode) {
        const task = await fetch(`/api/tasks/${taskId}`).then((res) =>
          res.json()
        );
        setTitle(task.title);
        setTaskType(task.taskType);
        setComponent(task.component);
        setAssignees(task.assignees);
        setPriority(task.priority);
        setEstimate(task.estimate);
        setStartDate(task.startDate);
        setEndDate(task.endDate);
        setDescription(task.description);
        setFileLinks(task.fileLinks);
      }
    }
    if (isOpen) fetchData();
  }, [isOpen, isEditMode, taskId]);

  const handleSubmit = () => {
    const taskData = {
      title,
      taskType,
      component,
      assignees,
      priority,
      estimate,
      startDate,
      endDate,
      description,
      fileLinks,
    };

    if (
      !title ||
      !taskType ||
      !component ||
      !assignees.length ||
      !priority ||
      !description
    ) {
      // alert('Заполните все обязательные поля!') // !!! ошибка под полем ввода
      return;
    }

    if (isEditMode) {
      fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        body: JSON.stringify(taskData),
      });
    } else {
      fetch(`/api/tasks`, {
        method: 'POST',
        body: JSON.stringify(taskData),
      });
    }
    onClose();
  };

  const handleEstimateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEstimate(value.match(/^\d+$/) ? `${value}м` : value);
  };

  // модалка "Закрыть окно?"
  const [isModalOpen, setModalOpen] = useState(false);

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

  if (!isOpen) return null;

  const [options, setOptions] = useState<string[]>([
    'Option 1',
    'Option 2',
    'Option 3',
  ]);

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

        <div className={style.form}>
          <div className={style['form-title']}>
            <label>
              Название <span>*</span>
            </label>
            <input
              style={{
                backgroundColor: error ? '#fff1f0' : '#f4f6f8',
              }}
              value={title}
              placeholder="Название"
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {error ? <p className={style.error}>Ошибка</p> : ''}
          </div>

          {/* ------------- select -------------- */}
          <div className={style['form-selects']}>
            <div className={style['form-type-task']}>
              <SelectCustom<string>
                value={selectedOptionTasks}
                onChange={setSelectedOptionTasks}
                options={options}
                label="Тип задачи"
                titleSelect="Задачи"
                required={true}
                // optionRenderer={(option) => option.label}
              />
            </div>
            <div className={style['form-component']}>
              <SelectCustom<string>
                value={selectedOptionComp}
                onChange={setSelectedOptionComp}
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
                required={true}
                // optionRenderer={(option) => option.label}
              />
            </div>
            <div className={style['form-performers']}>
              <SelectCustomCheckbox<string>
                value={selectedOptionsCheckbox}
                onChange={setSelectedOptionsCheckbox}
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
            </div>
          </div>

          {/* ------------- priority estimation -------------- */}
          <div className={style['form-priority']}>
            <label>
              Приоритет <span>*</span>
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              required
            >
              <option value="" disabled>
                Выберите приоритет
              </option>
              {priorities.map((prio) => (
                <option key={prio} value={prio}>
                  {prio}
                </option>
              ))}
            </select>
          </div>
          <div className={style['form-estimation']}>
            <label>Оценка</label>
            <input value={estimate} onChange={handleEstimateChange} />
          </div>

          {/* ------------- data calendar -------------- */}
          <div className={style['form-date-start']}>
            <label>Дата начала</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className={style['form-date-end']}>
            <label>Дата завершения</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          {/* ------------- text aria -------------- */}
          <div className={style['form-description']}>
            <label>
              Описание <span>*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* ------------- files upload -------------- */}
          <div className={style['form-links-files']}>
            <label>Ссылки на файлы</label>
            <input
              type="url"
              value={fileLinks.join(', ')}
              onChange={(e) => setFileLinks(e.target.value.split(', '))}
            />
          </div>

          {/* ------------- link -------------- */}
          <div></div>

          {/* ------------- buttons -------------- */}
          <div className="actions">
            <button className="btn btn_blue" onClick={handleSubmit}>
              {isEditMode ? 'Сохранить' : 'Добавить'}
            </button>
            <button className="btn" onClick={onClose}>
              Отменить
            </button>
          </div>
        </div>

        <ModalClose
          title="Закрыть окно?"
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirm}
        />
      </div>
    </div>
  );
}
