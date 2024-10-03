import axios from "axios";
import { base_url } from "../../utils/base_url";


const LoginAdmin = async (data)=>{
    const response = await axios.post(`${base_url}admin/login`,data)

    if(response.data.role == 'admin'){
        const { token } = response.data;
        localStorage.setItem('authToken', token);
        localStorage.setItem('authData', JSON.stringify(response.data));
    }else if(response.data.role == 'associate'){
        const { token } = response.data;
        localStorage.setItem('associateToken', token);
        localStorage.setItem('associateData', JSON.stringify(response.data));
    }else if(response.data.role == 'manager'){
        const { token } = response.data;
        localStorage.setItem('managerToken', token);
        localStorage.setItem('managerData', JSON.stringify(response.data));
    }else if(response.data.role == 'telecaller'){
        const { token } = response.data;
        localStorage.setItem('telecallerToken', token);
        localStorage.setItem('telecallerData', JSON.stringify(response.data));
    }else if(response.data.role == 'salesExecutive'){
        const { token } = response.data;
        localStorage.setItem('salesExecutive', token);
        localStorage.setItem('salesExecutiveData', JSON.stringify(response.data));
    }
    
    return response.data
}





const AuthService = {LoginAdmin}

export default AuthService
