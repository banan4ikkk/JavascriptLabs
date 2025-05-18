import { toggleTask, editTask, deleteTask } from './tasks.js';

// Функция отрисовки списка задач
export function renderTaskList(tasks, filter = 'all') {
  const todoList = document.getElementById('todoList');
  // Очищаем список перед обновлением
  todoList.innerHTML = '';
  
  // Фильтруем задачи согласно выбранному фильтру
  const filteredTasks = filterTasks(tasks, filter);
  
  // Если задач нет - показываем сообщение
  if (filteredTasks.length === 0) {
    todoList.innerHTML = '<li class="empty-message">No tasks found</li>';
    return;
  }
  
  // Создаем элементы для каждой задачи
  filteredTasks.forEach(task => {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.dataset.id = task.id;
    
    // Шаблон HTML для задачи
    li.innerHTML = `
      <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
      <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
      <div class="task-actions">
        <button class="edit-btn">✏️</button>
        <button class="delete-btn">🗑️</button>
      </div>
    `;
    
    // Обработчик изменения статуса задачи
    li.querySelector('.task-checkbox').addEventListener('change', () => toggleTask(task.id));
    
    const taskText = li.querySelector('.task-text');
    const editBtn = li.querySelector('.edit-btn');
    
    // Обработчик редактирования задачи
    editBtn.addEventListener('click', () => {
      const currentText = task.text;
      // Создаем поле ввода для редактирования
      const input = document.createElement('input');
      input.type = 'text';
      input.value = currentText;
      input.className = 'edit-input';
      
      // Заменяем текст на поле ввода
      taskText.replaceWith(input);
      input.focus();
      
      // Функция сохранения изменений
      const saveEdit = () => {
        const newText = input.value.trim();
        // Если текст изменился и не пустой - сохраняем
        if (newText && newText !== currentText) {
          editTask(task.id, newText);
        } else {
          // Иначе просто перерисовываем список
          renderTaskList(tasks, filter);
        }
      };
      
      // Сохраняем при потере фокуса
      input.addEventListener('blur', saveEdit);
      // Сохраняем при нажатии Enter
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') saveEdit();
      });
    });
    
    // Обработчик удаления задачи
    li.querySelector('.delete-btn').addEventListener('click', () => deleteTask(task.id));
    
    // Добавляем задачу в список
    todoList.appendChild(li);
  });
}

// Обновление счетчиков задач
export function updateTaskCounters(tasks) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const active = total - completed;
  
  // Обновляем значения в DOM
  document.getElementById('totalCount').textContent = total;
  document.getElementById('activeCount').textContent = active;
  document.getElementById('completedCount').textContent = completed;
}

// Функция фильтрации задач
function filterTasks(tasks, filter) {
  switch (filter) {
    case 'active':
      return tasks.filter(t => !t.completed);
    case 'completed':
      return tasks.filter(t => t.completed);
    default:
      return tasks;
  }
}