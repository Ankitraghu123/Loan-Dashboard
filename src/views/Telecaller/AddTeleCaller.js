import React, { useState } from 'react';
import { Card, Form, Row, Col } from '@themesberg/react-bootstrap';
import { useDispatch } from 'react-redux';
import { Box } from '@chakra-ui/react';
import { addTelecaller } from 'features/Telecaller/TelecallerSlice';

const AddTeleCaller = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        mobile: "",
        // role: "telecaller",
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

        // Dispatch the addTelecaller action with form data
        dispatch(addTelecaller(formData));
    };

    return (
        <Card flexDirection="column" w="100%" style={{marginTop:"80px"}} px="0px" overflowX={{ sm: 'scroll', lg: 'hidden' }}>
            <Card.Body>
                <h5 className="mb-4">Add Telecaller</h5>
                <Box>
                    <Form onSubmit={formHandler}>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="name">
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
                        <div className="mt-3 d-flex">
                            <button type='submit' className='submitBtn'>
                                Add Telecaller
                            </button>
                        </div>
                    </Form>
                </Box>
            </Card.Body>
        </Card>
    );
}

export default AddTeleCaller;
