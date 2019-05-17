import { instance } from './config'

export default {

    cadastra:(usuario)=>{
        return instance.post('usuario/novo', usuario)
    },

    login:(usuario)=>{
        return instance.post('usuario/login', usuario)
    },

    getPerfil:()=>{
        return instance.get('eu', {
            headers: { Authorization: `Bearer ` + localStorage.getItem('token') }
        })
    },

    altera:(usuario, novaSenha) => {
        return instance.put('usuario/'+novaSenha+'/alterar', usuario, {
            headers: { Authorization: `Bearer ` + localStorage.getItem('token') }
        })
    },

    getProdutores:() => {
        return instance.get('produtores', {
            headers: { Authorization: `Bearer ` + localStorage.getItem('token') }
        })
    },

    getProdutor: (IDUsuario) => {
        return instance.get('produtor/' + IDUsuario, {
            headers: { Authorization: `Bearer ` + localStorage.getItem('token') }
        })
    }
}
