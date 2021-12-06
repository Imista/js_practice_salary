const workers = [];
const sueldo = 200;
const minHours = 40;
const bonus = 50;

//Function
const totalToPay = (list,minHours,salary,bonus) => {
    //Hours
    const hours = list.map(
        (element) => (
           element.hours
        )
    );
    const bonusHours = hours.filter(
        (element) => (
            (element > minHours)
        ) 
    );
    
    //Pay
    const toPay = hours.reduce(
        (acum,hour) => {
            const pay = hour*salary;

            return pay + acum;
        }
    ,0);
    const toPayBonus = bonusHours.reduce(
        (acum,hour) => {
            const pay = (hour - minHours)*bonus;

            return pay + acum;
        }
    ,0);

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