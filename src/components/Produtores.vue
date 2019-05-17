<template>
  <div class="produtores">
    <div class="infoCards">
      <h1>Produtores</h1>

      <div class="mt-3">
        <b-card-group columns class="mb-3">
          <b-card v-for="item in usuarios" v-bind:key="item.id" img-fluid img-top>
            <b-card-title>{{item.nome}}</b-card-title>
            <b-card-sub-title></b-card-sub-title>
            <b-card-text>{{item.perfil}}</b-card-text>
            <b-button size="sm" @click="detalhaProdutor(item)">Detalhes</b-button>
            <div slot="footer">
              <small class="text-muted">{{item.id}}</small>
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
        perfil: ""
      }
    };
  },
  mounted() {
    this.getProdutores();
  },
  methods: {
    getProdutores() {
      Usuario.getProdutores().then(resposta => {
        this.usuarios = resposta.data.data.usuarios;
      });
    },

    detalhaProdutor(usuario) {
      this.$router.push({
        name: "ProdutorDetalhes",
        params: { id: usuario.id }
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
