// Daniel Aviv 209228154
// Yarin Naftali 208678565

// Import necessary dependencies from React and other modules.
import React, { useState } from 'react';
import { idb } from '../idb';
import { Button, Form, FloatingLabel, InputGroup } from 'react-bootstrap';

// Define the "CostForm" component responsible for adding costs.
function CostForm() {
    // Define an array of expense categories.
    const categories = ['FOOD', 'HEALTH', 'EDUCATION', 'TRAVEL', 'HOUSING', 'OTHER'];

    // Define state variables for sum, category, and description inputs.
    const [sum, setSum] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');

    // Event handlers for input changes.
    const onSumChangeHandler = event => setSum(event.target.value);
    const onCategoryChangeHandler = event => setCategory(event.target.value);
    const onDescriptionChangeHandler = event => setDescription(event.target.value);

    // Function to reset form fields.
    const resetFields = () => {
        setSum('');
        setCategory('');
        setDescription('');
    };

    // Function to handle adding a new cost.
    const addCostHandler = async (event) => {
        event.preventDefault();

        try {
            // Open the IndexedDB database and add the cost data.
            const costsDB = await idb.openCostsDB('costsdb', 1);
            const costData = {
                sum: sum,
                category: category,
                description: description,
                date: new Date()
            };
            await costsDB.addCost(costData);
            resetFields();
        } catch (error) {
            console.error(error);
            alert(error);
        }
    };

    // Render the cost input form.
    return (
        <>
            <header>
                <h1>Cost Form</h1>
            </header>
            <Form className='rounded p-4 mb-5 shadow-lg cost-form' onSubmit={addCostHandler}>
                <InputGroup className='mb-3'>
                    <Form.Control min={0.01} step={0.01} type='number' required
                        value={sum}
                        onChange={onSumChangeHandler}
                    />
                    <InputGroup.Text>$</InputGroup.Text>
                </InputGroup>
                <FloatingLabel label='Select a category' className='mb-3'>
                    <Form.Select required
                        value={category}
                        onChange={onCategoryChangeHandler}
                    >
                        <option disabled value=""></option>
                        {categories.map(cat => <option key={cat}>{cat}</option>)}
                    </Form.Select>
                </FloatingLabel>
                <Form.Group className='mb-3'>
                    <FloatingLabel label='Description' className='mb-4'>
                        <Form.Control as='textarea' placeholder='Enter purchase description' required
                            className='desc-field'
                            value={description}
                            onChange={onDescriptionChangeHandler}
                        />
                    </FloatingLabel>
                </Form.Group>
                <div className='d-flex justify-content-center'>
                    <Button className='btn-lg' type='submit'>Add Cost</Button>
                </div>
            </Form>
        </>
    );
}

// Export the "CostForm" component as the default export of this module.
export default CostForm;
