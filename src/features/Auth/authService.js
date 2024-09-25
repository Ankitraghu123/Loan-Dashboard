import axios from "axios";
import { base_url } from "../../utils/base_url";


const LoginAdmin = async (data)=>{
    const response = await axios.post(`${base_url}admin/login`,data)

    if(response.data.role == 'admin'){
        const { token } = response.data;
        localStorage.setItem('authToken', token);
    }else{
        const { token } = response.data;
        localStorage.setItem('associateToken', token);
        localStorage.setItem('associateData', JSON.stringify(response.data));
    }
    
    return response.data
}





const AuthService = {LoginAdmin}

export default AuthService
