const addButton = document.getElementById("addButton");
const clearButton = document.getElementById("clearButton");
const timerButton = document.getElementById("timerButton");

const todoList = document.getElementById("todoList");
let doneList = document.getElementById("doneList"); // Will Change
const addContainer = document.getElementById("addContainer");
const clearContainer = document.getElementById("clearContainer");

const timeDisplay = document.getElementById("timeDisplay");
const selection = document.getElementById("taskSelection");

let taskMap = new Map();

//need testing
class Task {
    constructor(id, task, time, date, done) {
        this.id = id;
        this.task = task;
        this.time = time;
        this.date = date;
        this.done = done;
    }

    changeDone() {
        if(this.done) {
            this.done = false;
        } else {
            this.done = true;
        }
    }
}

function saveData(taskMap) {
    const taskArray = Array.from(taskMap.entries());
    localStorage.setItem("taskMap", JSON.stringify(taskArray));
}

function loadData(taskMap) {
    const storedArray = JSON.parse(localStorage.getItem('taskMap'));
    taskMap = new Map(storedArray);
}

function loadTask() {

}

function loadDone() {

}

function isEmpty(value) {
    return (value == null || (typeof value === "string" && value.trim().length === 0));
}

function generateUniqueValue() {
    const value = Date.now() + Math.random().toString(36).substring(2);
    return value;
}

function addTime(additionTime, oldTime) {
    let carry = 0;
    for(let i = 2; i > 0; i--) {
        oldTime[i] = oldTime[i] + additionTime[i] + carry;
        carry = 0;
        if(i !== 0) {
            if(oldTime[i] >= 60) {
                carry++;
                oldTime[i] = oldTime[i] - 60;
            }
        }
    }
    return oldTime;
}

let interval = null;

/*

*/
function timer() {
    //Change button color
    let red = this.classList.toggle("btn-danger");

    let min = 0;
    let sec = 0;
    let hour = 0;
    
    if(red) {
        interval = setInterval( function() {
            sec++
    
            if(sec == 60) {
                sec = 0;
                min++;
            }

            if(min == 60) {
                min = 0;
                hour++;
            }
    
            let secString = sec.toString().padStart(2, "0");
            let minString = min.toString().padStart(2, "0");
            let hourString = hour.toString().padStart(2, "0");
    
            timeDisplay.textContent = hourString + ":" + minString + ":" + secString + " ";
        }, 1000);
    } else {
        const timeArray = timeDisplay.textContent.split(":").map(Number);
        const optionId = selection.options[selection.selectedIndex].id;
        if(optionId !== "blankOption") {
            const task = taskMap.get(optionId);
            task.time = addTime(timeArray, task.time);
            saveData(taskMap);
        }
        clearInterval(interval);
    }
}

function deleteItem() {
    const divContainer = this.closest(".form-check");
    const id = divContainer.id;

    if(this.checked) {
        setTimeout(function() {
            todoList.removeChild(divContainer);

            const option = document.getElementById(id);
            selection.removeChild(option);
            doneItem(divContainer);
        }, 500);
        
    }
}

function doneItem(divContainer) {
    const doneDate = new Date(Date.now());
    const month = doneDate.getMonth() + 1; // Adding 1 to the month since it is zero-based
    const day = doneDate.getDate();
    const year = doneDate.getFullYear();

    const formattedDate = `${month.toString().padStart(2, "0")}/${day.toString().padStart(2, "0")}/${year}`;

    const input = divContainer.querySelector("input");
    const id = divContainer.id;
    input.removeEventListener("change", deleteItem);

    const task = taskMap.get(id);
    const time = task.time;
    const formattedTime = `${time[0].toString().padStart(2, "0")}:${time[1].toString().padStart(2, "0")}:${time[2].toString().padStart(2, "0")}`;

    const label = divContainer.querySelector("label");
    const item = label.textContent;
    label.textContent = item + " | " + formattedTime + " | " + formattedDate;
    doneList.appendChild(divContainer);

    //////////
    task.date = formattedDate;
    task.changeDone();
    saveData(taskMap);
}

function newItem() {
    const taskName = prompt();

    if(!isEmpty(taskName)) {
        const val = generateUniqueValue();
        const divContainer = document.createElement("div");
        divContainer.classList.add("form-check");
        divContainer.setAttribute("id", val);

        const input = document.createElement("input");
        input.classList.add("form-check-input");
        input.setAttribute("type", "checkbox");
        input.addEventListener("change", deleteItem);

        const label = document.createElement("label");
        label.classList.add("form-check-label");
        label.textContent = taskName;

        divContainer.appendChild(input);
        divContainer.appendChild(label);

        todoList.appendChild(divContainer);

        const option = document.createElement("option");
        option.setAttribute("id", val);
        option.textContent = taskName;
        selection.appendChild(option);

        //////////
        const task = new Task(val, taskName, [0, 0, 0], "", false);
        taskMap.set(val, task);
        saveData(taskMap);
    }
}

const todoLink = document.getElementById("todoButton");
const doneLink = document.getElementById("doneButton");

//Click Todo show form-check

//Click Done
//Hide form-check
function todoTab() {
    todoList.setAttribute("style", "display: block;")
    doneList.setAttribute("style", "display: none;");
    addContainer.setAttribute("style", "display: block;");
    clearContainer.setAttribute("style", "display: none;");

    //Make Todo link disabled and done link able.
    todoLink.classList.toggle("active"), todoLink.classList.toggle("disabled");
    doneLink.classList.toggle("active"), doneLink.classList.toggle("disabled");
}

function doneTab() {
    todoList.setAttribute("style", "display: none;");
    doneList.setAttribute("style", "display: block;");
    addContainer.setAttribute("style", "display: none;");
    clearContainer.setAttribute("style", "display: block;");

    //Make Todo link able and done link disabled.
    todoLink.classList.toggle("active"), todoLink.classList.toggle("disabled");
    doneLink.classList.toggle("active"), doneLink.classList.toggle("disabled");
}

function clearDoneTab() {
    const formChecks = doneList.querySelectorAll(".form-check");
    formChecks.forEach(formCheck => {
        const id = formCheck.id;
        doneList.removeChild(formCheck);
        taskMap.delete(id);
    });
    saveData(taskMap);
}

addButton.addEventListener("click", newItem);
clearButton.addEventListener("click", clearDoneTab)
timerButton.addEventListener("click", timer);
doneLink.addEventListener("click", doneTab);
todoLink.addEventListener("click", todoTab);
loadData();