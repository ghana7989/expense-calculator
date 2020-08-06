const balance = document.getElementById("balance")
const money_plus = document.getElementById("money-plus")
const money_minus = document.getElementById("money-minus")
const list = document.getElementById("list")
const form = document.getElementById("form")
const text = document.getElementById("text")
const amount = document.getElementById("amount")

// const dummyTransactions = [
//     { id: 1, text: 'Flower', amount: -20 },
//     { id: 2, text: 'Salary', amount: 300 },
//     { id: 3, text: 'Book', amount: -10 },
//     { id: 4, text: 'Camera', amount: 150 }
// ];


const localStorageTransactions = JSON.parse(localStorage.getItem("transactions"))


let transactions = localStorage.getItem("transactions") !== null ? localStorageTransactions : []




//  ADD Transaction To the List

function addTransaction(e) {
    e.preventDefault();

    if (text.value.trim() === "" || amount.value.trim() === "") {
        alert("Add Text and Amount")
    } else {
        const transaction = {
            id: genrateRandomNumber(),
            text: text.value,
            amount: +amount.value
        }
        console.log(transaction)
        transactions.push(transaction)
        addTransactionDOM(transaction)
        updateValues();
        updateLocalStorage()
        text.value = ""
        amount.value = ""
    }
}
function genrateRandomNumber() {
    return Math.floor(Math.random() * 100000000000)
}











// Add Transactions to DOM list

function addTransactionDOM(transaction) {

    // Getting the sign
    const sign = transaction.amount < 0 ? "-" : "+";

    const item = document.createElement("li")

    // Add Class based on Value
    item.classList.add(sign === "-" ? "minus" : "plus")

    item.innerHTML = `
        ${transaction.text}<span>${sign}${Math.abs(transaction.amount)} &#8377</span>
        <button class="delete-btn" onClick="removeTransaction(${transaction.id})">X</button>
    `
    list.appendChild(item);
}


// Update the income and expense
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount)
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2)
    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2)
    const expense = -1 * (total - income)



    balance.innerHTML = `${total} &#8377`

    money_plus.innerHTML = `<p id="money-plus" class="money plus">
                    ${income} &#8377;
                </p>`;

    money_minus.innerHTML = `<p id="money-minus" class="money minus">
                    ${expense} &#8377;
                </p>`;
}

// Remove Transaction By ID

function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage()
    init()
}

// Init App 

function init() {
    list.innerHTML = ""
    transactions.forEach(addTransactionDOM)
    updateValues()
}

function updateLocalStorage(){
    localStorage.setItem("transactions",JSON.stringify(transactions))
}

init()

// Event Listeners
form.addEventListener("submit", addTransaction)