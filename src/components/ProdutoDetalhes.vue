<template>
    <div class="produto-detalhes">

        <h1>
            {{produto.nome}}
        </h1>

        <b-card bg-variant="dark" text-variant="white" class="info-evento" no-body>
            <b-tabs card>
                <b-tab title="Info" active>
                    <b-card-text>Informações sobre {{produto.nome}}</b-card-text>
                    <b-img class="img" thumbnail fluid v-bind:src="urlImagem"/>
                    <b-container style="padding: 20px;">
                        <p>Descrição: {{produto.descricao}}</p>
                        <p>Ranking: </p>
                    </b-container>
                </b-tab>
                <b-tab title="Eventos relacionados">
                    <b-card-text>Total: {{numEventos}}</b-card-text>
                    <div>
                        <p v-for="(item, index) in eventos" :index="index++" :key="item.id">
                            <router-link v-bind:to="'/evento/' + item.id"> {{index}}. {{ item.nome }} [ {{item.descricao}} ] </router-link>
                        </p>
                    </div>
        
                </b-tab>
                
                <b-tab v-if="mostraFormularioUpload" title="Editar">
                    <form v-if="mostraFormularioUpload" enctype="multipart/form-data" @submit="onUpload"> 
                        <div class="d-inline-block w-50">
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
import Produto from '../services/produtos'
import { URLImagemProduto } from '../services/config'
import Util from "../services/utils"
import Usuario from '../services/usuario'
import Evento from '../services/eventos'


export default {
    data() {
      return {
          produto: {
              id: '',
              nome: '',
              descricao: '',
              usuario_id: '',
          },
          usuario: {
              id: '',
          },
          evento: {
              id: '',
              nome: '',
              descricao: '',
          },
          urlImagem: '',
          selectedFile: null,
          mostraFormularioUpload: false,
          eventos:[],
          numEventos: 0,

      }
    }, 
    
    mounted() {
        this.getProduto(),
        this.getUsuario(),
        this.getEventosProduto(),
        this.urlImagem = URLImagemProduto + this.$route.params.id
    },

    methods: {
         getUsuario() {
            Usuario.getPerfil().then((resposta) => {
                this.usuario = resposta.data.data;
                this.verificaUsuario(this.produto, this.usuario);
            })
        },

        getEventosProduto() {
            Evento.getEventosProduto(this.$route.params.id).then((resposta)=>{
                this.eventos = resposta.data.data
                this.numEventos = this.eventos.length
            })
        },
        
        verificaUsuario(produto, usuario) {
            if (JSON.stringify(produto.usuario_id) == JSON.stringify(usuario.id)) {
                this.mostraFormularioUpload = true;
            } else {
                this.mostraFormularioUpload = false;
            }
        },

        getProduto() {
             Produto.getProduto(this.$route.params.id).then((resposta) => {
                this.produto = resposta.data.data;
            })
        },

        onFileSelected(event) {
            this.selectedFile = event.target.files[0]
        },

        onUpload() {
            const fd = new FormData();
            fd.append('image', this.selectedFile, this.selectedFile.name)
            Util.uploadImagemProduto(this.produto.id, fd).then(()=>{
                location.reload();
            })
        },
    }
}
</script>

<style scoped>
.info-evento {    
        max-width: 700px;
        width: 100%;
        margin: auto;
        margin-bottom: 200px !important;
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

