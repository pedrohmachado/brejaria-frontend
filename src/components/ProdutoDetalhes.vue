<template>
  <div class="produto-detalhes">
    <h1>{{produto.nome}}</h1>

    <b-card bg-variant="dark" text-variant="white" class="info-evento" no-body>
      <b-tabs card>
        <b-tab title="Info" active>
          <b-card-text>Informações sobre {{produto.nome}}</b-card-text>
          <p>
              Avaliação média:
              <star-rating
                :star-size="25"
                :increment="0.1"
                glow-color="#2c3e50"
                v-bind:show-rating="false"
                read-only
                inline
                v-model="avaliacaoMedia"
              ></star-rating>
            </p>
            <p>
              <small>{{numAvaliacoes}}</small>
            </p>
          <b-img class="img" thumbnail fluid v-bind:src="urlImagem" alt="noimg"/>
          <b-container style="padding: 20px;">
            <p>Descrição: {{produto.descricao}}</p>
            <p>Eventos relacionados: {{numEventos}}</p>
            <p>
              Produtor:
              <router-link v-bind:to="'/produtor/' + produtor.id">{{produtor.nome}}</router-link>
            </p>

            <p>
              Sua avaliação:
              <star-rating
                :star-size="25"
                :increment="0.5"
                glow-color="#2c3e50"
                v-bind:show-rating="false"
                v-model="avaliacaoProduto.avaliacao"
                inline
                @rating-selected="avaliaProduto"
              ></star-rating>
            </p>
          </b-container>
        </b-tab>
        <b-tab title="Eventos relacionados">
          <b-card-text>Total: {{numEventos}}</b-card-text>
          <div>
            <p v-for="(item, index) in eventos" :index="index++" :key="item.id">
              <router-link
                v-bind:to="'/evento/' + item.id"
              >{{index}}. {{ item.nome }} [ {{item.descricao}} ]</router-link>
            </p>
          </div>
        </b-tab>

        <b-tab v-if="mostraFormularioUpload" title="Editar">
          <form v-if="mostraFormularioUpload" enctype="multipart/form-data" @submit="onUpload">
            <div>
              <b-form-file
                placeholder="Selecione um arquivo..."
                accept="image/png"
                @change="onFileSelected"
              ></b-form-file>
              <p></p>
              <b-button type="submit">Upload</b-button>
              <p></p>
            </div>
          </form>
          <div class="form-cadastro">
            <b-form @submit="altera" v-if="show" @reset="limpa">
              <b-form-group>
                <b-input-group size="md" prepend="Nome">
                  <b-input
                    v-model="produto.nome"
                    required
                    size="md"
                    type="text"
                    placeholder="Digite o nome do seu produto"
                  ></b-input>
                </b-input-group>
              </b-form-group>
              <b-form-group>
                <b-input-group size="md" prepend="Descrição">
                  <b-form-textarea
                    v-model="produto.descricao"
                    required
                    size="md"
                    type="email"
                    placeholder="Faça as pessoas se interessarem pelo seu produto"
                  ></b-form-textarea>
                </b-input-group>
              </b-form-group>

              <b-btn-group>
                <b-button variant="success" type="submit">Enviar</b-button>
                <b-button variant="info" type="reset">Limpar</b-button>
              </b-btn-group>
            </b-form>
          </div>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import Produto from "../services/produtos";
import { URLImagemProduto } from "../services/config";
import Util from "../services/utils";
import Usuario from "../services/usuario";
import Evento from "../services/eventos";
import Avaliacao from "../services/avaliacoes";
import StarRating from "vue-star-rating";

export default {
  components: {
    StarRating
  },
  data() {
    return {
      produto: {
        id: "",
        nome: "",
        descricao: "",
        usuario_id: ""
      },
      usuario: {
        id: "",
        nome: "",
        perfil: ""
      },
      evento: {
        id: "",
        nome: "",
        descricao: ""
      },
      urlImagem: "",
      selectedFile: null,
      mostraFormularioUpload: false,
      eventos: [],
      numEventos: 0,
      avaliacaoMedia: 0,
      avaliacaoProduto: {
        avaliacao: 0
      },
      produtor: {
        id: "",
        nome: ""
      },
      show: true,
      numAvaliacoes: 0
    };
  },

  mounted() {
    this.getUsuario(),
      this.getProduto(),
      this.getEventosProduto(),
      (this.urlImagem = URLImagemProduto + this.$route.params.id);
    this.verificaUsuario(this.produto, this.usuario);
  },

  methods: {
    getProdutor(produto) {
      Usuario.getProdutor(produto.usuario_id).then(resposta => {
        this.produtor = resposta.data.data.usuario;
      });
    },

    avaliaProduto(avaliacao) {
      this.avaliacaoProduto.avaliacao = avaliacao;
      Avaliacao.avaliaProduto(this.produto.id, this.avaliacaoProduto).then(
        () => {
          this.getAvaliacaoUsuarioProduto(this.produto);
          this.getAvaliacaoMediaProduto(this.produto);
        }
      );
    },

    getAvaliacaoUsuarioProduto(produto) {
      Avaliacao.getAvaliacaoUsuarioProduto(produto.id).then(resposta => {
        this.avaliacaoProduto.avaliacao =
          resposta.data.data.avaliacaoProdutoUsuario.avaliacao;
      });
    },

    getAvaliacaoMediaProduto(produto) {
      Avaliacao.getAvaliacaoMediaProduto(produto.id).then(resposta => {
        this.avaliacaoMedia = resposta.data.data.avaliacaoMediaProduto;
        this.numAvaliacoes = resposta.data.data.numAvaliacoes;
      });
    },

    getUsuario() {
      Usuario.getPerfil().then(resposta => {
        this.usuario = resposta.data.data;
        // this.getProduto();
        this.verificaUsuario(this.produto, this.usuario);
      });
    },

    getEventosProduto() {
      // Evento.getEventosProduto(this.$route.params.id).then(resposta => {
      //   this.eventos = resposta.data.data;
      //   this.numEventos = this.eventos.length;
      //   this.verificaUsuario(this.produto, this.usuario);
      // });
      Evento.getEventosRefProduto(this.$route.params.id).then(resposta => {
        //alert(JSON.stringify(resposta.data.data.eventos))
        this.eventos = resposta.data.data.eventos;
        this.numEventos = this.eventos.length;
        this.verificaUsuario(this.produto, this.usuario);
      });
    },

    verificaUsuario(produto, usuario) {
      if (JSON.stringify(produto.usuario_id) == JSON.stringify(usuario.id)) {
        this.mostraFormularioUpload = true;
      } else {
        this.mostraFormularioUpload = false;
      }
    },

    getProduto() {
      Produto.getProduto(this.$route.params.id).then(resposta => {
        this.produto = resposta.data.data;
        this.getAvaliacaoMediaProduto(this.produto);
        this.getAvaliacaoUsuarioProduto(this.produto);
        this.getAvaliacaoMediaProduto(this.produto);
        this.getProdutor(this.produto);
        this.verificaUsuario(this.produto, this.usuario);
      });
    },

    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },

    onUpload() {
      const fd = new FormData();
      fd.append("image", this.selectedFile, this.selectedFile.name);
      Util.uploadImagemProduto(this.produto.id, fd).then(() => {
        location.reload();
      });
    },

    altera() {
      Produto.alteraProduto(this.produto).then(() => {});
    },
    limpa() {}
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

