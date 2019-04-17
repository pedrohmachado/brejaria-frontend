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
    }
}
