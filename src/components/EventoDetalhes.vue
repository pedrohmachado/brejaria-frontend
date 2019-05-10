<template>
    <div class="evento-detalhes">

        <h1>
            {{evento.nome}}
        </h1>

        <b-card bg-variant="dark" text-variant="white" class="info-evento" no-body>
            <b-tabs card>
                <b-tab title="Info" active>
                    <b-card-text>Informações sobre {{evento.nome}}</b-card-text>
                    <b-img class="img" thumbnail fluid v-bind:src="urlImagem"/>
                    <b-container style="padding: 20px;">
                        <p>Descrição: {{evento.descricao}}</p>
                        <p>Local: {{evento.local}}</p>
                        <p>Data do evento: {{evento.data_evento}}</p>
                        <p><small>Data de criação: {{evento.data_criacao}}</small></p>
                        <p>Participantes: {{numParticipantes}}</p>
                        <p>Produtos: {{numProdutos}}</p>
                        <p>Ranking: </p>
                    </b-container>
                </b-tab>
                <b-tab title="Produtos">
                    <b-card-text>Total: {{numProdutos}}</b-card-text>
                    <div>
                        <p v-for="(item, index) in produtos" :index="index++" :key="item.id">
                            <router-link v-bind:to="'/produto/' + item.id"> {{index}}. {{ item.nome }} [ {{item.descricao}} ] </router-link>
                        </p>
                    </div>    
        
                </b-tab>
                <b-tab title="Participantes">
                    <b-card-text>Total: {{numParticipantes}}</b-card-text>
                        <p v-for="(item, index) in evento.participantes" :index="index++" :key="item.id">
                            {{index}}. {{item.nome}}
                        </p>
                        <div v-show="!usuarioParticipante">
                            <b-button v-model="evento" @click="adicionaParticipante(evento)">Participar</b-button>
                        </div>

                        <div v-show="usuarioParticipante">
                            <b-button v-model="evento" @click="removeParticipante(evento)">Sair</b-button>
                        </div> 
                </b-tab>
                <b-tab v-if="mostraFormularioUpload" title="Editar">
                    <form v-if="mostraFormularioUpload" enctype="multipart/form-data" @submit="onUpload"> 
                        <div class="d-inline-block w-50">
                        <!-- <input type="file" @change="onFileSelected" /> -->   
                        <b-form-file placeholder="Selecione um arquivo..." accept="image/png" @change="onFileSelected"></b-form-file>
                        <b-button type="submit">Upload</b-button>
                        </div>
                    </form>
                </b-tab>
            </b-tabs>
        </b-card>
    </div>
</template>

<script>
import Evento from '../services/eventos'
import Usuario from '../services/usuario'
import Produto from '../services/produtos'
import { URLImagemEvento } from '../services/config'
import Util from "../services/utils"

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
            urlImagem: '',
            selectedFile: null,
            mostraFormularioUpload: false,
            numParticipantes: 0,
            numProdutos: 0,

        }
    },

    mounted() {
        this.getUsuario();
        this.getEvento();
        this.urlImagem = URLImagemEvento + this.$route.params.id
    },

    methods: {
        verificaUsuarioEditor(evento, usuario) {
            if (JSON.stringify(evento.usuario_id) == JSON.stringify(usuario.id)) {
                this.mostraFormularioUpload = true;
            } else {
                this.mostraFormularioUpload = false;
            }
        },

        onFileSelected(event) {
            this.selectedFile = event.target.files[0]
        },

        onUpload() {
            const fd = new FormData();
            fd.append('image', this.selectedFile, this.selectedFile.name)
            Util.uploadImagemEvento(this.evento.id, fd).then(()=>{
                location.reload();
            })
        },

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
                this.verificaUsuarioEditor(this.evento, this.usuario)
                this.numParticipantes = this.evento.participantes.length
            })
        },

        getProdutosEvento() {
            Produto.getProdutosEvento(this.$route.params.id).then((resposta) => {
                this.produtos = resposta.data.data;
                this.numProdutos = this.produtos.length;
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
    .info-evento {    
        max-width: 700px;
        width: 100%;
        margin: auto;
        margin-bottom: 50px !important;
        padding: 20px;
    }

    .img {
        max-width: 300px;
        width: 100%;
        max-height: 300px;
        height: 100%;
        margin: auto;
    }
</style>
