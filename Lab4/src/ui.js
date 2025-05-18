import { addTransaction, deleteTransaction, calculateTotal } from './transactions.js';
import { formatDate, generateId } from './utils.js';

// Функция для отображения транзакции в таблице
export function renderTransaction(transaction) {
  const tableBody = document.querySelector('#transactions-table tbody');
  const row = document.createElement('tr');
  
  row.className = transaction.amount >= 0 ? 'income' : 'expense';
  
  const shortDescription = transaction.description
    .split(' ')
    .slice(0, 4)
    .join(' ');
  
  row.innerHTML = `
    <td>${formatDate(transaction.date)}</td>
    <td>${transaction.category}</td>
    <td>${shortDescription}</td>
    <td>${transaction.amount}</td>
    <td><button class="delete-btn" data-id="${transaction.id}">Удалить</button></td>
  `;
  
  tableBody.appendChild(row);
  
  row.addEventListener('click', () => {
    showTransactionDetails(transaction);
  });
}

function showTransactionDetails(transaction) {
  const detailsElement = document.getElementById('transaction-details');
  detailsElement.innerHTML = `
    <h3>Детали транзакции</h3>
    <p><strong>Дата:</strong> ${formatDate(transaction.date)}</p>
    <p><strong>Категория:</strong> ${transaction.category}</p>
    <p><strong>Описание:</strong> ${transaction.description}</p>
    <p><strong>Сумма:</strong> ${transaction.amount} лей</p>
  `;
}

export function updateTotal() {
  const totalElement = document.getElementById('total-amount');
  totalElement.textContent = calculateTotal();
}

export function setupFormHandler() {
  const form = document.getElementById('transaction-form');
  
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;
    
    // Валидация перенесена перед созданием транзакции
    if (isNaN(amount) || amount === 0) {
      alert('Пожалуйста, введите корректную сумму');
      return;
    }
    
    if (category === '') {
      alert('Пожалуйста, выберите категорию');
      return;
    }
    
    if (description.trim().length < 3) {
      alert('Описание должно содержать минимум 3 символа');
      return;
    }
    
    const transaction = {
      id: generateId(),
      date: new Date(),
      amount,
      category,
      description
    };
    
    addTransaction(transaction);
    renderTransaction(transaction);
    updateTotal();
    
    form.reset();
  });
}

export function setupDeleteHandler() {
  const table = document.querySelector('#transactions-table');
  
  table.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
      const id = event.target.getAttribute('data-id');
      deleteTransaction(id);
      
      const row = event.target.closest('tr');
      row.remove();
      
      updateTotal();
    }
  });
}