import React from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import ExpensesTable from './Expenses';

function ReportGenerator() {
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [showExpenses, setShowExpenses] = useState(false);
    const [selectedMonthYear, setSelectedMonthYear] = useState('');

    const getCurrentMonthYear = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;

        return `${year}-${month < 10 ? '0' : ''}${month}`;
    };

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
                <input type="month" margin="mb-3" max={getCurrentMonthYear()}
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

export default ReportGenerator;
