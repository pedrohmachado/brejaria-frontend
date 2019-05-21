<template>
  <div class="produtos">
    <div class="infoCards">
      <h1>Produtos</h1>
      <p>descrição produtos</p>

      <b-button v-show="show" to="/produto/novo">Crie seu produto</b-button>
      <p></p>

      <b-form>
        <b-input-group size="lg" prepend="Busca">
          <b-form-input v-model="busca" placeholder="Faça um consulta pelo nome do produto"></b-form-input>
          <b-input-group-append>
            <b-button @click="filtra()">
              <v-icon>mdi-magnify</v-icon>
            </b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form>

      <div class="mt-3">
        <b-card-group columns class="mb-3">
          <b-card
            v-for="item in produtosFiltrados"
            v-bind:key="item.id"
            :img-src="getImagem(item)"
            img-fluid
            img-top
          >
            <b-card-title>{{item.nome}}</b-card-title>
            <b-card-text>{{item.descricao}}</b-card-text>
            <b-button size="sm" @click="detalhaProduto(item)">Detalhes</b-button>
            <div slot="footer">
              <small class="text-muted">{{getNomeProdutor(item)}}</small>
            </div>
          </b-card>
        </b-card-group>
      </div>
    </div>
  </div>
</template>

<script>
import Produto from "../services/produtos";
import { URLImagemProduto } from "../services/config";
import Usuario from "../services/usuario";

export default {
  data() {
    return {
      sortBy: "id",
      produto: {
        id: "",
        nome: "",
        descricao: "",
        usuario_id: "",
        urlImagem: "",
        nome_produtor: ""
      },
      produtos: [],
      produtores: [],
      produtosFiltrados: [],
      produtor: {
        id: "",
        nome: ""
      },
      fields: [
        { key: "id", sortable: true },
        "nome",
        "descricao",
        "usuario_id",
        "acoes"
      ],
      busca: "",
      show: false,
      usuario: {
        id: "",
        nome: "",
        perfil: ""
      }
    };
  },

  mounted() {
    this.getProdutos();
  },

  methods: {
    getUsuario() {
      Usuario.getPerfil().then(resposta => {
        this.usuario = resposta.data.data;
        this.mostra(this.usuario);
      });
    },

    getProdutores() {
      Usuario.getProdutores().then(resposta => {
        this.produtores = resposta.data.data.usuarios;
      });
    },

    getProdutos() {
      Produto.getProdutos().then(resposta => {
        this.produtos = resposta.data.data;
        this.produtosFiltrados = this.produtos;
        this.getProdutores();
        this.getUsuario();
      });
    },

    mostra(usuario) {
      if (JSON.stringify(usuario.perfil) == JSON.stringify("consumidor")) {
        this.show = false;
      } else {
        this.show = true;
      }
    },

    getNomeProdutor(produto) {
      this.produtores.forEach(produtor => {
        if (produtor.id == produto.usuario_id) {
          produto.nome_produtor = produtor.nome;
        }
      });
      return produto.nome_produtor;
    },

    detalhaProduto(produto) {
      this.$router.push({
        name: "ProdutoDetalhes",
        params: { id: produto.id }
      });
    },

    getImagem(produto) {
      return (produto.urlImagem = URLImagemProduto + produto.id);
    },

    filtra() {
      this.produtosFiltrados = [];
      this.produtos.forEach(produto => {
        if (produto.nome.toLowerCase().indexOf(this.busca.toLowerCase()) > -1) {
          this.produtosFiltrados.push(produto);
        }
      });
    }
  }
};
</script>

<style scoped>
.infoCards {
  width: 100%;
  margin: auto;
  padding: 20px;
}
</style>
