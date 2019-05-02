<template>
    <div class="evento-detalhes">

        <h1>
            {{evento.nome}}
        </h1>

        <div>
            <p>{{evento}}</p>
        </div>  
        
        <div v-show="!usuarioParticipante">
            <b-button v-model="evento" @click="adicionaParticipante(evento)">Participar</b-button>
        </div>

        <div v-show="usuarioParticipante">
            <b-button v-model="evento" @click="removeParticipante(evento)">Sair</b-button>
        </div>      

        <div>
            <ul>
                <li v-for="item in produtos" :key="item.id">
                    <router-link v-bind:to="'/produto/' + item.id"> {{ item }} </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Evento from '../services/eventos'
import Usuario from '../services/usuario'
import Produto from '../services/produtos'

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
            produto: {
                id: '',
                nome: '',
                descricao: '',
                usuario_id: '',
            },
            produtos: [],
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
                this.validaParticipacao(this.evento, this.usuario);
                this.getProdutosEvento();
            })
        },

        getProdutosEvento() {
            Produto.getProdutosEvento(this.$route.params.id).then((resposta) => {
                this.produtos = resposta.data.data;
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

        validaParticipacao(evento, usuario) {
            if(JSON.stringify(evento.participantes).includes(JSON.stringify(usuario))){
                this.usuarioParticipante = true;
            } else {
                this.usuarioParticipante = false;
            }
        }
    }
}
</script>

<style scoped>

</style>
