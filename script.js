document.getElementById("budgetValue").innerHTML = document.getElementById("incomeValue").innerHTML + document.getElementById("expensesValue");
let plus = document.getElementById("positiveValue");
let neg = document.getElementById("negativeValue");
let submit = document.getElementById("addBtn");
neg.style.display = "none";
plus.style.display = "";

plus.addEventListener("click", postiveFunc);
neg.addEventListener("click", negativeFunc);
submit.addEventListener("click", addPaisa);

let paisa = [];
let income, expenses, budget;

// document.getElementById("incomeTab").lastChild.innerHTML=findIncome();
// document.getElementById("expensesTab").lastChild.innerHTML=findExpenses();

function addPaisa() {
    let item = {};
    item.description = document.getElementById("navItem1").value;
    item.cost = +document.getElementById("navItem2").value;
    item.refId = parseInt(10000 * (Math.random()));
    if (plus.style.display == "") {
        item.income = true;
    }
    else if (neg.style.display == "") {
        item.expenses = true;
    }
    paisa.push(item);

    addItem();

}
function addItem() {
    let localAdd = paisa[paisa.length - 1];
    let td1 = document.createElement("td");
    let a2 = document.createElement("a");
    let i1 = document.createElement("i")
    let i2 = document.createElement("i")
    let tr1 = document.createElement("tr");
    let td2 = document.createElement("td");
    td1.classList.add("incomeDescription");
    td1.innerHTML = localAdd.description;
    i1.classList.add("icon");
    i1.classList.add("ion-edit");
    i2.classList.add("icon");
    i2.classList.add("ion-trash-b");
    td2.append(a2, i1, i2);
    tr1.append(td1, td2);
    tr1.classList.add("rows")
    tr1.setAttribute("id", localAdd.refId);

    if (localAdd.income == true) {
        a2.innerHTML = "+" + localAdd.cost;
        a2.classList.add("incomeCost");
        document.getElementById("incomeTable").append(tr1);
    }
    else if (localAdd.expenses == true) {
        a2.innerHTML = "-" + localAdd.cost;
        a2.classList.add("expensesCost");
        document.getElementById("expensesTable").append(tr1);
    }
    document.getElementById("incomeValue").innerHTML = "+" + incomeReturn();
    document.getElementById("expensesValue").innerHTML = "-" + expensesReturn();
    document.getElementById("budgetValue").innerHTML = incomeReturn() - expensesReturn();
    i1.addEventListener("dblclick", editRow);
    i2.addEventListener("click", deleteRow);

}

function incomeReturn() {
    let sum = 0;
    for (i = 0; i < paisa.length; i++) {
        if (paisa[i].income == true) {
            sum += paisa[i].cost;
        }
    }
    return (sum);
}
function expensesReturn() {
    let sum = 0;
    for (i = 0; i < paisa.length; i++) {
        if (paisa[i].expenses == true) {
            sum += paisa[i].cost;
        }
    }
    return (sum);
}
function postiveFunc() {
    plus.style.display = "none";
    neg.style.display = "";
    document.getElementById("navItem1").style.borderColor = "rgb(158, 0, 47)";
    document.getElementById("navItem2").style.borderColor = "rgb(158, 0, 47)";
}
function negativeFunc() {
    plus.style.display = "";
    neg.style.display = "none";
    document.getElementById("navItem1").style.borderColor = "rgb(176, 248, 255)";
    document.getElementById("navItem2").style.borderColor = "rgb(176, 248, 255)";

}

function editRow(event) {
    let sign;
    const eventId = event.target.parentElement;
    const ele = eventId.firstElementChild;
    let className = ele.classList[0];
    let input = document.createElement("input");
    input.type = "text";
    input.value = ele.innerHTML.toString().slice(1);
    sign = ele.innerHTML.toString().slice(0, 1);
    input.style.width = "50px";
    input.style.margin = "2px";
    input.style.backgroundColor="rgba(158,158,158,0.5)";
    input.style.border="none";
    input.style.color="wheat";
    input.addEventListener("keyup", (event) => {

        if (event.keyCode === 13) {
            let a = document.createElement("a");
            a.classList.add(className);
            a.innerHTML = sign + "" + input.value;
            input.replaceWith(a);
            //console.log(eventId.parentElement.id);
            editArray(eventId.parentElement.id,input.value);
        }
    });
    ele.replaceWith(input);
}
function deleteRow(event) {

    event.target.parentElement.parentElement.remove();
    removeItem(event.target.parentElement.parentElement.id);

    document.getElementById("incomeValue").innerHTML = "+" + incomeReturn();
    document.getElementById("expensesValue").innerHTML = "-" + expensesReturn();
    document.getElementById("budgetValue").innerHTML = incomeReturn() - expensesReturn();


}
function removeItem(id) {
    // for(i=0;i<=paisa.length;i++){
    //     if(id==paisa[i].refId){
    //         paisa.splice(i,1);
    //         break;
    //     }
    // }
    paisa.splice(paisa.findIndex(p => p.refId == id ),1);
}
function editArray(id,newCost){
    //console.log(id);
    paisa[paisa.findIndex(p=> p.refId==id)].cost=+newCost;
    document.getElementById("incomeValue").innerHTML = "+" + incomeReturn();
    document.getElementById("expensesValue").innerHTML = "-" + expensesReturn();
    document.getElementById("budgetValue").innerHTML = incomeReturn() - expensesReturn();

}


