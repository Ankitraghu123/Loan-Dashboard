import axios from "axios";
import { base_url } from "../../utils/base_url";

const AddCall = async (data)=>{
    const response = await axios.post(`${base_url}call/addCall`,data)
    return response.data
}

const GetAllByLead = async (id)=>{
    const response = await axios.get(`${base_url}call/all/${id}`)
    return response.data
}

const GetTodaysCall = async (id)=>{
    const response = await axios.get(`${base_url}call/all/${id}`)
    return response.data
}




const CallService = {AddCall,GetAllByLead}

export default CallService
