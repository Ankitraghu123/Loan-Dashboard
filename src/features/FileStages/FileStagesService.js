import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "utils/config";


const AddFileStages = async (data)=>{
    const response = await axios.post(`${base_url}fileStages/add`,data,config)
    return response.data
}

const EditFileStages= async (data)=>{
    const response = await axios.put(`${base_url}fileStages/${data.id}`,data,config)
    return response.data
}

const deleteFileStages = async (id)=>{
    const response = await axios.delete(`${base_url}fileStages/${id}`,config)
    return response.data
}

const GetAllFileStages = async ()=>{
    const response = await axios.get(`${base_url}fileStages/all`,config)
    return response.data
}

const UpdateLeadFileStage = async (data)=>{
    const response = await axios.put(`${base_url}fileStages/update/lead`,data,config)
    return response.data
}


const FileStagesService = {AddFileStages,EditFileStages,deleteFileStages,GetAllFileStages,UpdateLeadFileStage}

export default FileStagesService
