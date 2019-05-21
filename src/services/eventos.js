import { instance } from './config'

export default {

    cadastraEvento:(evento)=>{
        return instance.post('evento/novo', evento, {
            headers: { Authorization: `Bearer ` + localStorage.getItem('token') }
        })
    },

    getEventos:() => {
        return instance.get('eventos', {
            headers: { Authorization: `Bearer ` + localStorage.getItem('token') }
        })
    },

    adicionaParticipante:(IDEvento) =>{
        let URLParametrizada = 'evento/' + IDEvento + '/participar'
        return instance.post(URLParametrizada, {},  {
            headers: { Authorization: `Bearer ` + localStorage.getItem('token') }
        })
    },

    removeParticipante:(IDEvento) =>{
        let URLParametrizada = 'evento/' + IDEvento + '/remover'
        return instance.post(URLParametrizada, {}, {
            headers: { Authorization: `Bearer ` + localStorage.getItem('token') }
        })
    },

    getEvento:(IDEvento) => {
        return instance.get('evento/' + IDEvento, {
            headers: { Authorization: `Bearer ` + localStorage.getItem('token') }
        })
    },

    getMeusEventos:() => {
        return instance.get('eu/eventos', {
            headers: { Authorization: `Bearer ` + localStorage.getItem('token') }
        })
    },

    getEventosProduto:(IDProduto) => {
        return instance.get('produto/' + IDProduto + '/eventos', {
            headers: { Authorization: `Bearer ` + localStorage.getItem('token') }
        })
    },

    getEventosInscritos:() => {
        return instance.get('eventos/eu', {
            headers: { Authorization: `Bearer ` + localStorage.getItem('token') }
        })
    },

    getEventosProdutor:(IDProdutor) => {
        return instance.get('produtor/' + IDProdutor + '/eventos', {
            headers: { Authorization: `Bearer ` + localStorage.getItem('token') }
        })
    },

    alteraEvento:(evento)=>{
        return instance.put('evento/alterar', evento, {
            headers: { Authorization: `Bearer ` + localStorage.getItem('token') }
        })
    },

    adicionaProdutoEvento:(eventos, IDEvento)=>{
        return instance.post('evento/' +IDEvento+ '/adicionar-produtos', eventos, {
            headers: { Authorization: `Bearer ` + localStorage.getItem('token') }
        })
    }
}
