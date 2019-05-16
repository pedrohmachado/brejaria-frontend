<template>
  <div class="eventos">
    <div class="infoCards">
      <h1>Eventos</h1>
      <p>descrição eventos</p>

      <b-button to="/evento/novo">Crie seu evento</b-button>

      <!-- <b-table striped hover :items="eventos" :fields="fields" :sort-by.sync="sortBy" responsive="sm">
            <template slot="acoes" slot-scope="row">
                <div class="acoes">  
                    <b-button size="sm" @click="detalhaEvento(row.item)" v-model="row.evento">Detalhar</b-button>
                    <b-button size="sm" @click="adicionaParticipante(row.item)" v-model="row.evento">Participar</b-button>
                    <b-button size="sm" @click="removeParticipante(row.item)" v-model="row.evento">Sair</b-button>
                </div>
            </template>
      </b-table>-->

      <div class="mt-3">
        <b-card-group columns class="mb-3">
          <b-card
            v-for="item in eventos"
            v-bind:key="item.id"
            :img-src="getImagem(item)"
            img-fluid
            img-top
          >
            <b-card-title>{{item.nome}}</b-card-title>
            <b-card-sub-title>
              <img class="icon" src="../assets/local.png">
              {{item.local}}
            </b-card-sub-title>
            <b-card-text>{{item.descricao}}</b-card-text>
            <b-button size="sm" @click="detalhaEvento(item)">Detalhes</b-button>
            <div slot="footer">
              <small class="text-muted">{{item.data_evento}}</small>
            </div>
          </b-card>
        </b-card-group>
      </div>
    </div>
  </div>
</template>

<script>
import Evento from "../services/eventos";
import { URLImagemEvento } from "../services/config";

export default {
  data() {
    return {
      sortBy: "id",
      evento: {
        id: "",
        nome: "",
        descricao: "",
        local: "",
        data_evento: "",
        data_criacao: "",
        status: "",
        usuario_id: "",
        participantes: [],
        usuarioParticipante: "",
        urlImagem: ""
      },

      eventos: [],
      fields: [
        { key: "id", sortable: true },
        "nome",
        "descricao",
        "local",
        "data_evento",
        "data_criacao",
        "status",
        "usuario_id",
        "participantes",
        "acoes"
      ]
    };
  },

  mounted() {
    this.getEventos();
  },

  methods: {
    getEventos() {
      Evento.getEventos().then(resposta => {
        this.eventos = resposta.data.data;
      });
    },

    detalhaEvento(evento) {
      this.$router.push({ name: "EventoDetalhes", params: { id: evento.id } });
    },

    getImagem(evento) {
      return (evento.urlImagem = URLImagemEvento + evento.id);
    }
  }
};
</script>

<style scoped>
.icon {
  height: 16px;
  width: 16px;
}

.infoCards {
  width: 100%;
  margin: auto;
  padding: 20px;
}
</style>
