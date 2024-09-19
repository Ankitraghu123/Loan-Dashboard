import axios from "axios";
import { base_url } from "../../utils/base_url";

const AddLoanType = async (data)=>{
    const response = await axios.post(`${base_url}loan/addLoan`,data)
    return response.data
}

const EditLoanType = async (data)=>{
    const response = await axios.put(`${base_url}loan/${data.id}`,data)
    return response.data
}

const GetAllLoans = async ()=>{
    const response = await axios.get(`${base_url}loan/all`)
    return response.data
}

const deleteLoan = async (id)=>{
    const response = await axios.delete(`${base_url}loan/${id}`)
    return response.data
}



const LoanTypeService = {AddLoanType,GetAllLoans,EditLoanType,deleteLoan}

export default LoanTypeService
