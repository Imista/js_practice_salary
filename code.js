//Helpers
const workers = [];
const sueldo = 200;
const minHours = 40;
const bonus = 50;

function obtainHours(list){
    const hours = list.map(
        (element) => (
           element.hours
        )
    );

    return hours;
}

const calculateAverage = x => (x.reduce((x,y) => x+y))/x.length;

//Function
function totalToPay(list,minHours,salary,bonus){
    //Functions
    const sumHours= (acum,hour) => {
        const pay = hour*salary;

        return pay + acum;
    }
    const sumHoursBonus = (acum,hour) => {
        const pay = (hour - minHours)*bonus;

        return pay + acum;
    }

    //Hours
    const hours = obtainHours(list);
    const bonusHours = hours.filter(
        (element) => (
            (element > minHours)
        ) 
    );
    
    //Pay
    const toPay = hours.reduce(sumHours,0);

    const toPayBonus = bonusHours.reduce(sumHoursBonus,0);

    console.log(
        hours,
        bonusHours,
        toPay,
        toPayBonus
    )

    const total = toPay + toPayBonus;

    //Return
    return total;
}

function averangeHours(list){
    const hours =  obtainHours(list);

    return calculateAverage(hours);
}

//Example
workers.push({
    name: "a",
    hours: 40,
    sex: 1
});
workers.push({
    name: "b",
    hours: 40,
    sex: 2
});
workers.push({
    name: "c",
    hours: 38,
    sex: 3
});
workers.push({
    name: "d",
    hours: 42,
    sex: 1
});