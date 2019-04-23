<template>
    <div class="evento-detalhes">  
        <p>{{evento}}</p>
    </div>
</template>

<script>
import Evento from '../services/eventos'

export default {
    data() {
        return{
            evento: {
                id: '',
                nome: '',
                descricao: '',
                local: '',
                data_evento: '',
                data_criacao: '',
                status: '',
                usuario_id: '',
                participantes: [],
            },
        }
    },

    mounted() {
        this.getEvento()
    },

    methods: {
        getEvento() {
            Evento.getEvento(this.$route.params.id).then((resposta) => {
                this.evento = resposta.data.data
            })
        }
    }
}
</script>

<style scoped>

</style>
