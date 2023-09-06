import React from 'react';
import { Button } from 'react-bootstrap';

function ReportGenerator() {
    return (
        <>
            <header>
                <h2>Select Month</h2>
            </header> 
            <section margin="mt-4" style={{display: 'flex', width: '400px', justifyContent: 'space-between'}}>
                <input type="month" margin="mb-3" style={{borderRadius: '10px'}}/>
                <Button variant="secondary" margin="mt-3">
                    Get Report
                </Button>
            </section>
        </>
    );
}

export default ReportGenerator;
