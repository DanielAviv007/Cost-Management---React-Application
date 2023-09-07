import React from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import ExpensesTable from './Expenses';
import { getFormattedYearMonth } from '../utils'

function Report() {
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [showExpenses, setShowExpenses] = useState(false);
    const [selectedMonthYear, setSelectedMonthYear] = useState('');

    const onMonthYearChangeHandler = event => {
        const monthYear = event.target.value;

        setSelectedMonthYear(monthYear);
        setButtonDisabled(monthYear === '');
    };

    return (
        <>
            <header>
                <h2>Select Month</h2>
            </header>
            <section margin="mt-4" style={{ display: 'flex', width: '400px', justifyContent: 'space-between' }}>
                <input type="month" margin="mb-3" max={getFormattedYearMonth(new Date())}
                    style={{ borderRadius: '10px' }}
                    value={selectedMonthYear}
                    onChange={onMonthYearChangeHandler}
                />
                <Button variant="secondary" margin="mt-3"
                    disabled={buttonDisabled}
                    onClick={() => setShowExpenses(true)}>
                    Show Expenses
                </Button>
                <ExpensesTable show={showExpenses} setShow={setShowExpenses} />
            </section>
        </>
    );
}

export default Report;
