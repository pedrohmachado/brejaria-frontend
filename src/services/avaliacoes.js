import { instance } from './config'

export default {
    getAvaliacaoMediaEvento:(IDEvento) => {
        return instance.get('evento/' + IDEvento + '/avaliacao', {
            headers: { Authorization: `Bearer ` + localStorage.getItem('token')}
        })
    },

    getAvaliacaoMediaProduto:(IDProduto) => {
        return instance.get('produto/' + IDProduto + '/avaliacao', {
            headers: { Authorization: `Bearer ` + localStorage.getItem('token')}
        })
    },

    avaliaProduto:(IDProduto, avaliacao) => {
        return instance.post('produto/' + IDProduto + '/avaliar', avaliacao, {
            headers: { Authorization: `Bearer ` + localStorage.getItem('token')}
        })
    },

    avaliaEvento:(IDEvento, avaliacao) => {
        return instance.post('evento/' + IDEvento + '/avaliar', avaliacao, {
            headers: { Authorization: `Bearer ` + localStorage.getItem('token')}
        })
    },
    
    getAvaliacaoUsuarioEvento:(IDEvento) => {
        return instance.get('evento/' + IDEvento + '/avaliacao-usuario', {
            headers: { Authorization: `Bearer ` + localStorage.getItem('token')}
        })
    },

    getAvaliacaoUsuarioProduto:(IDProduto) => {
        return instance.get('produto/' + IDProduto + '/avaliacao-usuario', {
            headers: { Authorization: `Bearer ` + localStorage.getItem('token')}
        })
    },
}