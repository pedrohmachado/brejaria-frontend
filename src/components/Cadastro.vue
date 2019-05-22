<template>
  <div class="cadastro">
    <h1>Informe seus dados</h1>

    <div class="form-cadastro">
      <b-alert
        v-model="showPerfilErro"
        variant="danger"
        dismissible
      >Selecione ao menos uma opção de interesse.</b-alert>

      <b-alert
        v-model="showCadastroErro"
        variant="danger"
        dismissible
      >Cadastro inválido. (E-mail já cadastrado).</b-alert>

      <b-form @submit="cadastra" v-if="show" @reset="limpa">
        <b-form-group>
          <b-input-group size="md" prepend="Nome">
            <b-input
              v-model="usuario.nome"
              required
              size="md"
              type="text"
              placeholder="Digite seu nome completo"
            ></b-input>
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
              type="email"
              placeholder="exemplo@brejaria.com"
            ></b-input>
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
        <b-form-group>
          <b-input-group size="md" prepend="Senha">
            <b-input
              v-model="usuario.senha"
              required
              size="md"
              type="password"
              placeholder="Senha com mais de 6 caracteres"
            ></b-input>
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

export default {
  data() {
    return {
      usuario: {
        email: "",
        nome: "",
        perfil: "",
        senha: "",
        contato: ""
      },
      show: true,
      perfil: [],
      showPerfilErro: false,
      showCadastroErro: false
    };
  },
  methods: {
    cadastra() {
      if (this.perfil.length >= 1) {
        this.definePerfil(this.perfil, this.usuario);
        Usuario.cadastra(this.usuario).then(resposta => {
          if (resposta.data.status === false) {
            this.showCadastroErro = true;
          } else {
            let token = resposta.data.usuario.token;
            let nome = resposta.data.usuario.nome;
            localStorage.setItem("token", token);
            localStorage.setItem("nome-usuario", nome);
            this.$router.push({ name: "Eu" });
          }
        });
      } else {
        this.showPerfilErro = true;
      }
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
  .form-signin .form-control:focus {
    z-index: 2;
  } */
</style>