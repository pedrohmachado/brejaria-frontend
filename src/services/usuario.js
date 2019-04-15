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
        delete instance.defaults.headers.common['Authorization'];
        localStorage.removeItem("token");
        return
    }
}
