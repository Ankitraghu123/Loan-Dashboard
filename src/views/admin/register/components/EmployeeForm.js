import React, { useState } from 'react';
import { Card, Form, Button, Row, Col } from '@themesberg/react-bootstrap';
// import { useDispatch } from 'react-redux';
// import { registerEmployee } from '../features/employee/employeeSlice';

export const EmployeeForm = () => {
    // con qst dispatch = useDispatch()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        password: "",
        mobile: "",
        city: "",
        gender: "",
        password:""
    });

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // const formHandler = (e) => {
    //     e.preventDefault();
    //     dispatch(registerEmployee(formData))
    // };

    return (
        <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body>
                <h5 className="mb-4">Employee Details</h5>
                <Form >
                    <Row>
                        <Col md={6} className="mb-3">
                            <Form.Group id="contactPersonName">
                                <Form.Label>Employee Name</Form.Label>
                                <Form.Control
                                    name="name"
                                    value={formData.name}
                                    onChange={changeHandler}
                                    required
                                    type="text"
                                    placeholder="Enter Employee Name"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group id="contactPersonMobile">
                                <Form.Label>Employee Mobile</Form.Label>
                                <Form.Control
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={changeHandler}
                                    required
                                    type="tel"
                                    placeholder="Enter Employee Mobile"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} className="mb-3">
                            <Form.Group id="contactPersonEmail">
                                <Form.Label>Employee Email</Form.Label>
                                <Form.Control
                                    name="email"
                                    value={formData.email}
                                    onChange={changeHandler}
                                    required
                                    type="email"
                                    placeholder="Enter Employee Email"
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
                    <Row>
                    <Col md={6} className="mb-3">
                            <Form.Group id="gender">
                                <Form.Label>Gender</Form.Label>
                                <Form.Control
                                    name="gender"
                                    value={formData.gender}
                                    onChange={changeHandler}
                                    as="select"
                                    required
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group id="city">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    name="city"
                                    value={formData.city}
                                    onChange={changeHandler}
                                    required
                                    type="text"
                                    placeholder="Enter City"
                                />
                            </Form.Group>
                        </Col>

                    </Row>
                    <Row md={6} className="mb-3">
                    <Col md={12} className="mb-3">
                            <Form.Group id="address">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    name="address"
                                    value={formData.address}
                                    onChange={changeHandler}
                                    required
                                    type="text"
                                    placeholder="Enter Address"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <div className="mt-3">
                        <Button variant="primary" type="submit">
                            Add Employee
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};
