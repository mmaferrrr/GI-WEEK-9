// Define a class called Budget
class Budget {
    // Constructor function that initializes income, expenses, and transactions arrays
    constructor() {
        this.income = []; // Array to store income transactions
        this.expenses = []; // Array to store expense transactions
        this.transactions = []; // Array to store all transactions
    }

    // Method to add income to the budget
    addIncome(description, amount) {
        // Validate input
        if (!description || !amount || isNaN(amount) || amount <= 0) {
            alert("Please enter a valid description and amount for income.");
            return;
        }
        // Add income object to the income array
        this.income.push({ description, amount: parseFloat(amount) });
        // Add transaction object to the transactions array
        this.transactions.push({ type: 'income', description, amount: parseFloat(amount) });
        this.calculateBudget(); // Calculate and update the budget
    }

    // Method to add expense to the budget
    addExpense(description, amount) {
        // Validate input
        if (!description || !amount || isNaN(amount) || amount <= 0) {
            alert("Please enter a valid description and amount for expense.");
            return;
        }
        // Add expense object to the expenses array
        this.expenses.push({ description, amount: parseFloat(amount) });
        // Add transaction object to the transactions array
        this.transactions.push({ type: 'expense', description, amount: parseFloat(amount) });
        this.calculateBudget(); // Calculate and update the budget
    }

    // Method to calculate the total budget and update UI
    calculateBudget() {
        // Calculate total income by summing up all income amounts
        const totalIncome = this.income.reduce((acc, curr) => acc + curr.amount, 0);
        // Calculate total expenses by summing up all expense amounts
        const totalExpenses = this.expenses.reduce((acc, curr) => acc + curr.amount, 0);
        // Calculate total budget by subtracting total expenses from total income
        const totalBudget = totalIncome - totalExpenses;
        // Update UI with total income, total expenses, and total budget
        document.getElementById('totalIncome').textContent = totalIncome.toFixed(2);
        document.getElementById('totalExpenses').textContent = totalExpenses.toFixed(2);
        document.getElementById('totalBudget').textContent = totalBudget.toFixed(2);
        this.displayHistory(); // Display transaction history
    }

    // Method to display transaction history
    displayHistory() {
        const historyList = document.getElementById('history');
        historyList.innerHTML = ''; // Clear existing history list
        // Iterate over each transaction and create list items
        this.transactions.forEach((transaction, index) => {
            const item = document.createElement('li');
            const sign = transaction.type === 'income' ? '+' : '-';
            // Display transaction description and amount
            item.textContent = `${transaction.description}: ${sign} $${Math.abs(transaction.amount)}`;
            item.classList.add(transaction.type === 'income' ? 'plus' : 'minus');
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete'; // Create delete button
            deleteButton.classList.add('delete-btn');
            // Add event listener to delete button to remove transaction
            deleteButton.addEventListener('click', () => {
                this.deleteTransaction(index);
            });
            item.appendChild(deleteButton);
            historyList.appendChild(item); // Add transaction item to history list
        });
    }

    // Method to delete a transaction
    deleteTransaction(index) {
        const deletedTransaction = this.transactions[index];
        // Remove the transaction from the respective income or expenses array
        if (deletedTransaction.type === 'income') {
            const deletedIncomeIndex = this.income.findIndex(transaction => transaction.description === deletedTransaction.description && transaction.amount === deletedTransaction.amount);
            if (deletedIncomeIndex !== -1) {
                this.income.splice(deletedIncomeIndex, 1);
            }
        } else if (deletedTransaction.type === 'expense') {
            const deletedExpenseIndex = this.expenses.findIndex(transaction => transaction.description === deletedTransaction.description && transaction.amount === deletedTransaction.amount);
            if (deletedExpenseIndex !== -1) {
                this.expenses.splice(deletedExpenseIndex, 1);
            }
        }
        // Remove the transaction from the transactions array
        this.transactions.splice(index, 1);
        this.calculateBudget(); // Recalculate the budget after deleting the transaction
    }
}

// Create a new instance of the Budget class
const budgetTracker = new Budget();

// Add event listener to the 'Add Income' button
document.getElementById('addIncome').addEventListener('click', function() {
    const description = document.getElementById('description').value;
    const amount = document.getElementById('amount').value;
    budgetTracker.addIncome(description, amount);
});

// Add event listener to the 'Add Expense' button
document.getElementById('addExpense').addEventListener('click', function() {
    const description = document.getElementById('description').value;
    const amount = document.getElementById('amount').value;
    budgetTracker.addExpense(description, amount);
});
