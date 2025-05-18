// Получение задач из localStorage
export function getTasks() {
  // Получаем данные из localStorage по ключу 'todoTasks'
  const tasks = localStorage.getItem('todoTasks');
  // Если данные есть - парсим JSON, иначе возвращаем пустой массив
  return tasks ? JSON.parse(tasks) : [];
}

// Сохранение задач в localStorage
export function saveTasks(tasks) {
  // Преобразуем массив задач в JSON и сохраняем в localStorage
  localStorage.setItem('todoTasks', JSON.stringify(tasks));
}