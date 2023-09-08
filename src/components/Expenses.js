import { Modal, Alert, Table } from 'react-bootstrap';

function ExpensesTable({ show, setShow, expenses = [] }) {
    const onHide = () => setShow(false);
    const rowExpense = ({sum, description, category}) => {
        return (
            <tr>
                <td>{sum}</td>
                <td>{description}</td>
                <td>{category}</td>
            </tr>
        );
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Expenses</Modal.Title>
            </Modal.Header>
            {
                !expenses.length ?
                <Alert key='info' variant='info' className='m-2'>No expenses for this month</Alert> :
                <Table striped bordered hover>
                    <thead>
                        <th>Amount</th>
                        <th>Description</th>
                        <th>Category</th>
                    </thead>
                    <tbody> {expenses.map(rowExpense)} </tbody>
                </Table>
            }
        </Modal>
    );
}

export default ExpensesTable;
