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
    },

    getProdutosEvento:(IDEvento) => {
        return instance.get('evento/' + IDEvento + '/produtos', {
            headers: { Authorization: `Bearer ` + localStorage.getItem('token') }
        })
    },

    getProduto:(IDProduto)=>{
        return instance.get('produto/' + IDProduto, {
            headers: { Authorization: `Bearer ` + localStorage.getItem('token') }
        })
    }
}
