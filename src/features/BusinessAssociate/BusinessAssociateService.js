import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "utils/config";

const RegisterAssociate= async (data)=>{
    const response = await axios.post(`${base_url}businessAssociates/register`,data,config)
    const { token } = response.data;
    // localStorage.setItem('associateToken', token);
    // localStorage.setItem('associateData', JSON.stringify(response.data));
    return response.data
}

const LoginAssociate= async (data)=>{
    const response = await axios.post(`${base_url}businessAssociates/login`,data)
    const { token } = response.data;
    localStorage.setItem('associateToken', token);
    localStorage.setItem('associateData', JSON.stringify(response.data));
    return response.data
}


const GetAllAssociates= async (data)=>{
    const response = await axios.get(`${base_url}businessAssociates/all`)
    return response.data
}

const GetAllLeadsByAssociate = async (id)=>{
    const response = await axios.get(`${base_url}lead/${id}/all`)
    return response.data
}





const businessAssociateService = {LoginAssociate,GetAllAssociates,RegisterAssociate,GetAllLeadsByAssociate}

export default businessAssociateService
