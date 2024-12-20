const incomeDescription = document.getElementById('income-description');
const incomeAmount = document.getElementById('income-amount');
const expenseDescription = document.getElementById('expense-description');
const expenseCategory = document.getElementById('expense-category');
const expenseAmount = document.getElementById('expense-amount');
const transactionHistory = document.getElementById('transaction-history');
const totalIncomeDisplay = document.getElementById('total-income');
const totalExpenseDisplay = document.getElementById('total-expense');
const balanceDisplay = document.getElementById('balance');
const notification = document.getElementById('notification');

let totalIncome = 0;
let totalExpense = 0;

function addIncome() {
    const description = incomeDescription.value.trim();
    const amount = parseFloat(incomeAmount.value);

    if (!description || isNaN(amount) || amount <= 0) {
        showNotification('Please enter a valid income description and amount.');
        return;
    }

    addTransactionToHistory(description, 'Income', amount);
    totalIncome += amount;
    updateSummary();
    clearInputs();
    showNotification('Income added successfully!');
}

function addExpense() {
    const description = expenseDescription.value.trim();
    const category = expenseCategory.value;
    const amount = parseFloat(expenseAmount.value);

    if (!description || isNaN(amount) || amount <= 0) {
        showNotification('Please enter a valid expense description and amount.');
        return;
    }

    addTransactionToHistory(description, category, amount);
    totalExpense += amount;
    updateSummary();
    clearInputs();
    showNotification('Expense added successfully!');
}

function addTransactionToHistory(description, category, amount) {
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${description}</td>
        <td>${category}</td>
        <td>${amount.toFixed(2)}</td>
        <td>${category === 'Income' ? 'Income' : 'Expense'}</td>
        <td><button onclick="deleteTransaction(this, ${amount}, '${category}')">Delete</button></td>
    `;

    transactionHistory.appendChild(row);
}

function deleteTransaction(button, amount, category) {
    const row = button.parentElement.parentElement;
    transactionHistory.removeChild(row);

    if (category === 'Income') {
        totalIncome -= amount;
    } else {
        totalExpense -= amount;
    }

    updateSummary();
    showNotification('Transaction deleted successfully!');
}

function updateSummary() {
    totalIncomeDisplay.textContent = totalIncome.toFixed(2);
    totalExpenseDisplay.textContent = totalExpense.toFixed(2);
    balanceDisplay.textContent = (totalIncome - totalExpense).toFixed(2);
}

function clearInputs() {
    incomeDescription.value = '';
    incomeAmount.value = '';
    expenseDescription.value = '';
    expenseCategory.value = 'Housing';
    expenseAmount.value = '';
}

function clearTransactions() {
    transactionHistory.innerHTML = '';
    totalIncome = 0;
    totalExpense = 0;
    updateSummary();
    showNotification('All transactions cleared!');
}

function showNotification(message) {
    notification.textContent = message;
    notification.classList.remove('hidden');

    setTimeout(() => {
        notification.classList.add('hidden');
    }, 2000);
}
