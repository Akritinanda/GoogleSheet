// sheet.js

document.addEventListener("DOMContentLoaded", () => {
    const spreadsheet = document.getElementById("spreadsheet");

    // Add a new row
    const addRow = () => {
        const tbody = spreadsheet.querySelector("tbody");
        const row = document.createElement("tr");
        const cellsCount = spreadsheet.querySelector("thead tr").children.length;

        for (let i = 0; i < cellsCount; i++) {
            const cell = document.createElement(i === 0 ? "td" : "td");
            if(i == 0)cell.innerText = tbody.children.length + 1;
            if (i > 0) {
                cell.setAttribute("contenteditable", "true");
                cell.classList.add("cell");
            }
            row.appendChild(cell);
        }
        tbody.appendChild(row);
    };

    // Bind "Add Row" functionality to footer button
    document.querySelector(".new-sheet").addEventListener("click", addRow);
});
