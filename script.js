// script.js

document.addEventListener("DOMContentLoaded", () => {
    const spreadsheet = document.getElementById("spreadsheet");
    const addressBar = document.getElementById("active_cell");
    let activeCell = null;

    // Highlight the active cell and update the address bar
    spreadsheet.addEventListener("click", (e) => {
        if (e.target.classList.contains("cell")) {
            if (activeCell) {
                activeCell.classList.remove("active");
            }
            activeCell = e.target;
            activeCell.classList.add("active");

            const row = activeCell.parentElement.rowIndex;
            const col = activeCell.cellIndex;
            addressBar.textContent = `${String.fromCharCode(64 + col)}${row}`;
        }
    });

    // Set font family
    window.setFont = (select) => {
        if (activeCell) {
            activeCell.style.fontFamily = select.value;
        }
    };

    // Set font size
    window.setSize = (select) => {
        if (activeCell) {
            activeCell.style.fontSize = `${select.value}px`;
        }
    };

    // Set text color
    window.textColor = (input) => {
        if (activeCell) {
            activeCell.style.color = input.value;
        }
    };

    // Set background color
    window.backgroundColor = (input) => {
        if (activeCell) {
            activeCell.style.backgroundColor = input.value;
        }
    };
});
