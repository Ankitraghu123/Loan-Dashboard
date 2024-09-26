import { Box } from '@chakra-ui/react';
import { Card, Form, Button, Row, Col } from '@themesberg/react-bootstrap';
import { AddLoanDocuments } from 'features/LoanType/loanTypeSlice';
import { GetAllLoans } from 'features/LoanType/loanTypeSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DocumentTable from './DocumentTable';

const AddDocuments = () => {
    const dispatch = useDispatch()
    const allLoanTypes = useSelector((state) => state.loanType?.allLoanTypes);
    useEffect(()=>{
        dispatch(GetAllLoans())
    },[])

    const [formData, setFormData] = useState({
        name: "",
        loanType: "",
        loanPersonType:"",
        
    });

    const changeHandler = (e) => {
        const { name, value } = e.target;
        const newFormData = { ...formData, [name]: value };
        setFormData(newFormData);
    };

    const formHandler = (e) => {
        e.preventDefault();

        dispatch(AddLoanDocuments(formData));
            setFormData({
                name: "",
                loanType: "",
                loanPersonType:"",
            })
       
    };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
         <Form onSubmit={formHandler}>
         <Row>
         <Col md={4} className="mb-3">
                            <Form.Group id="leadName">
                                <Form.Label>Document Name</Form.Label>
                                <Form.Control
                                    name="name"
                                    value={formData.name}
                                    onChange={changeHandler}
                                    required
                                    type="text"
                                    placeholder="Enter Document Name"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={4} className="mb-3">
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
                                        <option key={loan._id} value={loan._loanName}>
                                            {loan.loanName}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Col>

<Col md={4} className="mb-3">
                        <Form.Group id="loanPersonType">
        <Form.Label>Loan Person Type</Form.Label>
        <Form.Select
            name="loanPersonType"
            value={formData.loanPersonType}
            onChange={changeHandler}
            // isInvalid={!!errors.loanPersonType}
        >
            <option value="">Select loan Person Type</option>
            <option value="selfEmployed">Self Employeed</option>
            <option value="salaried">Salaried</option>
        </Form.Select>
       
    </Form.Group>
                        </Col>
                        <button className='submitBtn' type="submit">
                            Add Document
                        </button>
                        </Row>
                        </Form>
                        <DocumentTable/>
    </Box>
  )
}

export default AddDocuments