import { getTasks, saveTasks } from './storage.js';
import { renderTaskList, updateTaskCounters } from './ui.js';

// Глобальные переменные для хранения задач и текущего фильтра
let tasks = getTasks();
let currentFilter = 'all';

// Основная функция инициализации приложения
export function initTodoApp() {
  // Первоначальная отрисовка списка задач и счетчиков
  renderTaskList(tasks, currentFilter);
  updateTaskCounters(tasks);

  // Обработчики событий:
  // Добавление новой задачи по кнопке
  document.getElementById('addButton').addEventListener('click', addTask);
  // Добавление новой задачи по нажатию Enter
  document.getElementById('todoInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addTask();
  });
  
  // Очистка выполненных задач
  document.getElementById('clearCompleted').addEventListener('click', clearCompletedTasks);
  // Удаление всех задач
  document.getElementById('deleteAll').addEventListener('click', deleteAllTasks);
  
  // Фильтрация задач (Все/Активные/Выполненные)
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      // Удаляем класс active у всех кнопок фильтра
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      // Добавляем класс active текущей кнопке
      btn.classList.add('active');
      // Устанавливаем текущий фильтр
      currentFilter = btn.dataset.filter;
      // Перерисовываем список задач
      renderTaskList(tasks, currentFilter);
    });
  });
}

// Функция добавления новой задачи
function addTask() {
  const input = document.getElementById('todoInput');
  const text = input.value.trim();
  
  if (text) {
    // Создаем новую задачу с уникальным ID, текстом и датой создания
    tasks.push({
      id: Date.now(), // Используем timestamp как ID
      text,
      completed: false,
      createdAt: new Date().toISOString()
    });
    
    // Сохраняем задачи в локальное хранилище 
    saveTasks(tasks);
    // Очищаем поле ввода
    input.value = '';
    // Перерисовываем список и обновляем счетчики
    renderTaskList(tasks, currentFilter);
    updateTaskCounters(tasks);
  }
}

// Переключение статуса задачи (выполнена/не выполнена)
export function toggleTask(taskId) {
  // Находим задачу по ID
  const task = tasks.find(t => t.id === taskId);
  if (task) {
    // Инвертируем статус выполнения
    task.completed = !task.completed;
    // Сохраняем изменения
    saveTasks(tasks);
    // Перерисовываем список и обновляем счетчики
    renderTaskList(tasks, currentFilter);
    updateTaskCounters(tasks);
  }
}

// Редактирование текста задачи
export function editTask(taskId, newText) {
  // Находим задачу по ID
  const task = tasks.find(t => t.id === taskId);
  if (task) {
    // Обновляем текст задачи
    task.text = newText;
    // Сохраняем изменения
    saveTasks(tasks);
    // Перерисовываем список
    renderTaskList(tasks, currentFilter);
  }
}

// Удаление задачи
export function deleteTask(taskId) {
  // Фильтруем массив, оставляя только задачи с другим ID
  tasks = tasks.filter(t => t.id !== taskId);
  // Сохраняем изменения
  saveTasks(tasks);
  // Перерисовываем список и обновляем счетчики
  renderTaskList(tasks, currentFilter);
  updateTaskCounters(tasks);
}

// Очистка выполненных задач
function clearCompletedTasks() {
  // Оставляем только невыполненные задачи
  tasks = tasks.filter(t => !t.completed);
  // Сохраняем изменения
  saveTasks(tasks);
  // Перерисовываем список и обновляем счетчики
  renderTaskList(tasks, currentFilter);
  updateTaskCounters(tasks);
}

// Удаление всех задач
function deleteAllTasks() {
  // Подтверждение действия
  if (confirm('Are you sure you want to delete all tasks?')) {
    // Очищаем массив задач
    tasks = [];
    // Сохраняем изменения
    saveTasks(tasks);
    // Перерисовываем список и обновляем счетчики
    renderTaskList(tasks, currentFilter);
    updateTaskCounters(tasks);
  }
}