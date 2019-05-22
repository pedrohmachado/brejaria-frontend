<template>
  <div class="perfil">
    <h1>Meus produtos</h1>
    <div class="container">
      <b-table
        head-variant="dark"
        dark
        striped
        hover
        responsive
        small
        v-if="produtos.length > 0"
        :items="produtos"
        :fields="fieldsProduto"
        :sort-by.sync="sortBy"
      >
        <template slot="acoes" slot-scope="row">
          <div class="acoes">
            <b-button-group>
              <b-button
                size="sm"
                variant="warning"
                @click="excluiProduto(row.item, row.index)"
                v-model="row.produto"
              >Excluir</b-button>
              <b-button
                size="sm"
                @click="alteraProduto(row.item, row.index)"
                v-model="row.produto"
              >Alterar</b-button>
              <b-button
                size="sm"
                variant="info"
                @click="detalhaProduto(row.item)"
                v-model="row.produto"
              >Detalhar</b-button>
            </b-button-group>
          </div>
        </template>
      </b-table>
      <p v-else>
        <router-link to="/produtos">{{linkProduto}}</router-link>
      </p>
    </div>

    <h1>Meus eventos</h1>
    <div class="container">
      <b-table
        head-variant="dark"
        dark
        striped
        hover
        responsive
        small
        v-if="eventos.length>0"
        style="vertical-align: middle;"
        :items="eventos"
        :fields="fieldsEvento"
        :sort-by.sync="sortBy"
      >
        <template slot="acoes" slot-scope="row">
          <div class="acoes">
            <b-button-group>
              <b-button
                size="sm"
                variant="warning"
                @click="excluiEventos(row.item, row.index)"
                v-model="row.produto"
              >Excluir</b-button>
              <b-button
                size="sm"
                @click="alteraEventos(row.item, row.index)"
                v-model="row.produto"
              >Alterar</b-button>
              <b-button
                size="sm"
                variant="info"
                @click="detalhaEvento(row.item)"
                v-model="row.produto"
              >Detalhar</b-button>
            </b-button-group>
          </div>
        </template>
      </b-table>
      <p v-else>
        <router-link to="/eventos">{{linkEvento}}</router-link>
      </p>
    </div>

    <h1>Eventos inscritos</h1>
    <div class="container">
      <b-table
        head-variant="dark"
        dark
        striped
        hover
        responsive
        small
        v-if="eventosInscritos.length > 0"
        :items="eventosInscritos"
        :fields="fieldsEvento"
        :sort-by.sync="sortBy"
      >
        <template slot="acoes" slot-scope="row">
          <div class="acoes">
            <b-button-group>
              <b-button
                size="sm"
                variant="warning"
                @click="excluiEventos(row.item, row.index)"
                v-model="row.produto"
              >Excluir</b-button>
              <b-button
                size="sm"
                @click="alteraEventos(row.item, row.index)"
                v-model="row.produto"
              >Alterar</b-button>
              <b-button
                size="sm"
                variant="info"
                @click="detalhaEvento(row.item)"
                v-model="row.produto"
              >Detalhar</b-button>
            </b-button-group>
          </div>
        </template>
      </b-table>
      <p v-else>
        <router-link to="/eventos">{{linkEventoParticipa}}</router-link>
      </p>
    </div>

    <h1>Meus dados</h1>
    <div class="form-cadastro">
      <b-alert v-model="showLoginErro" variant="danger" dismissible>Senha atual não correspondente.</b-alert>
      <b-form @submit="altera" @reset="limpa">
        <b-form-group>
          <b-input-group size="md" prepend="Nome">
            <b-input
              v-model="usuario.nome"
              required
              size="md"
              type="text"
              placeholder="Digite seu nome completo"
            />
          </b-input-group>
        </b-form-group>
        <b-form-group
          label-for="emailInput"
          description="Seu e-mail não será compartilhado com ninguém."
        >
          <b-input-group id="emailInput" size="md" prepend="E-mail">
            <b-input
              v-model="usuario.email"
              required
              size="md"
              disabled
              type="email"
              placeholder="exemplo@brejaria.com"
            />
          </b-input-group>
        </b-form-group>
        <b-form-group label-for="contatoInput" description>
          <b-input-group id="contatoInput" size="md" prepend="Contato">
            <b-input
              v-model="usuario.contato"
              required
              size="md"
              type="text"
              placeholder="(12) 93456-7890, exemplo@contato.com, www.exemplo.com/contato etc..."
            ></b-input>
          </b-input-group>
        </b-form-group>
        <b-form-group label-for="perfilInput" description>
          <b-input-group id="perfilInput" size="md" prepend="Perfil">
            <b-input v-model="usuario.perfil" required size="md" type="text" disabled></b-input>
          </b-input-group>
        </b-form-group>
        <b-form-group
          label-for="senhaInput"
          description="Sua senha será necessária quando alguma alteração for realizada."
        >
          <b-input-group id="senhaInput" size="md" prepend="Senha atual">
            <b-input
              v-model="usuario.senha"
              required
              size="md"
              type="password"
              placeholder="Digite sua senha atual"
            />
          </b-input-group>
        </b-form-group>

        <b-form-group>
          <b-input-group size="md" prepend="Nova senha">
            <b-input
              v-model="novaSenha"
              size="md"
              type="password"
              placeholder="Senha com mais de 6 caracteres"
            />
          </b-input-group>
        </b-form-group>

        <b-form-group id="interessesGroup" label="Interesses:">
          <b-form-checkbox-group stacked switches v-model="perfil" id="interessesCheck">
            <b-form-checkbox value="1">Divulgar seus produtos através de eventos</b-form-checkbox>
            <b-form-checkbox value="2">Participar de eventos e conhecer produtos</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>

        <b-btn-group>
          <b-button variant="success" type="submit">Enviar</b-button>
          <b-button variant="info" type="reset">Limpar</b-button>
        </b-btn-group>
      </b-form>
    </div>
  </div>
