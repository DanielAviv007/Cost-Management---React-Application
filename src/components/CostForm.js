import React, { useState } from 'react';
import { idb } from '../idb';
import { Button, Form, FloatingLabel, InputGroup } from 'react-bootstrap';

function CostForm() {
    const categories = ['FOOD', 'HEALTH', 'EDUCATION', 'TRAVEL', 'HOUSING', 'OTHER'];

    const [sum, setSum] = useState(0.01);
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');

    const onSumChangeHandler = event => setSum(parseFloat(event.target.value));
    const onCategoryChangeHandler = event => setCategory(event.target.value);
    const onDescriptionChangeHandler = event => setDescription(event.target.value);

    const addCostHandler = async (event) => {
        event.preventDefault();

        const costsDB = await idb.openCostsDB('costsdb', 1);
        const costData = {
            sum: sum,
            category: category,
            description: description,
            date: new Date()
        };
        const result = await costsDB.addCost(costData);

        // TODO: handle errors
    };

    return (
        <>
            <header>
                <h1>Cost Form</h1>
            </header>
            <Form className='rounded p-4 mb-5 shadow-lg costForm' style={{ width: '400px' }}>
                <InputGroup className='mb-3'>
                    <Form.Control min={0.01} step={0.01} type='number' required
                        value={sum}
                        onChange={onSumChangeHandler}
                    />
                    <InputGroup.Text>$</InputGroup.Text>
                </InputGroup>
                <FloatingLabel label='Select a category' className='mb-3'>
                    <Form.Select
                        value={category}
                        onChange={onCategoryChangeHandler}
                    >
                        {categories.map(cat => <option key={cat}>{cat}</option>)}
                    </Form.Select>
                </FloatingLabel>
                <Form.Group className='mb-3'>
                    <FloatingLabel label='Description' className='mb-4'>
                        <Form.Control as='textarea' placeholder='Enter purchase description'
                            className='descField'
                            value={description}
                            onChange={onDescriptionChangeHandler}
                            style={{ height: '200px', resize: 'none' }}
                        />
                    </FloatingLabel>
                </Form.Group>
                <div className='d-flex justify-content-center'>
                    <Button className='btn-lg' type='submit' onClick={addCostHandler}>Add Cost</Button>
                </div>
            </Form>
        </>
    );
}

export default CostForm;
