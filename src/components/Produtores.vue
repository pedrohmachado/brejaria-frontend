<template>
  <div class="produtores">
    <div class="infoCards">
      <h1>Produtores</h1>
      <p>descrição produtores</p>

      <b-form>
        <b-input-group size="lg" prepend="Busca">
          <b-form-input v-model="busca" placeholder="Faça um consulta pelo nome do produtor"></b-form-input>
          <b-input-group-append>
            <b-button @click="filtra()">
              <v-icon>mdi-magnify</v-icon>
            </b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form>

      <div class="mt-3">
        <b-card-group columns class="mb-3">
          <b-card v-for="item in usuariosFiltrados" v-bind:key="item.id" v-show="true" img-fluid img-top>
            <b-card-title>{{item.nome}}</b-card-title>
            <b-card-sub-title></b-card-sub-title>
            <b-card-text>{{item.perfil}}</b-card-text>
            <b-button size="sm" @click="detalhaProdutor(item)">Detalhes</b-button>
            <div slot="footer">
              <small class="text-muted">{{item.contato}}</small>
            </div>
          </b-card>
        </b-card-group>
      </div>
    </div>
  </div>
</template>

<script>
import Usuario from "../services/usuario";

export default {
  data() {
    return {
      usuarios: [],
      usuario: {
        id: "",
        nome: "",
        perfil: "",
        contato: ""
      },
      busca: "",
      usuariosFiltrados: []
    };
  },
  mounted() {
    this.getProdutores();
  },
  methods: {
    getProdutores() {
      Usuario.getProdutores().then(resposta => {
        this.usuarios = resposta.data.data.usuarios;
        this.usuariosFiltrados = this.usuarios
      });
    },

    detalhaProdutor(usuario) {
      this.$router.push({
        name: "ProdutorDetalhes",
        params: { id: usuario.id }
      });
    },

    filtra() {
      this.usuariosFiltrados = [];
      this.usuarios.forEach(usuario => {
        if(usuario.nome.toLowerCase().indexOf(this.busca.toLowerCase())>-1){
          this.usuariosFiltrados.push(usuario)
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
