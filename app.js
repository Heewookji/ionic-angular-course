const reasonInput = document.querySelector('#input-reason');
const amountInput = document.querySelector('#input-amount');
const cancelBtn = document.querySelector('#btn-cancel');
const confirmBtn = document.querySelector('#btn-confirm');
const expensesList = document.querySelector('#expenses-list');
const expensesTotal = document.querySelector('#expenses-total');
const alertCtrl = document.querySelector('ion-alert-controller');


const clear = () => {
    reasonInput.value = '';
    amountInput.value = '';
}

let total = 0;

cancelBtn.addEventListener('click', clear);

confirmBtn.addEventListener('click', () => {
    const enteredReason = reasonInput.value;
    const enteredAmount = amountInput.value;

    if (enteredReason.trim().length <= 0 || enteredAmount <= 0 ||
        enteredAmount.trim().length <= 0) {
        alertCtrl.create({
            message: 'Please enter valid reason and amount!',
            header: 'Invalid Input',
            buttons: ['Okay']
        }).then(alertElement => {
            alertElement.present();
        });
        return;
    }

    total += +enteredAmount;

    const newItem = document.createElement('ion-item');
    newItem.textContent = enteredReason + ': $' + enteredAmount;

    expensesList.appendChild(newItem);

    expensesTotal.textContent = '';
    expensesTotal.textContent = '$' + total;

    clear();

})

