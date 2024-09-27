import { Box } from '@chakra-ui/react';
import { Card, Form, Button, Row, Col } from '@themesberg/react-bootstrap';
import { addFileStages } from 'features/FileStages/FileStagesSlice';
import { GetAllLoans } from 'features/LoanType/loanTypeSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FileStageTable from './FileStageTable';

const AddFileStages = () => {
    const dispatch = useDispatch()
    const allLoanTypes = useSelector((state) => state.loanType?.allLoanTypes);
    useEffect(()=>{
        dispatch(GetAllLoans())
    },[])

    const [formData, setFormData] = useState({
        name: "",
        sequence:"",
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

        dispatch(addFileStages(formData));
            setFormData({
                name: "",
                sequence:"",
                loanType: "",
                loanPersonType:"",
            })
       
    };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
         <Form onSubmit={formHandler}>
         <Row>
         <Col md={3} className="mb-3">
                        <Form.Group id="loanPersonType">
        <Form.Label>Profile Type</Form.Label>
        <Form.Select
            name="loanPersonType"
            value={formData.loanPersonType}
            onChange={changeHandler}
            // isInvalid={!!errors.loanPersonType}
        >
            <option value="">Select Profile Type</option>
            <option value="selfEmployed">Self Employeed</option>
            <option value="salaried">Salaried</option>
        </Form.Select>
       
    </Form.Group>
                        </Col>
                        <Col md={3} className="mb-3">
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
         <Col md={3} className="mb-3">
                            <Form.Group id="leadName">
                                <Form.Label>FileStage Name</Form.Label>
                                <Form.Control
                                    name="name"
                                    value={formData.name}
                                    onChange={changeHandler}
                                    required
                                    type="text"
                                    placeholder="Enter FileStage Name"
                                />
                            </Form.Group>
                        </Col>

                        <Col md={3} className="mb-3">
                            <Form.Group id="sequence">
                                <Form.Label>Sequence</Form.Label>
                                <Form.Control
                                    name="sequence"
                                    value={formData.sequence}
                                    onChange={changeHandler}
                                    required
                                    type="Number"
                                    placeholder="Enter Sequence Number"
                                />
                            </Form.Group>
                        </Col>



                        <button className='submitBtn' type="submit">
                            Add FileStage
                        </button>
                        </Row>
                        </Form>
                        <FileStageTable/>
    </Box>
  )
}

export default AddFileStages