// Daniel Aviv 209228154
// Yarin Naftali 208678565

// Import necessary dependencies from React and other modules.
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import ExpensesTable from './Expenses';
import { utlisObj } from '../utils'
import { idb } from '../idb';

// Define the "Report" component responsible for generating and displaying expense reports.
function Report() {
    // Define state variables for button state, displaying expenses, selected month, and expenses data.
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [showExpenses, setShowExpenses] = useState(false);
    const [selectedMonthYear, setSelectedMonthYear] = useState('');
    const [expenses, setExpenses] = useState([]);

    // Event handler for selecting a month and year.
    const onMonthYearChangeHandler = event => {
        const monthYear = event.target.value;

        setSelectedMonthYear(monthYear);
        setButtonDisabled(monthYear === '');
    };

    // Function to fetch the monthly expense report.
    const getMonthlyReport = async () => {
        const costsdb = await idb.openCostsDB('costsdb', 1);
        const expenses = await costsdb.getMonthlyReport(selectedMonthYear);

        return expenses;
    };

    // Async function to render the expense report.
    const renderReport = async () => {
        try {
            const expenses = await getMonthlyReport();

            setExpenses(expenses);
            setShowExpenses(true);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    };

    // Render the report section including month/year selection and button to show expenses.
    return (
        <>
            <header>
                <h2>Select Month</h2>
            </header>
            <section margin='mt-4' className='report-section'>
                <input type='month' margin='mb-3' max={utlisObj.getFormattedYearMonth(new Date())}
                    value={selectedMonthYear}
                    onChange={onMonthYearChangeHandler}
                />
                <Button variant='secondary' margin='mt-3'
                    disabled={buttonDisabled}
                    onClick={renderReport}>
                    Show Expenses
                </Button>
                <ExpensesTable show={showExpenses} setShow={setShowExpenses} expenses={expenses} />
            </section>
        </>
    );
}

// Export the "Report" component as the default export of this module.
export default Report;
