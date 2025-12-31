import axios from 'axios'
import Swal from 'sweetalert2'

const api = axios.create({
    baseURL: 'http://localhost:5000/api'
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)


let isLoggingOut = false


api.interceptors.response.use(
    (response) => {

        return response
    },
    (error) => {

        if (error.response && error.response.status === 401) {
            isLoggingOut = true
            
            Swal.fire({
                title: 'Session over!',
                text: 'The token has expired, please log in again to continue working.',
                icon: 'warning',
                confirmButtonText: 'Log in',
                allowOutsideClick: false
            }).then((result) => {

                    localStorage.removeItem('token'); 
                    window.location.href = '/login';

                if(window.location.pathname !== '/login') {
                    window.location.href = '/login'
        }
            });
        }
        
        return Promise.reject(error)
    }
)

export default api;