</template>

<script>
import Usuario from "../services/usuario";
import Produtos from "../services/produtos";
import Eventos from "../services/eventos";

export default {
  name: "perfil",
  data() {
    return {
      usuario: {
        id: "",
        nome: "",
        email: "",
        senha: "",
        token: "",
        perfil: ""
      },
      perfil: [],
      evento: {
        id: "",
        nome: "",
        descricao: "",
        data_evento: "",
        data_criacao: ""
      },
      sortBy: "data_evento",
      produto: {
        id: "",
        nome: "",
        descricao: "",
        usuario_id: ""
      },
      produtos: [],
      fieldsProduto:
        //[{key: 'id', sortable: true},
        [
          { key: "nome", sortable: true },
          // 'nome',
          "descricao",
          // 'usuario_id',
          "acoes"
        ],

      fieldsEvento:
        //[{key: 'id', sortable: true},
        [
          "nome",
          { key: "data_evento", sortable: true },
          // 'nome',

          //"descricao",
          // 'usuario_id',
          "acoes"
        ],
      eventos: [],
      eventosInscritos: [],
      show: true,
      linkProduto: "",
      linkEvento: "",
      linkEventoParticipa: "",
      novaSenha: "",
      showLoginErro: false,
    };
  },

  mounted() {
    this.getPerfil();
    this.getMeusEventos();
    this.getEventosInscritos();
  },
  methods: {
    getEventosInscritos() {
      Eventos.getEventosInscritos().then(resposta => {
        this.eventosInscritos = resposta.data.data.eventosInscritos;
        if (resposta.data.data.eventosInscritos < 1) {
          this.linkEventoParticipa = "Você não participa de nenhum evento";
        }
      });
    },

    definePerfil(perfil, usuario) {
      if (perfil.length == 2) {
        usuario.perfil = "geral";
        return;
      }

      perfil.forEach(p => {
        if (p == 2) {
          usuario.perfil = "consumidor";
        }
        if (p == 1) {
          usuario.perfil = "produtor";
        }
      });
    },

    recuperaPerfil(usuario) {
      if (usuario.perfil == "consumidor") {
        this.perfil = ["2"];
        return;
      }
      if (usuario.perfil == "geral") {
        this.perfil = ["1", "2"];
        return;
      }
      if (usuario.perfil == "produtor") {
        this.perfil = ["1"];
        return;
      }
    },

    getPerfil() {
      Usuario.getPerfil().then(resposta => {
        this.usuario = resposta.data.data;
        this.recuperaPerfil(this.usuario);
        this.getMeusProdutos(this.usuario);
      });
    },

    getMeusProdutos(usuario) {
      if (usuario.perfil == "consumidor") {
        this.linkProduto = "Você não é produtor";
      } else {
        Produtos.getMeusProdutos().then(resposta => {
          if (resposta.data.data == null) {
            this.linkProduto = "Você não possui nenhum produto";
            return;
          } else {
            this.produtos = resposta.data.data;
            if (this.produtos.length < 1) {
              this.linkProduto = "Você não possui nenhum produto";
              return;
            }
          }
        });
      }
    },

    getMeusEventos() {
      Eventos.getMeusEventos().then(resposta => {
        this.eventos = resposta.data.data;
        if (resposta.data.data.length < 1) {
          this.linkEvento = "Você não criou nenhum evento";
          return;
        }
      });
    },

    altera() {
      if (this.novaSenha == "") {
        this.novaSenha = this.usuario.senha;
      }
      this.definePerfil(this.perfil, this.usuario);
      Usuario.altera(this.usuario, this.novaSenha).then(resposta => {
        if (JSON.stringify(resposta.data.data.status) == JSON.stringify(false)) {
          this.showLoginErro = true;
        } else {
          this.usuario = resposta.data.data;
          this.getPerfil();
          this.getMeusEventos();
        }
      });
    },

    limpa() {
      /* limpa todos os campos */
      this.usuario.email = "";
      this.usuario.nome = "";
      this.usuario.senha = "";
      this.usuario.perfil = [];
      /* limpa validações do navegador referente aos campos */
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },

    detalhaProduto(produto) {
      this.$router.push({
        name: "ProdutoDetalhes",
        params: { id: produto.id }
      });
    },

    detalhaEvento(evento) {
      this.$router.push({ name: "EventoDetalhes", params: { id: evento.id } });
    }
  }
};
</script>

<style>
.form-cadastro {
  width: 100%;
  max-width: 600px;
  padding: 15px;
  margin: auto;
}

.container {
  width: 100%;
  max-width: 800px;
  padding: 15px;
  margin: auto;
}
</style>


