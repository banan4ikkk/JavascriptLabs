export function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

export function formatDate(date) {
  return new Date(date).toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}