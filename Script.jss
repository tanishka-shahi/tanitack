const expenseForm = document.getElementById("expenseForm");
const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");
const expenseCategory = document.getElementById("expenseCategory");

const expenseList = document.getElementById("expenseList");
const totalAmount = document.getElementById("totalAmount");
const expenseCount = document.getElementById("expenseCount");

let expenses = JSON.parse(localStorage.getItem("tanitrack_expenses")) || [];

renderExpenses();

expenseForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = expenseName.value.trim();
    const amount = parseFloat(expenseAmount.value);
    const category = expenseCategory.value;

    if (!name || isNaN(amount) || amount <= 0) {
        return;
    }

    const expense = {
        id: Date.now(),
        name,
        amount,
        category,
        date: new Date().toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric"
        })
    };

    expenses.unshift(expense);

    saveExpenses();
    renderExpenses();

    expenseForm.reset();
});

function renderExpenses() {

    expenseList.innerHTML = "";

    if (expenses.length === 0) {
        expenseList.innerHTML = `
            <div class="empty-state">
                No expenses yet 💸
            </div>
        `;
    }

    let total = 0;

    expenses.forEach(expense => {

        total += expense.amount;

        const item = document.createElement("div");
        item.classList.add("expense-item");

        item.innerHTML = `
            <div class="expense-info">
                <h3>${expense.name}</h3>
                <p>${expense.category} • ${expense.date}</p>
            </div>

            <div class="expense-right">

                <span class="expense-amount">
                    ₹${expense.amount.toLocaleString()}
                </span>

                <button
                    class="delete-btn"
                    onclick="deleteExpense(${expense.id})"
                >
                    Delete
                </button>

            </div>
        `;

        expenseList.appendChild(item);
    });

    totalAmount.textContent = `₹${total.toLocaleString()}`;
    expenseCount.textContent = `${expenses.length} Transactions`;
}

function deleteExpense(id) {

    expenses = expenses.filter(expense => expense.id !== id);

    saveExpenses();
    renderExpenses();
}

function saveExpenses() {
    localStorage.setItem(
        "tanitrack_expenses",
        JSON.stringify(expenses)
    );
}
