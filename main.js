import { generateReturnsArray } from "/src/InvestmentGoals";

const form = document.getElementById('investment-form');
const clearFormButton = document.getElementById('clear-form')
const calculateButton = document.getElementById('calculate-results');


function renderProgression(evt){
    evt.preventDefault();
    if(document.querySelector('.error')){
        return;
    }
    //const startingAmount = Number(form['starting-Amount'].value); // alternativa para chamar os dados do formulario
    const startingAmount = Number( document.getElementById('initial-investment').value.replace(",","."));
    const additionalContribution = Number( document.getElementById('add-investment').value.replace(",","."));
    const timeAmount = Number (document.getElementById('time-amount').value);
    const timeAmountPeriod = document.getElementById('time-amount-period').value;
    const returnRate = document.getElementById('return-rate').value.replace(",",".");
    const returnRatePeriod = Number(document.getElementById('evaluation-period').value);
    const taxrate = Number(document.getElementById('profit-tax-rate').value.replace(",","."));

   const returnsArrays= generateReturnsArray(
        startingAmount,
        timeAmount,
        timeAmountPeriod,
        additionalContribution,
        returnRate,
        returnRatePeriod,
        taxrate,
    )

    console.log(returnsArrays)

}

function clearForm (){

    form['initial-investment'].value = "";
    form['add-investment'].value="";
    form['time-amount-period'].value="";
    form['return-rate'].value="";
    form['profit-tax-rate'].value="";
    
    const errorInputContainer = document.querySelectorAll('.error');
    for (const errorInput of errorInputContainer){
        errorInput.classList.remove('.error');
        errorInput.parentElement.querySelector('p').remove();
    }
}


function validateInput(evt){
    if (evt.target.value === ''){
        return;
    }

    const {parentElement} = evt.target;
    const grandParentElement = evt.target.parentElement.parentElement;
    const inputeValue = evt.target.value.replace(",",".");
    if (isNaN(inputeValue) || Number(inputeValue) < 0 && !parentElement.classList.contains('error'))
    {
        const errorTextElement = document.createElement('p'); //<p></p> 
        parentElement.classList.add('text-red-500');
        errorTextElement.innerText = "Insira um valor maior que zero";
        parentElement.classList.add('error');
        grandParentElement.appendChild(errorTextElement);

    }else if(parentElement.classList.contains('error') && isNaN(inputeValue) && Number(inputeValue) > 0){
        parentElement.classList.remove('error');
        grandParentElement.querySelector('.error').remove();
    }
}

for (const formElement of form){
    if(formElement.tagName === 'INPUT' && formElement.hasAttribute('name')){
        formElement.addEventListener('blur', validateInput);
    }
}

//form.addEventListener('submit', renderProgression);
calculateButton.addEventListener('submit', renderProgression);
clearFormButton.addEventListener('click', clearForm);