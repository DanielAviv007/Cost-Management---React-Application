// Daniel Aviv 209228154
// Yarin Naftali 208678565
import React from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import ExpensesTable from './Expenses';
import { utlisObj } from '../utils'
import { idb } from '../idb';

function Report() {
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [showExpenses, setShowExpenses] = useState(false);
    const [selectedMonthYear, setSelectedMonthYear] = useState('');
    const [expenses, setExpenses] = useState([]);

    const onMonthYearChangeHandler = event => {
        const monthYear = event.target.value;

        setSelectedMonthYear(monthYear);
        setButtonDisabled(monthYear === '');
    };
    const getMonthlyReport = async () => {
        const costsdb = await idb.openCostsDB('costsdb', 1);
        const expenses = await costsdb.getMonthlyReport(selectedMonthYear);

        return expenses;
    };
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

export default Report;
