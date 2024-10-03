import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "utils/config";

const AddSalesExecutive = async (data)=>{
    const response = await axios.post(`${base_url}salesExecutive/add`,data,config)
    return response.data
}

const EditSalesExecutive = async (data)=>{
    console.log(data)
    const response = await axios.put(`${base_url}salesExecutive/${data.id}`,data,config)
    return response.data
}

const DeleteSalesExecutive = async (id)=>{
    const response = await axios.delete(`${base_url}salesExecutive/${id}`,config)
    return response.data
}

const GetAllSalesExecutive = async (id)=>{
    const response = await axios.get(`${base_url}salesExecutive/all`,config)
    return response.data
}



const SalesExecutiveService = {AddSalesExecutive,GetAllSalesExecutive,EditSalesExecutive,DeleteSalesExecutive}

export default SalesExecutiveService
