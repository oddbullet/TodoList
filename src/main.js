const addButton = document.getElementById("addButton");
const todoList = document.getElementById("todoList");
const timerButton = document.getElementById("timerButton");
const timeDisplay = document.getElementById("timeDisplay");
const selection = document.getElementById("taskSelection");

function isEmpty(value) {
    return (value == null || (typeof value === "string" && value.trim().length === 0));
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
    if(this.checked) {
        setTimeout(function() {
            todoList.removeChild(divContainer);
        }, 500);
        
    }
}

function newItem() {
    const task = prompt();

    if(!isEmpty(task)) {
        const divContainer = document.createElement("div");
        divContainer.classList.add("form-check");

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
        option.setAttribute("value", 10);
        option.textContent = task;
        selection.appendChild(option);
    }
}

addButton.addEventListener("click", newItem);
timerButton.addEventListener("click", timer);