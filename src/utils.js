// Daniel Aviv 209228154
// Yarin Naftali 208678565

// Create a namespace object named "utlisObj" to store utility functions.
export const utlisObj = {};

// Define a function called "getFormattedYearMonth" which takes a "date" parameter.
utlisObj.getFormattedYearMonth = date => {
    // Get the year from the provided date.
    const year = date.getFullYear();
    // Get the month from the provided date, and add 1 since months are zero-indexed.
    const month = date.getMonth() + 1;

    // Create a formatted string representing the year and month in the format "YYYY-MM".
    // If the month is less than 10, prepend a '0' to ensure two-digit formatting.
    return `${year}-${month < 10 ? '0' : ''}${month}`;
};
