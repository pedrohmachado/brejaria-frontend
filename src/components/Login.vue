<template>
  <div class="login">
    <b-form @submit="login" class="form-signin">
      <img class="mb-4" src="../assets/logo.png" alt width="72" height="72">
      <h1 class="h3 mb-3 font-weight-normal">Dados de acesso</h1>
      <label for="inputEmail" class="sr-only">E-mail</label>
      <b-form-input
        type="email"
        id="inputEmail"
        v-model="usuario.email"
        class="form-control"
        placeholder="E-mail"
        required
        autofocus
      />

      <label for="inputPassword" class="sr-only">Senha</label>
      <b-form-input
        type="password"
        id="inputPassword"
        v-model="usuario.senha"
        class="form-control"
        placeholder="Senha"
        required
      />

      <b-button class="btn btn-lg btn-primary btn-block" variant="dark" type="submit">Entrar</b-button>
      <small>
        <router-link to="/cadastro">Registre-se</router-link>
      </small>
    </b-form>
  </div>
</template>

<script>
import Usuario from "../services/usuario";

export default {
  name: "login",
  data() {
    return {
      usuario: {
        email: "",
        senha: "",
        token: ""
      }
    };
  },

  methods: {
    login() {
      Usuario.login(this.usuario).then(resposta => {
        if (resposta.data.status === false) {
          alert("Login inválido");
        } else {
          let token = resposta.data.usuario.token;
          let nome = resposta.data.usuario.nome;
          localStorage.setItem("token", token);
          localStorage.setItem("nome-usuario", nome);
          this.$router.push({ name: "Eu" });
        }
      });
    }
  }
};
</script>

<style scoped>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>

