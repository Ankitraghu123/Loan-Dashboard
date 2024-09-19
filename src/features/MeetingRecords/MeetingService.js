import axios from "axios";
import { base_url } from "../../utils/base_url";

const AddMeeting = async (data)=>{
    const response = await axios.post(`${base_url}meeting/addMeeting`,data)
    return response.data
}

const GetAllByLead = async (id)=>{
    const response = await axios.get(`${base_url}meeting/all/${id}`)
    return response.data
}



const MeetingService = {AddMeeting,GetAllByLead}

export default MeetingService
