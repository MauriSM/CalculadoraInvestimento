import { generateReturnsArray } from "./src/InvestmentGoals";

const form = document.getElementById('invesment-form');
const calculateButton = document.getElementById('calculate-result');


function renderProgression(evt){
    evt.preventDefault();
    //const startingAmount = Number(form['starting-Amount'].value); // alternativa para chamar os dados do formulario
    const startingAmount = Number( document.getElementById('starting-amount').value);
    const additionalContribution = Number( document.getElementById('additional-contribution').value);
    const timeAmount = Number (document.getElementById('time-amount').value);
    const timeAmountPeriod = document.getElementById('time-amount-period').value;
    const returnRate = document.getElementById('return-rate').value;
    const returnRatePeriod = Number(document.getElementById('evaluation-period').value);
    const taxrate = Number(document.getElementById('tax-rate').value);

    generateReturnsArray(
        startingAmount,
        timeAmount,
        timeAmountPeriod,
        additionalContribution,
        returnRate,
        returnRatePeriod,
        taxrate,
    )

    console.log(returnsArray)

}

//form.addEventListener('click', renderProgression);
calculateButton.addEventListener('click', renderProgression);