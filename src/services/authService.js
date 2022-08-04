import axios from "axios";

const register = async (datas) => {
   const response = await axios.post(`${process.env.REACT_APP_URL}/auth/register`, { ...datas });
   if (response.data) localStorage.setItem('user', JSON.stringify(response.data));
   console.log(response.data);
   return response.data;
}

const login = async (datas) => {
   const response = await axios.post(`${process.env.REACT_APP_URL}/auth/login`, { ...datas });
   if (response.data) localStorage.setItem('user', JSON.stringify(response.data))
   return response.data
}

const logout = () => localStorage.removeItem('user')


const authService = {
   register,
   login,
   logout
}

export default authService;
