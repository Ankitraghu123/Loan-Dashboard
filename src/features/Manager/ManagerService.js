import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "utils/config";

const AddManager = async (data)=>{
    const response = await axios.post(`${base_url}manager/add`,data,config)
    return response.data
}

const EditManager = async (data)=>{
    console.log(data)
    const response = await axios.put(`${base_url}manager/${data.id}`,data,config)
    return response.data
}

const DeleteManager = async (id)=>{
    const response = await axios.delete(`${base_url}manager/${id}`,config)
    return response.data
}

const GetAllManager = async (id)=>{
    const response = await axios.get(`${base_url}manager/all`,config)
    return response.data
}



const ManagerService = {AddManager,GetAllManager,EditManager,DeleteManager}

export default ManagerService
