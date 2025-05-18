import { getTransactions } from './transactions.js';
import { renderTransaction, setupFormHandler, setupDeleteHandler, updateTotal } from './ui.js';

function init() {
  // Отрисовываем существующие транзакции при загрузке
  getTransactions().forEach(transaction => {
    renderTransaction(transaction);
  });
  
  updateTotal();
  setupFormHandler();
  setupDeleteHandler();
}

document.addEventListener('DOMContentLoaded', init);