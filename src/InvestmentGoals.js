function convertToMonthlyReturnRate(yearlyReturnRate){
    return yearlyReturnRate ** (1/12)
}

function generatedReturnsArray(staringAmount = 0, timeHorizon =0, timePeriod= 'monthly', monthlyContribution =0, returnRate =0, returnTimeFrame = 'monthly')
{
if(!timeHorizon || !startingAmount){
    throw new Error ('Investimento inicial e prazo devem ser preenchidos com valores positivos');
}

const finalReturnRate = returnTimeFrame === 'monthly' ? 1 + returnRate/100: convertToMonthlyReturnRate(1+returnRate/100);

const finalTimeHorizon = timePeriod === 'monthly' ? timeHorizon : timeHorizon * 12;

const referenceInvestimentObject = { 
    investedAmount : startingAmount,
    interestReturns : 0, //rendimento do mês
    totalInterestReturns : 0, //rendimento total
    month : 0,
    totalAmount: startingAmount,
};

const returnsArray = [referenceInvestimentObject];
 for (let timeReference = 1; timeReference <= finalTimeHorizon; timeReference++){
    const interestReturns = (returnsArray[timeReference - 1].totalAmount * finalReturnRate) + monthlyContribution;
    const investedAmount =  startingAmount + monthlyContribution * timeReference; 
    const totalInterestReturns = totalAmount - InvestedAmount;
    returnsArray.push({
        investedAmount: investedAmount,
        interestReturns: interestReturns, //rendimento do mês
        totalInterestReturns: totalInterestReturns, //rendimento total
        month: timeReference,
        totalAmount: totalAmount,
    });

 }
 return returnsArray;
}