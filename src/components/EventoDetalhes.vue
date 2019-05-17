<template>
  <div class="evento-detalhes">
    <h1>{{evento.nome}}</h1>

    <b-card bg-variant="dark" text-variant="white" class="info-evento" no-body>
      <b-tabs card>
        <b-tab title="Info" active>
          <b-card-text>Informações sobre {{evento.nome}}</b-card-text>
          <p>Avaliação média:</p>
          <star-rating
            :star-size="25"
            :increment="0.1"
            glow-color="#2c3e50"
            v-bind:show-rating="false"
            read-only
            inline
            v-model="avaliacaoMedia"
          ></star-rating>
          <p></p>
          <b-img class="img" thumbnail fluid v-bind:src="urlImagem"/>
          <b-container style="padding: 20px;">
            <p>Descrição: {{evento.descricao}}</p>
            <p>Local: {{evento.local}}</p>
            <p>Data do evento: {{evento.data_evento}}</p>
            <p>
              <small>Data de criação: {{evento.data_criacao}}</small>
            </p>
            <p>Participantes: {{evento.participantes.length}}</p>
            <p>Produtos: {{numProdutos}}</p>

            <p>Sua avaliação:</p>
            <star-rating
              :star-size="25"
              :increment="0.5"
              glow-color="#2c3e50"
              v-bind:show-rating="false"
              v-model="avaliacaoEvento.avaliacao"
              inline
              @rating-selected="avaliaEvento"
            ></star-rating>
          </b-container>
        </b-tab>
        <b-tab title="Produtos">
          <b-card-text>Total: {{numProdutos}}</b-card-text>
          <div>
            <p v-for="(item, index) in produtos" :index="index++" :key="item.id">
              <router-link
                v-bind:to="'/produto/' + item.id"
              >{{index}}. {{ item.nome }} [ {{item.descricao}} ]</router-link>
            </p>
          </div>
        </b-tab>
        <b-tab title="Participantes">
          <b-card-text>Total: {{evento.participantes.length}}</b-card-text>

          <p
            v-for="(item, index) in evento.participantes"
            :index="index++"
            :key="item.id"
          >{{index}}. {{item.nome}}</p>

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
              <b-form-file
                placeholder="Selecione um arquivo..."
                accept="image/png"
                @change="onFileSelected"
              ></b-form-file>
              <b-button type="submit">Upload</b-button>
            </div>
          </form>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import Evento from "../services/eventos";
import Usuario from "../services/usuario";
import Produto from "../services/produtos";
import { URLImagemEvento } from "../services/config";
import Util from "../services/utils";
import Avaliacao from "../services/avaliacoes";
import StarRating from "vue-star-rating";

export default {
  components: {
    StarRating
  },
  data() {
    return {
      evento: {
        id: "",
        nome: "",
        descricao: "",
        local: "",
        data_evento: "",
        data_criacao: "",
        status: "",
        usuario_id: "",
        participantes: []
      },
      usuario: "",
      usuarioParticipante: "",
      produto: {
        id: "",
        nome: "",
        descricao: "",
        usuario_id: ""
      },
      produtos: [],
      urlImagem: "",
      selectedFile: null,
      mostraFormularioUpload: false,
      numProdutos: 0,
      avaliacaoEvento: {
        avaliacao: 0
      },
      avaliacaoMedia: 0
    };
  },

  mounted() {
    this.getUsuario();
    this.getEvento();
    this.urlImagem = URLImagemEvento + this.$route.params.id;
    this.verificaUsuarioEditor(this.evento, this.usuario);
  },

  methods: {
    avaliaEvento(avaliacao) {
      this.avaliacaoEvento.avaliacao = avaliacao;
      Avaliacao.avaliaEvento(this.evento.id, this.avaliacaoEvento).then(() => {
        this.getAvaliacaoUsuarioEvento(this.evento);
        this.getAvaliacaoMediaEvento(this.evento);
      });
    },

    getAvaliacaoMediaEvento(evento) {
      Avaliacao.getAvaliacaoMediaEvento(evento.id).then(resposta => {
        this.avaliacaoMedia = resposta.data.data.avaliacaoMediaEvento;
      });
    },

    getAvaliacaoUsuarioEvento(evento) {
      Avaliacao.getAvaliacaoUsuarioEvento(evento.id).then(resposta => {
        this.avaliacaoEvento.avaliacao =
          resposta.data.data.avaliacaoEventoUsuario.avaliacao;
      });
    },

    verificaUsuarioEditor(evento, usuario) {
      if (JSON.stringify(evento.usuario_id) == JSON.stringify(usuario.id)) {
        this.mostraFormularioUpload = true;
      } else {
        this.mostraFormularioUpload = false;
      }
    },

    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },

    onUpload() {
      const fd = new FormData();
      fd.append("image", this.selectedFile, this.selectedFile.name);
      Util.uploadImagemEvento(this.evento.id, fd).then(() => {
        location.reload();
      });
    },

    getUsuario() {
      Usuario.getPerfil().then(resposta => {
        this.usuario = resposta.data.data;
        this.verificaUsuarioEditor(this.evento, this.usuario);
      });
    },

    getEvento() {
      Evento.getEvento(this.$route.params.id).then(resposta => {
        this.evento = resposta.data.data;
        this.getProdutosEvento();
        this.getAvaliacaoMediaEvento(this.evento);
        this.getAvaliacaoUsuarioEvento(this.evento);
        this.validaParticipacao(this.evento, this.usuario);
        this.verificaUsuarioEditor(this.evento, this.usuario);
      });
    },

    getProdutosEvento() {
      Produto.getProdutosEvento(this.$route.params.id).then(resposta => {
        this.produtos = resposta.data.data;
        this.numProdutos = this.produtos.length;
      });
    },

    adicionaParticipante(evento) {
      Evento.adicionaParticipante(evento.id).then(() => {
        this.getEvento();
      });
    },

    removeParticipante(evento) {
      Evento.removeParticipante(evento.id).then(() => {
        this.getEvento();
      });
    },

    validaParticipacao(evento, usuario) {
      if (
        JSON.stringify(evento.participantes).includes(JSON.stringify(usuario))
      ) {
        this.usuarioParticipante = true;
      } else if (JSON.stringify(evento.participantes) == JSON.stringify(null)) {
        this.evento.participantes = [];
        this.usuarioParticipante = false;
      } else {
        this.usuarioParticipante = false;
      }
    }
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

.img {
  max-width: 300px;
  width: 100%;
  max-height: 300px;
  height: 100%;
  margin: auto;
}
</style>
