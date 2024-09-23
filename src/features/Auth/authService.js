import axios from "axios";
import { base_url } from "../../utils/base_url";


const LoginAdmin = async (data)=>{
    const response = await axios.post(`${base_url}admin/login`,data)
    const { token } = response.data;
    localStorage.setItem('authToken', token);
    return response.data
}





const AuthService = {LoginAdmin}

export default AuthService
