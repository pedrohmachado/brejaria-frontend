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
    }
}
