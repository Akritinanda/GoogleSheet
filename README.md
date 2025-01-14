# GoogleSheet
Overview
This project is a web-based spreadsheet application that provides basic functionalities similar to Google Sheets. Users can interact with the spreadsheet, style cells, and perform various actions using an intuitive user interface. It includes several JavaScript functions for handling spreadsheet functionality, as described below:

JavaScript Functionality Overview
The sheet.js file includes code to enable the following features:
Adding a New Row:-
The addRow function allows users to dynamically add a new row to the spreadsheet. The row includes editable cells, and the first cell contains a row number.
Active Cell Management:-

The application tracks the currently active cell and displays its position in the formula bar.

The setActiveCell function highlights the active cell and updates the formula bar with its reference (e.g., A1).

Formula Input and Evaluation

The formula bar allows users to enter text or formulas. Formulas are prefixed with = and support operations like SUM, AVERAGE, MAX, MIN, and COUNT.

The evaluateFormula function parses and evaluates formulas entered in the formula bar.

Styling Options

Users can change font family and size for the active cell using the setFont and setSize functions.

Text transformations like bold, italic, and underline are applied using the applyTextStyle function.

Text alignment (left, center, right) is managed by the applyTextAlignment function.

Color Customization

Users can change the text color and background color of the active cell using the textColor and backgroundColor functions.

Clipboard Operations

The application supports copy, cut, and paste operations for cell content.

File Handling

The application includes functionality to download the spreadsheet as a CSV file and upload a CSV file to populate the spreadsheet.

The generateCSV function converts the spreadsheet data into a CSV format for downloading.

The loadCSV function reads and imports data from an uploaded CSV file.

Initialization

The DOMContentLoaded event ensures all functionalities are initialized once the DOM is fully loaded. It sets the default active cell and binds event listeners to cells and toolbar buttons.

Features

Navigation Bar

File: Placeholder for file-related operations.

Home: Active tab for cell styling.

Insert: Placeholder for inserting rows, columns, or other elements.

Layout: Placeholder for layout-related settings.

Help: Placeholder for help and support.

Cell Styling Options

Font Family: Choose between Monospace, Sans-serif, Fantasy, and Cursive.

Font Size: Options include 14px, 16px, 18px, and 20px.

Text Formatting: Bold, Italic, and Underline.

Alignment: Left, Center, and Right.

Text Color: Custom color picker for font color.

Background Color: Custom color picker for cell background color.

Spreadsheet

Editable Cells: Clickable cells that allow editing of content.

Row and Column Headers: Headers are labeled with numbers (rows) and letters (columns).

Active Cell Highlighting: The active cell is highlighted, and its position is displayed in the address bar.

Formula Bar: Allows users to input text or formulas.

Footer

New Sheet Button: Adds a new sheet (placeholder functionality).

Additional Features

Cell Resize Handle: Allows resizing of cell widths by dragging the handle.

Technologies Used

HTML: Structure of the application.

CSS: Styling and layout of the application.

JavaScript: Interactivity and functionality.
