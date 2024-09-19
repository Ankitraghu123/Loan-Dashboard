import axios from "axios";
import { base_url } from "../../utils/base_url";

const AddLead = async (data)=>{
    const response = await axios.post(`${base_url}lead/addLead`,data)
    return response.data
}

const GetAllLeads = async (data)=>{
    const response = await axios.get(`${base_url}lead/all`)
    return response.data
}

const GetSingleLead = async (id)=>{
    const response = await axios.get(`${base_url}lead/${id}`)
    return response.data
}

const DeleteLead = async (id)=>{
    const response = await axios.delete(`${base_url}lead/${id}`)
    return response.data
}

const EditLead = async (data)=>{
    const response = await axios.put(`${base_url}lead/${data.id}`,data)
    return response.data
}




const LeadService = {AddLead,GetAllLeads,GetSingleLead,DeleteLead,EditLead}

export default LeadService
