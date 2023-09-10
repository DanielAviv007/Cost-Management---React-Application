// Daniel Aviv 209228154
// Yarin Naftali 208678565

// Import necessary components from the react-bootstrap library.
import { Modal, Alert, Table } from 'react-bootstrap';

// Define the "ExpensesTable" component which displays expenses in a modal.
function ExpensesTable({ show, setShow, expenses = [] }) {
    // Callback function to close the modal.
    const onHide = () => setShow(false);

    // Helper function to render a row for each expense in the table.
    const rowExpense = ({ sum, description, category }, idx) => {
        return (
            <tr key={idx}>
                <td>{sum}</td>
                <td>{description}</td>
                <td>{category}</td>
            </tr>
        );
    };

    // Render the modal that displays expenses.
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Expenses</Modal.Title>
            </Modal.Header>
            {
                // Conditionally render an alert if there are no expenses, otherwise render the provided expenses.
                !expenses.length ?
                    <Alert key='info' variant='info' className='m-2'>No expenses for this month</Alert> :
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Amount</th>
                                <th>Description</th>
                                <th>Category</th>
                            </tr>
                        </thead>
                        <tbody>{expenses.map(rowExpense)}</tbody>
                    </Table>
            }
        </Modal>
    );
}

// Export the "ExpensesTable" component as the default export of this module.
export default ExpensesTable;
