const addButton = document.getElementById("addButton");
const clearButton = document.getElementById("clearButton");
const timerButton = document.getElementById("timerButton");

const todoList = document.getElementById("todoList");
const doneList = document.getElementById("doneList");
const addContainer = document.getElementById("addContainer");
const clearContainer = document.getElementById("clearContainer");

const timeDisplay = document.getElementById("timeDisplay");
const selection = document.getElementById("taskSelection");

function isEmpty(value) {
    return (value == null || (typeof value === "string" && value.trim().length === 0));
}

function generateUniqueValue() {
    const value = Date.now() + Math.random().toString(36).substring(2);
    return value;
}

let interval = null;

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

//Still need time.
function doneItem(divContainer) {
    const doneDate = new Date(Date.now());
    const month = doneDate.getMonth() + 1; // Adding 1 to the month since it is zero-based
    const day = doneDate.getDate();
    const year = doneDate.getFullYear();

    const formattedDate = `${month.toString().padStart(2, "0")}/${day.toString().padStart(2, "0")}/${year}`;

    const input = divContainer.querySelector("input");
    input.removeEventListener("change", deleteItem);

    const label = divContainer.querySelector("label");
    const item = label.textContent;
    label.textContent = item + " | 00:00:00" + " | " + formattedDate;
    doneList.appendChild(divContainer);
}

function newItem() {
    const task = prompt();

    if(!isEmpty(task)) {
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
        label.textContent = task;

        divContainer.appendChild(input);
        divContainer.appendChild(label);

        todoList.appendChild(divContainer);

        const option = document.createElement("option");
        option.setAttribute("id", val);
        option.textContent = task;
        selection.appendChild(option);
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
    
}





addButton.addEventListener("click", newItem);
clearButton.addEventListener("click", clearDoneTab)
timerButton.addEventListener("click", timer);
doneLink.addEventListener("click", doneTab);
todoLink.addEventListener("click", todoTab);