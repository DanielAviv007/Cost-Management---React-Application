import React from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import ExpensesTable from './Expenses';
import { getFormattedYearMonth } from '../utils'
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

        // TODO: check for errors!
        return expenses;
    };
    const renderReport = async () => {
        const expenses = await getMonthlyReport();

        setExpenses(expenses);
        setShowExpenses(true);
    };

    return (
        <>
            <header>
                <h2>Select Month</h2>
            </header>
            <section margin='mt-4' style={{ display: 'flex', width: '400px', justifyContent: 'space-between' }}>
                <input type='month' margin='mb-3' max={getFormattedYearMonth(new Date())}
                    style={{ borderRadius: '10px' }}
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
