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
          <p>
            <small>{{numAvaliacao}}</small>
          </p>
          <p></p>
          <b-img class="img" thumbnail fluid v-bind:src="urlImagem" alt="noimg"/>
          <b-container style="padding: 20px;">
            <p>Descrição: {{evento.descricao}}</p>
            <p>Local: {{evento.local}}</p>
            <p>Data do evento: {{evento.data_evento}}</p>

            <p>
              <small>Data de criação: {{evento.data_criacao}}</small>
              <br>
              <small>Criador do evento: {{nomeCriador}}</small>
            </p>

            <p>Participantes: {{evento.participantes.length}}</p>
            <p>Produtos: {{produtos.length}}</p>

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
          <b-card-text>Total: {{produtos.length}}</b-card-text>
          <p></p>

          <v-dialog data-app v-model="dialog" scrollable max-width="300px">
            <template v-slot:activator="{ on }">
              <b-btn
                v-on="on"
                @click="getProdutosUsuarioSelecionado(produtos, produtosUsuario);"
              >Seus produtos</b-btn>
            </template>
            <v-card>
              <v-card-title>Selecione os produtos</v-card-title>
              <v-divider></v-divider>
              <v-card-text style="height: 300px;">
                PRODUTOS SELECIONADOS {{produtosUsuarioSelecionados}}
                PRODUTOS NAO SELECIONADOS {{produtosUsuarioNaoSelecionados}}
                <v-checkbox
                  v-model="produtosUsuarioSelecionados"
                  v-for="produto in produtosUsuario"
                  :key="produto.id"
                  :label="produto.nome"
                  :value="produto"
                  @change="getProdutosUsuarioNaoSelecionados(produtosUsuario, produtosUsuarioSelecionados)"
                ></v-checkbox>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <b-btn-group style="margin: auto;">
                  <b-button
                    variant="success"
                    @click="dialog = false; manipulaProdutoEvento()"
                  >Salvar</b-button>
                  <b-button variant="info" @click="dialog = false;">Fechar</b-button>
                </b-btn-group>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <p></p>
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
            <div>
              <!-- <input type="file" @change="onFileSelected" /> -->
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
                    v-model="evento.nome"
                    required
                    size="md"
                    type="text"
                    placeholder="Digite o nome do seu evento"
                  ></b-input>
                </b-input-group>
              </b-form-group>
              <b-form-group>
                <b-input-group size="md" prepend="Descrição">
                  <b-form-textarea
                    v-model="evento.descricao"
                    required
                    size="md"
                    type="email"
                    placeholder="Faça as pessoas se interessarem pelo seu evento"
                  ></b-form-textarea>
                </b-input-group>
              </b-form-group>
              <b-form-group>
                <b-input-group size="md" prepend="Local">
                  <b-input
                    v-model="evento.local"
                    required
                    size="md"
                    type="text"
                    placeholder="Local"
                  ></b-input>
                </b-input-group>
              </b-form-group>

              <b-form-group>
                <div class="d-inline-block w-50">
                  <b-input-group size="md" prepend="Data">
                    <b-input v-model="data" required size="md" type="date"></b-input>
                  </b-input-group>
                </div>
                <div class="d-inline-block w-50">
                  <b-input-group size="md" prepend="Hora">
                    <b-input v-model="hora" required size="md" type="time"></b-input>
                  </b-input-group>
                </div>
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
      dialogm1: "",
      dialog: false,
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
      urlImagem: "",
      selectedFile: null,
      mostraFormularioUpload: false,
      numProdutos: 0,
      avaliacaoEvento: {
        avaliacao: 0
      },
      avaliacaoMedia: 0,
      numAvaliacao: 0,
      show: true,
      produtosUsuario: [],
      produtosUsuarioSelecionados: [],
      produtosUsuarioNaoSelecionados: [],
      produtos: [],
      nomeCriador: ""
    };
  },

  mounted() {
    this.getUsuario();
    this.getEvento();
    this.urlImagem = URLImagemEvento + this.$route.params.id;
    this.verificaUsuarioEditor(this.evento, this.usuario);
  },

  methods: {
    manipulaProdutoEvento() {
      if (this.produtosUsuarioNaoSelecionados.length > 0) {
        Evento.removeProdutoEvento(
          this.produtosUsuarioNaoSelecionados,
          this.evento.id
        ).then(() => {
          // this.produtos = resposta.data.data.produtos;
          this.getProdutosRefEvento();
        });
      }

      if (this.produtosUsuarioSelecionados.length > 0) {
        Evento.adicionaProdutoEvento(
          this.produtosUsuarioSelecionados,
          this.evento.id
        ).then(() => {
          // this.produtos = resposta.data.data.produtos;
          this.getProdutosRefEvento();
        });
      }
    },

    getProdutosRefEvento() {
      Produto.getProdutosRefEvento(this.evento.id).then(resposta => {
        this.produtos = resposta.data.data.produtos;
        this.getProdutosUsuario();
      });
    },

    getCriadorEvento(){
      Evento.getCriadorEvento(this.$route.params.id).then(resposta=>{
        this.nomeCriador = resposta.data.data.criador.nome
      })
    },

    getProdutosUsuario() {
      Produto.getMeusProdutos().then(resposta => {
        this.produtosUsuario = resposta.data.data;
      });
    },

    getProdutosUsuarioSelecionado(produtos, produtosUsuario) {
      this.produtosUsuarioSelecionados = [];
      produtos.forEach(produto => {
        produtosUsuario.forEach(produtoUsuario => {
          if (JSON.stringify(produto.id) == JSON.stringify(produtoUsuario.id)) {
            if (!this.produtosUsuarioSelecionados.includes(produtoUsuario)) {
              this.produtosUsuarioSelecionados.push(produtoUsuario);
            }
          }
        });
      });
      this.getProdutosUsuarioNaoSelecionados(
        produtosUsuario,
        this.produtosUsuarioSelecionados
      );
    },

    getProdutosUsuarioNaoSelecionados(produtosUsuario, produtosSelecionados) {
      this.produtosUsuarioNaoSelecionados = [];
      produtosUsuario.forEach(produtoUsuario => {
        if (!produtosSelecionados.includes(produtoUsuario)) {
          this.produtosUsuarioNaoSelecionados.push(produtoUsuario);
        }
      });
    },

    altera() {
      Evento.alteraEvento(this.evento).then(() => {});
    },

    limpa() {},
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
        this.numAvaliacao = resposta.data.data.numAvaliacoes;
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
        this.getAvaliacaoMediaEvento(this.evento);
        this.getAvaliacaoUsuarioEvento(this.evento);
        this.validaParticipacao(this.evento, this.usuario);
        this.verificaUsuarioEditor(this.evento, this.usuario);
        this.setDataHora(this.evento);
        this.getProdutosRefEvento();
        this.getCriadorEvento();
      });
    },

    getProdutosEvento() {
      Produto.getProdutosEvento(this.$route.params.id).then(resposta => {
        this.produtos = resposta.data.data;
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
    },

    setDataHora(evento) {
      var DataHora = evento.data_evento;
      var DataHoraSplitted = DataHora.split(" ");
      this.data = DataHoraSplitted[0];
      this.hora = DataHoraSplitted[1];
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
