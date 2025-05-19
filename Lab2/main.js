
const transactions = [
   {
      transaction_id: "1",
      transaction_date: "2019-01-01",
      transaction_amount: 100.0,
      transaction_type: "debit",
      transaction_description: "Payment for groceries",
      merchant_name: "SuperMart",
      card_type: "Visa",
    },
    {
      transaction_id: "2",
      transaction_date: "2019-01-02",
      transaction_amount: 50.0,
      transaction_type: "credit",
      transaction_description: "Refund for returned item",
      merchant_name: "OnlineShop",
      card_type: "MasterCard",
    },
    {
      transaction_id: "3",
      transaction_date: "2019-01-03",
      transaction_amount: 75.0,
      transaction_type: "debit",
      transaction_description: "Dinner with friends",
      merchant_name: "RestaurantABC",
      card_type: "Amex",
    },
    {
      transaction_id: "4",
      transaction_date: "2019-01-04",
      transaction_amount: 120.0,
      transaction_type: "debit",
      transaction_description: "Shopping at Mall",
      merchant_name: "FashionStoreXYZ",
      card_type: "Discover",
    },
    {
      transaction_id: "5",
      transaction_date: "2019-01-05",
      transaction_amount: 25.0,
      transaction_type: "credit",
      transaction_description: "Returned defective product",
      merchant_name: "ElectronicsShop",
      card_type: "Visa",
    },
    {
      transaction_id: "6",
      transaction_date: "2019-01-06",
      transaction_amount: 60.0,
      transaction_type: "debit",
      transaction_description: "Gasoline refill",
      merchant_name: "GasStationXYZ",
      card_type: "MasterCard",
    },
    {
      transaction_id: "7",
      transaction_date: "2019-01-07",
      transaction_amount: 40.0,
      transaction_type: "debit",
      transaction_description: "Lunch with colleagues",
      merchant_name: "Cafe123",
      card_type: "Visa",
    },
    {
      transaction_id: "8",
      transaction_date: "2019-01-08",
      transaction_amount: 90.0,
      transaction_type: "debit",
      transaction_description: "Movie tickets",
      merchant_name: "CinemaXYZ",
      card_type: "Amex",
    },
    {
      transaction_id: "9",
      transaction_date: "2019-01-09",
      transaction_amount: 150.0,
      transaction_type: "debit",
      transaction_description: "Weekend getaway",
      merchant_name: "ResortABC",
      card_type: "Discover",
    },
    {
      transaction_id: "10",
      transaction_date: "2019-01-10",
      transaction_amount: 20.0,
      transaction_type: "credit",
      transaction_description: "Cashback reward",
      merchant_name: "BankXYZ",
      card_type: "Visa",
    },
    {
      transaction_id: "11",
      transaction_date: "2019-01-11",
      transaction_amount: 65.0,
      transaction_type: "debit",
      transaction_description: "Dinner with family",
      merchant_name: "FamilyRestaurant",
      card_type: "MasterCard",
    },
    {
      transaction_id: "12",
      transaction_date: "2019-01-12",
      transaction_amount: 30.0,
      transaction_type: "credit",
      transaction_description: "Returned books",
      merchant_name: "BookstoreABC",
      card_type: "Visa",
    },
  
];

// --- ФУНКЦИИ ---
/**
 * Функция для получения уникальных типов транзакций.
 * @param {Array} transactions - Массив транзакций.
 * @returns {Array} - Массив уникальных типов транзакций.
 */
function getUniqueTransactionTypes(transactions) {
  return [...new Set(transactions.map(transaction => transaction.transaction_type))];
}

/**
 * Функция для вычисления общей суммы всех транзакций.
 * @param {Array} transactions - Массив транзакций.
 * @returns {number} - Общая сумма транзакций.
 */
function calculateTotalAmount(transactions) {
  return transactions.reduce((sum, transaction) => sum + transaction.transaction_amount, 0);
}


/**
 * Функция для получения транзакций определенного типа.
 * @param {Array} transactions - Массив транзакций.
 * @param {string} type - Тип транзакции 
 * @returns {Array} - Массив транзакций указанного типа.
 */
function getTransactionByType(transactions, type) {
  return transactions.filter(transaction => transaction.transaction_type === type);
}

/**
 * Функция для получения транзакций в указанном диапазоне дат.
 * @param {Array} transactions - Массив транзакций.
 * @param {string} startDate - Начальная дата в формате "YYYY-MM-DD".
 * @param {string} endDate - Конечная дата в формате "YYYY-MM-DD".
 * @returns {Array} - Массив транзакций в заданном диапазоне.
 */
function getTransactionsInDateRange(transactions, startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return transactions.filter(transaction => {
    const date = new Date(transaction.transaction_date);
    return date >= start && date <= end;
  });
}

/**
 * Функция для получения транзакций от указанного магазина.
 * @param {Array} transactions - Массив транзакций.
 * @param {string} merchantName - Название магазина.
 * @returns {Array} - Массив транзакций указанного магазина.
 */
