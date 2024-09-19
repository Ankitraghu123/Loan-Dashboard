import React, { useEffect, useState } from 'react';
import { Card, Form, Button, Row, Col } from '@themesberg/react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllLoans } from 'features/LoanType/loanTypeSlice';
import { AddLead } from 'features/Lead/leadSlice';

export const AddLeadForm = () => {
    const dispatch = useDispatch();
    const allLoanTypes = useSelector((state) => state.loanType?.allLoanTypes);
    const [formData, setFormData] = useState({
        name: "",
        mobileNumber: "",
        alternateMobileNumber: "",
        email: "",
        loanType: "",
        businessAssociate: "",
        referralName: "",
        lastAppliedBank: "",
        lastRejectionReason: ""
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(GetAllLoans());
    }, [dispatch]);

    const validate = (data) => {
        let validationErrors = {};
        const phoneRegex = /^[0-9]{10}$/;

        if (!phoneRegex.test(data.mobileNumber)) {
            validationErrors.mobileNumber = "Mobile number must be 10 digits.";
        }

        if (!["YES", "NO"].includes(data.referralName.toUpperCase())) {
            validationErrors.referralName = "Referral Name must be 'Yes' or 'No'.";
        }

        return validationErrors;
    };

    const changeHandler = (e) => {
        const { name, value } = e.target;
        const newFormData = { ...formData, [name]: value };
        setFormData(newFormData);
        
        // Validate on change
        const validationErrors = validate(newFormData);
        setErrors(validationErrors);
    };

    const formHandler = (e) => {
        e.preventDefault();
        const validationErrors = validate(formData);
        if (Object.keys(validationErrors).length === 0) {
            // Submit logic goes here
            dispatch(AddLead(formData));
            setFormData({
                name: "",
                mobileNumber: "",
                alternateMobileNumber: "",
                email: "",
                loanType: "",
                businessAssociate: "",
                referralName: "",
                lastAppliedBank: "",
                lastRejectionReason: ""
            })
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body>
                <h5 className="mb-4">Add Lead</h5>
                <Form onSubmit={formHandler}>
                    <Row>
                        <Col md={6} className="mb-3">
                            <Form.Group id="leadName">
                                <Form.Label>Lead Name</Form.Label>
                                <Form.Control
                                    name="name"
                                    value={formData.name}
                                    onChange={changeHandler}
                                    required
                                    type="text"
                                    placeholder="Enter Lead Name"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group id="mobileNumber">
                                <Form.Label>Mobile Number</Form.Label>
                                <Form.Control
                                    name="mobileNumber"
                                    value={formData.mobileNumber}
                                    onChange={changeHandler}
                                    required
                                    type="tel"
                                    placeholder="Enter Mobile Number"
                                    isInvalid={!!errors.mobileNumber}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.mobileNumber}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} className="mb-3">
                            <Form.Group id="alternateMobileNumber">
                                <Form.Label>Alternate Mobile Number</Form.Label>
                                <Form.Control
                                    name="alternateMobileNumber"
                                    value={formData.alternateMobileNumber}
                                    onChange={changeHandler}
                                    type="tel"
                                    placeholder="Enter Alternate Mobile Number"
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
                                    type="email"
                                    placeholder="Enter Email"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} className="mb-3">
                            <Form.Group id="loanType">
                                <Form.Label>Loan Type</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="loanType"
                                    value={formData.loanType}
                                    onChange={changeHandler}
                                    required
                                >
                                    <option value="">Select Loan Type</option>
                                    {allLoanTypes?.map((loan) => (
                                        <option key={loan._id} value={loan._id}>
                                            {loan.loanName}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group id="businessAssociate">
                                <Form.Label>Business Associate</Form.Label>
                                <Form.Control
                                    name="businessAssociate"
                                    value={formData.businessAssociate}
                                    onChange={changeHandler}
                                    type="text"
                                    placeholder="Enter Business Associate"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} className="mb-3">
                            <Form.Group id="referralName">
                                <Form.Label>Referral Name</Form.Label>
                                <Form.Control
                                    name="referralName"
                                    value={formData.referralName}
                                    onChange={changeHandler}
                                    type="text"
                                    placeholder="Enter Referral Name"
                                    isInvalid={!!errors.referralName}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.referralName}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group id="lastAppliedBank">
                                <Form.Label>Last Applied Bank</Form.Label>
                                <Form.Control
                                    name="lastAppliedBank"
                                    value={formData.lastAppliedBank}
                                    onChange={changeHandler}
                                    type="text"
                                    placeholder="Enter Last Applied Bank"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12} className="mb-3">
                            <Form.Group id="lastRejectionReason">
                                <Form.Label>Last Rejection Reason</Form.Label>
                                <Form.Control
                                    name="lastRejectionReason"
                                    value={formData.lastRejectionReason}
                                    onChange={changeHandler}
                                    type="text"
                                    placeholder="Enter Last Rejection Reason"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <div className="mt-3">
                        <Button variant="primary" type="submit">
                            Add Lead
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};
