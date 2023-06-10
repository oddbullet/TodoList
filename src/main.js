const addButton = document.getElementById("addButton");
const todoList = document.getElementById("todoList");
const timerButton = document.getElementById("timerButton");
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
    
            let secString = sec;
            let minString = min;
            let hourString = hour;

            if(sec < 10) {
                secString = "0" + secString;
            }
    
            if(min < 10) {
                minString = "0" + minString;
            }

            if(hour < 10) {
                hourString = "0" + hourString;
            }
    
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
        }, 500);
        
    }
}

//Pass in divContainer from deleteItem ??
//Most of the code follow newItem. Just need to add a checked attribute to input.
function doneItem() {

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
const doneList = document.getElementById("doneList");

//Click Todo show form-check

//Click Done
//Hide form-check
function todoTab() {
    todoList.setAttribute("style", "display: block;")
    doneList.setAttribute("style", "display: none;");

    //Make Todo link disabled and done link able.
    todoLink.classList.toggle("active"), todoLink.classList.toggle("disabled");
    doneLink.classList.toggle("active"), doneLink.classList.toggle("disabled");
}

function doneTab() {
    todoList.setAttribute("style", "display: none;");
    doneList.setAttribute("style", "display: block;");

    //Make Todo link able and done link disabled.
    todoLink.classList.toggle("active"), todoLink.classList.toggle("disabled");
    doneLink.classList.toggle("active"), doneLink.classList.toggle("disabled");
}





addButton.addEventListener("click", newItem);
timerButton.addEventListener("click", timer);
doneLink.addEventListener("click", doneTab);
todoLink.addEventListener("click", todoTab);