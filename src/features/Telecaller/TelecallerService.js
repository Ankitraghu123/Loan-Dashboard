import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "utils/config";

const AddTelecaller = async (data)=>{
    const response = await axios.post(`${base_url}telecaller/add`,data,config)
    return response.data
}

const EditTelecaller = async (data)=>{
    console.log(data)
    const response = await axios.put(`${base_url}telecaller/${data.id}`,data,config)
    return response.data
}

const DeleteTelecaller = async (id)=>{
    const response = await axios.delete(`${base_url}telecaller/${id}`,config)
    return response.data
}

const GetAllTelecaller = async (id)=>{
    const response = await axios.get(`${base_url}telecaller/all`,config)
    return response.data
}



const TelecallerService = {AddTelecaller,GetAllTelecaller,EditTelecaller,DeleteTelecaller}

export default TelecallerService
