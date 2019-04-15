import { instance } from './config'

export default {
    login:(usuario)=>{     
        return instance.post('usuario/login', usuario)
    },

    getPerfil:()=> {
        instance.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("token");
        return instance.get('eu')
    },

    logout:()=>{
        instance.defaults.headers.common['Authorization'] = "";
        return localStorage.removeItem("token")
    }
}
