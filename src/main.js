const addButton = document.getElementById("addButton");
const todoList = document.getElementById("todoList");

function isEmpty(value) {
    return (value == null || (typeof value === "string" && value.trim().length === 0));
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

        const split = document.createElement("span");
        split.textContent = " | ";

        const timeDisplay = document.createElement("span")
        timeDisplay.textContent = "00:00 ";

        const timerButton = document.createElement("button");
        timerButton.setAttribute("type", "button");
        timerButton.classList.add("btn", "btn-success", "btn-sm");
        timerButton.style.cssText = "--bs-btn-padding-y: .5rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: 1rem;";

        divContainer.appendChild(input);
        divContainer.appendChild(label);
        divContainer.appendChild(split);
        divContainer.appendChild(timeDisplay);
        divContainer.appendChild(timerButton);

        todoList.appendChild(divContainer);
    }
}

// To get rid of the check we need to had a listener to each one.
// So when a new item is created we need to add a new eventListener.

addButton.addEventListener("click", newItem);