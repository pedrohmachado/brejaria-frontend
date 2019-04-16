import { instance } from './config'

export default {

    login:(usuario)=>{
         return instance.post('usuario/login', usuario)
    },

    getPerfil:()=>{
        return instance.get('eu', {
            headers: { Authorization: `Bearer ` + localStorage.getItem('token') }
        })
    }
}
