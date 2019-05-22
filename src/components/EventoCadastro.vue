<template>
  <div class="evento-cadastro">
    <h1>Informe os dados do seu evento</h1>
    <div class="form-cadastro">
      <b-form @submit="cadastra" v-if="show" @reset="limpa">
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
            <b-input v-model="evento.local" required size="md" type="text" placeholder="Local"></b-input>
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
  </div>
</template>

<script>
import Evento from "../services/eventos";

export default {
  name: "EventoCadastro",
  data() {
    return {
      evento: {
        nome: "",
        descricao: "",
        local: "",
        data_evento: ""
      },
      hora: "",
      data: "",
      show: true
    };
  },
  methods: {
    cadastra() {
      this.evento.data_evento = this.data + " " + this.hora;
      //alert(JSON.stringify(this.evento));
      Evento.cadastraEvento(this.evento).then(() => {
        //alert(JSON.stringify(resposta));
        this.evento = {};
        //alert("Salvo com sucesso");
        this.$router.push({ path: "/eventos" });
      });
    },
    limpa(evt) {
      evt.preventDefault();
      /* limpa todos os campos */
      this.evento.descricao = "";
      this.evento.nome = "";
      this.evento.local = "";
      this.evento.data_evento = "";
      this.data = "";
      this.hora = "";
      /* limpa validações do navegador referente aos campos */
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>

<style scoped>
.form-cadastro {
  width: 100%;
  max-width: 600px;
  padding: 15px;
  margin: auto;
}
/* .form-register {
    width: 100%;
    max-width: 400px;
    padding: 15px;
    margin: auto;
  }
  .form-register .checkbox {
    font-weight: 400;
  }
  .form-register .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
  }
  .form-register .form-control:focus {
  z-index: 2;
  }
  .butao {
    width: 100%;
    margin: auto;
  } */
</style>
