import { generateReturnsArray } from "/src/InvestmentGoals";
import { Chart } from "chart.js/auto";

const finalMoneyChart = document.getElementById('final-money-distribuition');
const progressionChart = document.getElementById('progression');
const form = document.getElementById('investment-form');
const clearFormButton = document.getElementById('clear-form')
const calculateButton = document.getElementById('calculate-results');
let doughnutChartReference = {};
let progressionChartReference = {};

function formatCurrency(value) {
    return value.toFixed(2)
}

function renderProgression(evt) {
    evt.preventDefault();
    if (document.querySelector('.error')) {
        return;
    }
    resetCharts();
    //const startingAmount = Number(form['starting-Amount'].value); // alternativa para chamar os dados do formulario
    const startingAmount = Number(document.getElementById('initial-investment').value.replace(",", "."));
    const additionalContribution = Number(document.getElementById('add-investment').value.replace(",", "."));
    const timeAmount = Number(document.getElementById('time-amount').value);
    const timeAmountPeriod = document.getElementById('time-amount-period').value;
    const returnRate = document.getElementById('return-rate').value.replace(",", ".");
    const returnRatePeriod = Number(document.getElementById('evaluation-period').value);
    const taxrate = Number(document.getElementById('profit-tax-rate').value.replace(",", "."));

    const returnsArrays = generateReturnsArray(
        startingAmount,
        timeAmount,
        timeAmountPeriod,
        additionalContribution,
        returnRate,
        returnRatePeriod,
        taxrate,
    );

    console.log(returnsArrays[returnsArrays.length - 1])

    const finalInvestmentObject = returnsArrays[returnsArrays.length - 1]
    doughnutChartReference = new Chart(finalMoneyChart, {
        type: 'doughnut',
        data: {
            labels: ['Total Investido', 'Rendimento', 'Imposto'],
            datasets: [{

                data: [formatCurrency(finalInvestmentObject.investedAmount),
                formatCurrency(finalInvestmentObject.totalInterestReturns * (1 - taxrate / 100)),
                formatCurrency(finalInvestmentObject.totalInterestReturns * taxrate / 100)],
                backgroundColor: [
                    'rgb(255, 99, 132)', 'rgb(54,162,253)', 'rgb(255, 205, 86)'
                ],
                hoverOffset: 4
            },
            ],
        },
    });

    progressionChartReference = new Chart(progressionChart, {
        type: 'bar',
        data: {
            labels: returnsArrays.map(investmentObject => investmentObject.month),
            datasets: [{
                label: 'Total Investido',
                data: returnsArrays.map((investmentObject) => formatCurrency(investmentObject.investedAmount)),
                backgroundColor: [
                    'rgb(255, 99, 132)']
            },
            {
                label: 'Retorno do Investimento',
                data: returnsArrays.map((investmentObject) => formatCurrency(investmentObject.interestReturns)),
                backgroundColor: [
                    'rgb(54,162,253)']
            }]
        },
        options: {

            responsive: true,
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true
                }
            }
        }
    })


}

function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0;
}

function resetCharts() {
    if (!isObjectEmpty(doughnutChartReference) && !isObjectEmpty(progressionChartReference)) {
        doughnutChartReference.destroy();
        progressionChartReference.destroy();
    }
}


function clearForm() {

    form['initial-investment'].value = "";
    form['add-investment'].value = "";
    form['time-amount'].value = "";
    form['return-rate'].value = "";
    form['profit-tax-rate'].value = "";
    resetCharts();

    const errorInputContainer = document.querySelectorAll('.error');
    for (const errorInput of errorInputContainer) {
        errorInput.classList.remove('.error');
        errorInput.parentElement.querySelector('p').remove();
    }
}


function validateInput(evt) {
    if (evt.target.value === '') {
        return;
    }

    const { parentElement } = evt.target;
    const grandParentElement = evt.target.parentElement.parentElement;
    const inputeValue = evt.target.value.replace(",", ".");
    if (isNaN(inputeValue) || Number(inputeValue) < 0 && !parentElement.classList.contains('error')) {
        const errorTextElement = document.createElement('p'); //<p></p> 
        parentElement.classList.add('text-red-500');
        errorTextElement.innerText = "Insira um valor maior que zero";
        parentElement.classList.add('error');
        grandParentElement.appendChild(errorTextElement);

    } else if (parentElement.classList.contains('error') && isNaN(inputeValue) && Number(inputeValue) > 0) {
        parentElement.classList.remove('error');
        grandParentElement.querySelector('.error').remove();
    }
}

for (const formElement of form) {
    if (formElement.tagName === 'INPUT' && formElement.hasAttribute('name')) {
        formElement.addEventListener('blur', validateInput);
    }
}

//form.addEventListener('submit', renderProgression);
calculateButton.addEventListener('click', renderProgression);
clearFormButton.addEventListener('click', clearForm);