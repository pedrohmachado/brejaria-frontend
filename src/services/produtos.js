import { instance } from './config'

export default {

    cadastraProduto:(produto)=>{
        return instance.post('produto/novo', produto, {
            headers: { Authorization: `Bearer ` + localStorage.getItem('token') }
        })
    },

    getProdutos:() => {
        return instance.get('produtos', {
            headers: { Authorization: `Bearer ` + localStorage.getItem('token') }
        })
    },

    getMeusProdutos:() => {
        return instance.get('eu/produtos', {
            headers: { Authorization: `Bearer ` + localStorage.getItem('token') }
        })
    }
}
