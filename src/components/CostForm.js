import React, { useState } from 'react';
import { idb } from '../idb';
import { Button, Form, FloatingLabel, InputGroup } from 'react-bootstrap';

function CostForm() {
    const categories = ['FOOD', 'HEALTH', 'EDUCATION', 'TRAVEL', 'HOUSING', 'OTHER'];

    const [sum, setSum] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');

    const onSumChangeHandler = event => setSum(event.target.value);
    const onCategoryChangeHandler = event => setCategory(event.target.value);
    const onDescriptionChangeHandler = event => setDescription(event.target.value);

    const resetFields = () => {
        setSum('');
        setCategory('');
        setDescription('');
    };
    const addCostHandler = async (event) => {
        event.preventDefault();

        try {
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

    return (
        <>
            <header>
                <h1>Cost Form</h1>
            </header>
            <Form className='rounded p-4 mb-5 shadow-lg costForm' style={{ width: '400px' }} onSubmit={addCostHandler}>
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
                        required
                    >
                        <option disabled value=""></option>
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
                    <Button className='btn-lg' type='submit'>Add Cost</Button>
                </div>
            </Form>
        </>
    );
}

export default CostForm;
