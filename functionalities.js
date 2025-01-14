

document.addEventListener("DOMContentLoaded", () => {
    const spreadsheet = document.getElementById("spreadsheet");
    const formulaInput = document.getElementById("formula-input");
    const activeCell = document.getElementById("active_cell");

    // Track the active cell for the formula input
    let currentActiveCell = null;

    // Helper: Get cell reference (e.g., A1)
    const getCellRef = (row, col) => `${String.fromCharCode(64 + col)}${row}`;

    // Select the active cell
    const setActiveCell = (cell) => {
        if (currentActiveCell) {
            currentActiveCell.classList.remove("active");
        }
        currentActiveCell = cell;
        currentActiveCell.classList.add("active");
        const row = currentActiveCell.parentElement.rowIndex + 1; // Adjusted for header
        const col = currentActiveCell.cellIndex + 1; // Adjusted for header
        activeCell.textContent = getCellRef(row, col);
        formulaInput.value = currentActiveCell.textContent.trim();
    };

    // Add event listener to cells to set active cell on click
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
        cell.addEventListener("click", () => {
            setActiveCell(cell);
        });
    });

    // Handle formula input in the fx bar (formula-input)
    formulaInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && currentActiveCell) {
            const formula = formulaInput.value.trim();
            updateCell(currentActiveCell, formula);
        }
    });

    // Helper: Update cell value (with formula)
    const updateCell = (cell, formula) => {
        const row = cell.parentElement.rowIndex + 1;
        const col = cell.cellIndex + 1;
        const cellRef = getCellRef(row, col);
        const result = evaluateFormula(formula);
        cell.textContent = result;
    };

    // Evaluate formulas like =SUM(A1:A5), =MAX(A1:A5), etc.
    const evaluateFormula = (formula) => {
        if (!formula.startsWith("=")) return formula;

        try {
            const match = formula.match(/=(\w+)\((\w+\d+):(\w+\d+)\)/);
            if (!match) throw new Error("Invalid formula format");

            const [, func, startCell, endCell] = match;
            const start = parseCellReference(startCell);
            const end = parseCellReference(endCell);

            const values = [];
            for (let row = start.row; row <= end.row; row++) {
                for (let col = start.col; col <= end.col; col++) {
                    values.push(getCellValue(row, col));
                }
            }

            switch (func.toUpperCase()) {
                case "SUM":
                    return values.reduce((a, b) => a + b, 0);
                case "AVERAGE":
                    return (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2);
                case "MAX":
                    return Math.max(...values);
                case "MIN":
                    return Math.min(...values);
                case "COUNT":
                    return values.length;
                default:
                    throw new Error("Unsupported function");
            }
        } catch (error) {
            alert(`Error in formula: ${error.message}`);
            return "";
        }
    };

    // Parse cell reference like A1 into { row: 1, col: 1 }
    const parseCellReference = (cellRef) => {
        const col = cellRef.charCodeAt(0) - 64; // Convert letter (e.g., A -> 1)
        const row = parseInt(cellRef.slice(1), 10); // Get row number (e.g., 1 -> 1)
        return { col, row };
    };

    // Get cell value from spreadsheet
    const getCellValue = (row, col) => {
        const cell = spreadsheet.rows[row].cells[col];
        return cell ? parseFloat(cell.textContent.trim()) || 0 : 0;
    };

    // Font size and family changes
    window.setFont = (select) => {
        if (currentActiveCell) {
            currentActiveCell.style.fontFamily = select.value;
        }
    };

    window.setSize = (select) => {
        if (currentActiveCell) {
            currentActiveCell.style.fontSize = `${select.value}px`;
        }
    };

    // Text transformations (Bold, Italic, Underline)
    const applyTextStyle = (style) => {
        if (currentActiveCell) {
            currentActiveCell.style[style] = currentActiveCell.style[style] === "bold" ? "" : "bold";
        }
    };

    document.querySelector(".bold").addEventListener("click", () => applyTextStyle("fontWeight"));
    document.querySelector(".italic").addEventListener("click", () => applyTextStyle("fontStyle"));
    document.querySelector(".underline").addEventListener("click", () => applyTextStyle("textDecoration"));

    // Text alignment (Left, Center, Right)
    const applyTextAlignment = (alignment) => {
        if (currentActiveCell) {
            currentActiveCell.style.textAlign = alignment;
        }
    };

    document.querySelector(".start").addEventListener("click", () => applyTextAlignment("left"));
    document.querySelector(".center").addEventListener("click", () => applyTextAlignment("center"));
    document.querySelector(".end").addEventListener("click", () => applyTextAlignment("right"));

    // Text and background color
    window.textColor = (input) => {
        if (currentActiveCell) {
            currentActiveCell.style.color = input.value;
        }
    };

    window.backgroundColor = (input) => {
        if (currentActiveCell) {
            currentActiveCell.style.backgroundColor = input.value;
        }
    };

    // Copy, Cut, Paste
    let copiedContent = null;
    document.querySelector(".copy").addEventListener("click", () => {
        if (currentActiveCell) {
            copiedContent = currentActiveCell.textContent;
        }
    });

    document.querySelector(".cut").addEventListener("click", () => {
        if (currentActiveCell) {
            copiedContent = currentActiveCell.textContent;
            currentActiveCell.textContent = "";
        }
    });

    document.querySelector(".paste").addEventListener("click", () => {
        if (currentActiveCell && copiedContent !== null) {
            currentActiveCell.textContent = copiedContent;
        }
    });

    // Download and Upload (File Handling)
    document.querySelector(".download").addEventListener("click", () => {
        const csv = generateCSV();
        const blob = new Blob([csv], { type: "text/csv" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "spreadsheet.csv";
        link.click();
    });

    // Generate CSV from current spreadsheet data
    const generateCSV = () => {
        let csv = "";
        const rows = spreadsheet.querySelectorAll("tr");
        rows.forEach((row) => {
            const cells = row.querySelectorAll("td, th");
            const rowData = Array.from(cells)
                .map((cell) => `"${cell.textContent.trim()}"`)
                .join(",");
            csv += rowData + "\n";
        });
        return csv;
    };

    // File Upload Handling
    document.querySelector(".open").addEventListener("click", () => {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = ".csv";
        fileInput.addEventListener("change", handleFileUpload);
        fileInput.click();
    });

    // Handle CSV file upload
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            const csv = event.target.result;
            loadCSV(csv);
        };
        reader.readAsText(file);
    };

    // Load CSV into spreadsheet
    const loadCSV = (csv) => {
        const rows = csv.split("\n");
        rows.forEach((row, rowIndex) => {
            const cells = row.split(",");
            cells.forEach((cell, colIndex) => {
                const spreadsheetRow = spreadsheet.rows[rowIndex + 1]; // Skip the header row
                if (spreadsheetRow) {
                    const cellElement = spreadsheetRow.cells[colIndex + 1];
                    if (cellElement) {
                        cellElement.textContent = cell.replace(/"/g, "");
                    }
                }
            });
        });
    };

    // Initialize active cell on page load
    setActiveCell(cells[0]);
});
