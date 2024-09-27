import React, { useState } from 'react';
import { Card, Form, Row, Col } from '@themesberg/react-bootstrap';
import { useDispatch } from 'react-redux';
import { RegisterAssociate } from 'features/BusinessAssociate/BusinessAssociateSlice';
import { Box } from '@chakra-ui/react';

const AssociateRegisterForm = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        mobile: "",
        currentDesignation: "",
        currentBank: "",
        location: ""
    });

    const [errors, setErrors] = useState({});

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Validate mobile number when it's being changed
        if (name === 'mobile') {
            if (!validateMobileNumber(value)) {
                setErrors({ ...errors, mobile: "Mobile number must be exactly 10 digits." });
            } else {
                setErrors({ ...errors, mobile: "" }); // Clear error if valid
            }
        } else {
            setErrors({ ...errors, [name]: "" }); // Clear error for other fields
        }
    };

    const validateMobileNumber = (mobile) => {
        // Check if mobile number is exactly 10 digits and numeric
        return mobile.length === 10 && /^[0-9]+$/.test(mobile);
    };

    const formHandler = (e) => {
        e.preventDefault();

        // Final validation before dispatching
        if (!validateMobileNumber(formData.mobile)) {
            setErrors({ ...errors, mobile: "Mobile number must be exactly 10 digits." });
            return;
        }

        dispatch(RegisterAssociate(formData));
    };

    return (
        <Card flexDirection="column" w="100%" px="0px" overflowX={{ sm: 'scroll', lg: 'hidden' }}>
            <Card.Body>
                <h5 className="mb-4">Associate Details</h5>
                <Box>
                    <Form onSubmit={formHandler}>
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
                            <Col md={6} className="mb-3">
                                <Form.Group id="email">
                                    <Form.Label>Email</Form.Label>
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
                        </Row>
                        <Row>
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
                            <Col md={6} className="mb-3">
                                <Form.Group id="mobile">
                                    <Form.Label>Mobile Number</Form.Label>
                                    <Form.Control
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={changeHandler}
                                        required
                                        type="text"
                                        placeholder="Enter Mobile"
                                    />
                                    {errors.mobile && <div style={{ color: 'red' }}>{errors.mobile}</div>}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="currentDesignation">
                                    <Form.Label>Current Designation</Form.Label>
                                    <Form.Control
                                        name="currentDesignation"
                                        value={formData.currentDesignation}
                                        onChange={changeHandler}
                                        type="text"
                                        placeholder="Enter Current Designation"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="currentBank">
                                    <Form.Label>Current Bank</Form.Label>
                                    <Form.Control
                                        name="currentBank"
                                        value={formData.currentBank}
                                        onChange={changeHandler}
                                        type="text"
                                        placeholder="Enter Current Bank"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Col md={6} className="mb-3">
                            <Form.Group id="location">
                                <Form.Label>Location</Form.Label>
                                <Form.Control
                                    name="location"
                                    value={formData.location}
                                    onChange={changeHandler}
                                    type="text"
                                    placeholder="Enter Location"
                                />
                            </Form.Group>
                        </Col>
                        <div className="mt-3 d-flex">
                            <button type='submit' className='submitBtn'>
                                Add Business Associate
                            </button>
                        </div>
                    </Form>
                </Box>
            </Card.Body>
        </Card>
    );
}

export default AssociateRegisterForm;
