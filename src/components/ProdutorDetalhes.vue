<template>
  <div class="produtor-detalhes">
      <h3></h3>
     <h1>{{usuario.nome}}</h1>

    <b-card bg-variant="dark" text-variant="white" class="info-evento" no-body>
      <b-tabs card>
        <b-tab title="Info" active>
          <b-card-text>Informações sobre {{usuario.nome}}</b-card-text>
          <p></p>
          <!-- <b-img class="img" thumbnail fluid v-bind:src="urlImagem"/> -->
          <b-container style="padding: 20px;">
            <p>Perfil: {{usuario.perfil}}</p>
            <p>Eventos: {{eventos.length}}</p>
            <p>Produtos: {{produtos.length}}</p>
          </b-container>
        </b-tab>
        <b-tab title="Produtos">
          <!-- <b-card-text>Total: {{numProdutos}}</b-card-text>-->
          <div>
            <p v-for="(item, index) in produtos" :index="index++" :key="item.id">
              <router-link
                v-bind:to="'/produto/' + item.id"
              >{{index}}. {{ item.nome }} [ {{item.descricao}} ]</router-link>
            </p>
         </div>
        </b-tab>
        <b-tab title="Eventos">
          <!-- <b-card-text>Total: {{numProdutos}}</b-card-text>-->
          <div>
            <p v-for="(item, index) in eventos" :index="index++" :key="item.id">
              <router-link
                v-bind:to="'/evento/' + item.id"
              >{{index}}. {{ item.nome }} [ {{item.descricao}} ]</router-link>
            </p>
         </div>
        </b-tab>
        <!--
        <b-tab title="Participantes">
          <b-card-text>Total: {{evento.participantes.length}}</b-card-text>

          <p
            v-for="(item, index) in evento.participantes"
            :index="index++"
            :key="item.id"
          >{{index}}. {{item.nome}}</p> -->

          <!-- <div v-show="!usuarioParticipante">
            <b-button v-model="evento" @click="adicionaParticipante(evento)">Participar</b-button>
          </div>

          <div v-show="usuarioParticipante">
            <b-button v-model="evento" @click="removeParticipante(evento)">Sair</b-button>
          </div> 
        </b-tab>
         <b-tab v-if="mostraFormularioUpload" title="Editar">
          <form v-if="mostraFormularioUpload" enctype="multipart/form-data" @submit="onUpload">
            <div class="d-inline-block w-50">
              <input type="file" @change="onFileSelected" />
              <b-form-file
                placeholder="Selecione um arquivo..."
                accept="image/png"
                @change="onFileSelected"
              ></b-form-file>
              <b-button type="submit">Upload</b-button>
            </div>
          </form>
        </b-tab> -->
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import Usuario from '../services/usuario'
import Produto from '../services/produtos'
import Evento from '../services/eventos'

export default {
   data() {
       return {
           usuario: {
               id: '',
               nome: '',
               perfil: '',
           },
           produtos: [],
           produto: {
               id: '',
               nome: '',
               descricao: '',
           },
           eventos: [],
           evento: {
               id: '',
               nome: '',
               descricao: '',
           },
       };
   }, 
   methods: {
       getProdutor() {
           Usuario.getProdutor(this.$route.params.id).then(resposta => {
                this.usuario = resposta.data.data.usuario
                this.getProdutos(this.usuario)
                this.getEventos(this.usuario)
           })
       },

       getProdutos(usuario) {
           Produto.getProdutosProdutor(usuario.id).then(resposta => {
               this.produtos = resposta.data.data.produtos
           })
       },

       getEventos(usuario) {
           Evento.getEventosProdutor(usuario.id).then(resposta=>{
               this.eventos = resposta.data.data.eventos
           })
       },
   },
   mounted() {
       this.getProdutor()
   }

};
</script>

<style scoped>
.info-evento {
  max-width: 700px;
  width: 100%;
  margin: auto;
  margin-bottom: 50px !important;
  padding: 20px;
}
</style>
