import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "utils/config";

const AddLead = async (data)=>{
    const response = await axios.post(`${base_url}lead/addLead`,data,config)
    return response.data
}

const GetAllLeads = async (data)=>{
    const response = await axios.get(`${base_url}lead/all`,config)
    return response.data
}

const GetSingleLead = async (id)=>{
    const response = await axios.get(`${base_url}lead/${id}`,config)
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

const GetPendingLeadByAssociate = async (id)=>{
    const response = await axios.get(`${base_url}lead/${id}/pending`)
    return response.data
}

const GetSanctionedLeadByAssociate = async (id)=>{
    const response = await axios.get(`${base_url}lead/${id}/sanctioned`)
    return response.data
}

const GetRejectedLeadByAssociate = async (id)=>{
    const response = await axios.get(`${base_url}lead/${id}/rejected`)
    return response.data
}




const LeadService = {AddLead,GetAllLeads,GetSingleLead,DeleteLead,EditLead,GetPendingLeadByAssociate,GetSanctionedLeadByAssociate,GetRejectedLeadByAssociate}

export default LeadService
