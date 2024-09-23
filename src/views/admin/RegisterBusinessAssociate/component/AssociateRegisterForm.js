import React, { useState } from 'react'
import { useDisclosure } from '@chakra-ui/react';
import { LoginAssociate } from 'features/BusinessAssociate/BusinessAssociateSlice';
import { Card, Form, Button, Row, Col } from '@themesberg/react-bootstrap';
import { useDispatch } from 'react-redux';
import { RegisterAssociate } from 'features/BusinessAssociate/BusinessAssociateSlice';

const AssociateRegisterForm = () => {
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const formHandler = (e) => {
        e.preventDefault()
        dispatch(RegisterAssociate(formData))
        
    }

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
    <Card.Body>
        <h5 className="mb-4">Associate Details</h5>
        <Form >
            <Row>
                <Col md={6} className="mb-3">
                    <Form.Group id="contactPersonName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            name="name"
                            value={formData.name}
                            onChange={changeHandler}
                            required
                            type="text"
                            placeholder="Enter Name"
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={6} className="mb-3">
                    <Form.Group id="email">
                        <Form.Label> Email</Form.Label>
                        <Form.Control
                            name="email"
                            value={formData.email}
                            onChange={changeHandler}
                            required
                            type="email"
                            placeholder="Enter Email"
                        />
                    </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            name="password"
                            value={formData.password}
                            onChange={changeHandler}
                            required
                            type="text"
                            placeholder="Enter Password"
                        />
                    </Form.Group>
                </Col>

            </Row>
            <div className="mt-3">
                <Button variant="primary" onClick={formHandler}>
                    Add Business Associate
                </Button>
            </div>
        </Form>
    </Card.Body>
</Card>
  )
}

export default AssociateRegisterForm