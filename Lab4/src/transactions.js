let transactions = [];

export function addTransaction(transaction) {
  transactions.push(transaction);
  return transaction;
}

export function deleteTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);
}

export function getTransactions() {
  return transactions;
}

export function calculateTotal() {
  return transactions.reduce((total, transaction) => total + transaction.amount, 0);
}