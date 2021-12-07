console.log("a");
//Helpers
const workers = [];

function obtainHours(list){
    const hours = list.map(
        (element) => (
           element.hours
        )
    );

    return hours;
}

function writeText(list){
    let cont = 0;
    const text = list.map(
        function (element){
            cont++;
            const paragraph = `Worker ${cont}:\n${element.name} with ${element.hours} hours worked\n`;

            return paragraph
        }
    );

    //Return
    return text;
}

function obtainText(text,element){
    return (text + element);
}

function restarArray(array){
    const size = array.length;
    for (let i = 0; i < size; i++) {
        array.pop();   
    }
}

const calculateAverage = x => (x.reduce((x,y) => x+y))/x.length;
const order = (x,y) => (x.hours-y.hours);


//Function
function totalToPay(list,minHours,salary,bonus = 0){
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

    const total = toPay + toPayBonus;

    //Return
    return total;
}

function averangeHours(list){
    const hours =  obtainHours(list);

    return calculateAverage(hours);
}



function hoursQuote(list,minHours){
    const notComply = list.filter(
        function (list){
            const hours = list.hours;

            return (hours < minHours);
        }
    );

    return notComply;
}

//Html-------------------------------
function addWorker() {
    //Inputs
    const inputForm = document.getElementById("workerForm");
    const inputName = document.getElementById("name");
    const inputHours = document.getElementById("hours");
    const inputSex = document.getElementById("sex");
    const inputText = document.getElementById("showWorkers");
    //Values
    const nameValue = inputName.value;
    const hoursValue = parseInt(inputHours.value);
    const sexValue = parseInt(inputSex.value);

    if((nameValue !== "") && (!isNaN(hoursValue)) &&(sexValue !== 0)){
        //Push
        workers.push({
            name: nameValue,
            hours: hoursValue,
            sex: sexValue
        });
    
        //Write text
        const basicText = writeText(workers);
        const printText = basicText.reduce(obtainText,"");
    
        inputText.innerText = printText;
    
        //Final
        inputForm.reset();
    }else
        alert("Complete the data");

}

function resetWorker(){
    //Inputs
    const inputForm = document.getElementById("workerForm");
    const inputText = document.getElementById("showWorkers");
    const resultBlock = document.getElementById("resultBlock");
    
    //Restar array
    restarArray(workers);
    inputText.innerText = "";
    
    //Final
    inputForm.reset();
    resultBlock.classList.remove("visible");

}

function calculateData(){
    //Inputs
    const inputPayHours = document.getElementById("payHour");
    const inputMinHours = document.getElementById("minHours");
    const inputBonus = document.getElementById("bonus");

    const inputTotal = document.getElementById("total");
    const inputAverange = document.getElementById("averange");
    const inputNoQuota = document.getElementById("noQuota");

    const resultBlock = document.getElementById("resultBlock");

    //Values
    const valuePayHours = parseInt(inputPayHours.value);
    const valueMinHours = parseInt(inputMinHours.value);
    const valueBonus = parseInt(inputBonus.value);

    if(!isNaN(valuePayHours) && !isNaN(valueMinHours)){
        //Total
        let total;
        if(isNaN(valueBonus)){
            total = totalToPay(workers,valueMinHours,valuePayHours);
        }else
            total = totalToPay(workers,valueMinHours,valuePayHours,valueBonus);

        inputTotal.innerText = (`The total to pay is: $${total}`);
        //Averange
        const averangeHoursValue = averangeHours(workers);

        inputAverange.innerText = (`Averange of hours worked: ${averangeHoursValue}`);
        //Not Comply
        const workerNotComply = hoursQuote(workers,valueMinHours);
        if(workerNotComply.length > 0){
            const textNotComply = workerNotComply.map(
                function (element){
                    const paragraph = `${element.name} worked ${element.hours} hours\n`;
        
                    return paragraph
                }
            );
            const printNotComply = (`These workers did not comply with the minimum hours:\n`) + textNotComply.reduce(obtainText,"");
            
            inputNoQuota.innerText = printNotComply;

        }

        resultBlock.classList.add("visible");

    }else
        alert("Complete the data");

}