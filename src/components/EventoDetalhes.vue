<template>
    <div class="evento-detalhes">  
        <p>{{evento}}</p>
        <div v-show="!usuarioParticipante">
            <b-button v-model="evento" @click="adicionaParticipante(evento)">Participar</b-button>
        </div>

        <div v-show="usuarioParticipante">
            <b-button v-model="evento" @click="removeParticipante(evento)">Sair</b-button>
        </div>      
    </div>
</template>

<script>
import Evento from '../services/eventos'
import Usuario from '../services/usuario'

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
            usuario: '',
            usuarioParticipante : '',
            
        }
    },

    mounted() {
        this.getUsuario();
        this.getEvento();
    },

    methods: {
        getUsuario() {
            Usuario.getPerfil().then((resposta) => {
                this.usuario = resposta.data.data;
            })
        },

        getEvento() {
            Evento.getEvento(this.$route.params.id).then((resposta) => {
                this.evento = resposta.data.data;
                if(this.evento.participantes === null) {
                    this.usuarioParticipante = false;
                } else {
                    if(JSON.stringify((this.evento.participantes).includes(JSON.stringify(this.usuario)))) {
                        this.usuarioParticipante = !this.usuarioParticipante;
                    } else {
                        this.usuarioParticipante = this.usuarioParticipante;
                    }
                }
            })
        },

        adicionaParticipante(evento) {
            Evento.adicionaParticipante(evento.id).then(() => {
                this.getEvento();
            })
        },

        removeParticipante(evento) {
            Evento.removeParticipante(evento.id).then(()=>{
                this.getEvento();
            })
        },
    }
}
</script>

<style scoped>

</style>