function getTransactionsByMerchant(transactions, merchantName) {
  return transactions.filter(transaction => transaction.merchant_name === merchantName);
}

/**
 * Функция для вычисления среднего значения транзакций.
 * @param {Array} transactions - Массив транзакций.
 * @returns {number} - Среднее значение транзакций.
 */
function calculateAverageTransactionAmount(transactions) {
  if (transactions.length === 0) return 0;
  return calculateTotalAmount(transactions) / transactions.length;
}

/**
 * Функция для получения транзакций в указанном диапазоне суммы.
 * @param {Array} transactions - Массив транзакций.
 * @param {number} minAmount - Минимальная сумма.
 * @param {number} maxAmount - Максимальная сумма.
 * @returns {Array} - Массив транзакций с суммами в диапазоне.
 */
function getTransactionsByAmountRange(transactions, minAmount, maxAmount) {
  return transactions.filter(transaction =>
    transaction.transaction_amount >= minAmount && transaction.transaction_amount <= maxAmount
  );
}

/**
 * Функция для вычисления общей суммы дебетовых транзакций.
 * @param {Array} transactions - Массив транзакций.
 * @returns {number} - Общая сумма дебетовых транзакций.
 */
function calculateTotalDebitAmount(transactions) {
  return calculateTotalAmount(getTransactionByType(transactions, "debit"));
}

function findMostTransactionsMonth(transactions) {
  const count = {};
  transactions.forEach(transaction => {
    const month = transaction.transaction_date.slice(0, 7); 
    count[month] = (count[month] || 0) + 1;
  });
  return Object.entries(count).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";
}
/**
 * Функция для нахождения месяца с наибольшим количеством дебетовых транзакций.
 * @param {Array} transactions - Массив транзакций.
 * @returns {number} - Месяц с наибольшим количеством дебетовых транзакций.
 */
function findMostDebitTransactionMonth(transactions) {
  return findMostTransactionsMonth(getTransactionByType(transactions, "debit"));
}

/**
 * Функция для нахождения типа транзакций, которых больше всего.
 * @param {Array} transactions - Массив транзакций.
 * @returns {string} - "debit", "credit" или "equal".
 */
function mostTransactionTypes(transactions) {
  const debit = getTransactionByType(transactions, "debit").length;
  const credit = getTransactionByType(transactions, "credit").length;
  if (debit > credit) return "debit";
  if (credit > debit) return "credit";
  return "equal";
}

/**
 * Функция для получения транзакций до указанной даты.
 * @param {Array} transactions - Массив транзакций.
 * @param {string} date - Дата в формате "YYYY-MM-DD".
 * @returns {Array} - Массив транзакций до указанной даты.
 */
function getTransactionsBeforeDate(transactions, date) {
  const target = new Date(date);
  return transactions.filter(transaction => new Date(transaction.transaction_date) < target);
}

/**
 * Функция для поиска транзакции по ее уникальному идентификатору.
 * @param {Array} transactions - Массив транзакций.
 * @param {string} id - Уникальный идентификатор транзакции.
 * @returns {Object|null} - Транзакция с указанным id или null.
 */
function findTransactionById(transactions, id) {
  return transactions.find(transaction => transaction.transaction_id === id) || null;
}

/**
 * Функция для получения массива описаний транзакций.
 * @param {Array} transactions - Массив транзакций.
 * @returns {Array} - Массив описаний транзакций.
 */
function mapTransactionDescriptions(transactions) {
  return transactions.map(transaction => transaction.transaction_description);
}

// --- ТЕСТЫ ---

console.log("Уникальные типы:", getUniqueTransactionTypes(transactions));
console.log("Общая сумма транзакций:", calculateTotalAmount(transactions));
console.log("Только дебетовые транзакции:", getTransactionByType(transactions, "debit"));
console.log("Транзакции с 2019-01-03 по 2019-01-07:", getTransactionsInDateRange(transactions, "2019-01-03", "2019-01-07"));
console.log("Транзакции от 'Cafe123':", getTransactionsByMerchant(transactions, "Cafe123"));
console.log(" Средняя сумма транзакций:", calculateAverageTransactionAmount(transactions));
console.log(" Транзакции в диапазоне 60 - 100:", getTransactionsByAmountRange(transactions, 60, 100));
console.log(" Общая сумма дебетовых транзакций:", calculateTotalDebitAmount(transactions));
console.log(" Месяц с наибольшим количеством дебетовых транзакций:", findMostDebitTransactionMonth(transactions));
console.log(" Преобладающий тип транзакций:", mostTransactionTypes(transactions));
console.log(" Транзакции до 2019-01-05:", getTransactionsBeforeDate(transactions, "2019-01-05"));
console.log(" Поиск транзакции по ID = '2':", findTransactionById(transactions, "2"));
console.log(" Все описания транзакций:", mapTransactionDescriptions(transactions));