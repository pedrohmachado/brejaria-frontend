<template>
    <div class="cadastro">
        <h1>Informe seus dados</h1>
        <div class="form-cadastro">
            <b-form @submit="cadastra" @reset="limpa">
                <b-form-group>
                    
                    <b-input-group size="md" prepend="Nome">
                        <b-input required size="md" type="text" placeholder="Digite seu nome completo"></b-input>
                    </b-input-group>
                </b-form-group>
                <b-form-group label-for="emailInput" description="Seu e-mail não será compartilhado com ninguém.">
                    
                    <b-input-group id="emailInput" size="md" prepend="E-mail">
                        <b-input required size="md" type="email" placeholder="exemplo@brejaria.com"></b-input>
                    </b-input-group>
                </b-form-group>
                <b-form-group>
                    
                    <b-input-group size="md" prepend="Senha">
                        <b-input required size="md" type="password" placeholder="Senha com mais de 6 caracteres"></b-input>
                    </b-input-group>
                </b-form-group>

                
                    <b-btn-group>
                        <b-button variant="success" type="submit">Enviar</b-button>
                        <b-button variant="info" type="reset">Limpar</b-button>
                    </b-btn-group>
                

            </b-form>


                <!-- <b-form-group
                    id="emailGroup"
                    label="E-mail:"
                    label-for="emailInput"
                    description="Seu e-mail não será compartilhado com ninguém."
                >
                    <b-form-input
                        id="emailInput"
                        type="email"
                        v-model="usuario.email"
                        required
                        placeholder="exemplo@brejaria.com"
                        />
                </b-form-group>

                <b-form-group id="nomeGroup" label="Nome:" label-for="nomeInput">
                    <b-form-input
                        id="nomeInput"
                        type="text"
                        v-model="usuario.nome"
                        required
                        placeholder="Digite seu nome" />
                </b-form-group>

                <b-form-group id="senhaGroup" label="Senha:" label-for="senha">
                    <b-form-input
                        id="senha"
                        type="password"
                        v-model="usuario.senha"
                        required
                        placeholder="Digite sua senha" />
                </b-form-group>

                <b-form-group id="interessesGroup" label="Interesses:">
                    <b-form-checkbox-group v-model="usuario.perfil" id="interessesCheck">
                        <b-form-checkbox value="1">Anunciar</b-form-checkbox>
                        <b-form-checkbox value="2">Consumir</b-form-checkbox>
                    </b-form-checkbox-group>
                </b-form-group>


                <b-button class="btn btn-md btn-primary btn-block" type="submit" variant="dark">Enviar</b-button>
                <b-button class="btn btn-md btn-primary btn-block" type="reset" variant="danger">Limpar</b-button> -->
 
                
        </div>
    </div>
</template>

<script>

import Usuario from "../services/usuario";

export default {
    data() {
      return {
        usuario: {
          email: '',
          nome: '',
          perfil: [],
          senha: '',
        },
        show: true
      }
    },
    methods: {
        cadastra() {
            if((this.usuario.perfil).length >= 1) { 
                Usuario.cadastra(this.usuario).then((resposta =>{ 
                    if(resposta.data.status===false){
                        alert("Cadastro inválido")
                    } else {
                        alert(JSON.stringify(resposta))
                        let token = resposta.data.usuario.token;    
                        let nome = resposta.data.usuario.nome;
                        localStorage.setItem('token', token);
                        localStorage.setItem('nome-usuario', nome);
                        alert(localStorage.getItem('token'));
                        this.$router.push({name: 'Eu'});
                    } 
                })
            )} else {
                alert("Selecionar ao menos uma opção de Interesses")
            }
        },

        limpa() {
            /* limpa todos os campos */
            this.usuario.email = ''
            this.usuario.nome = ''
            this.usuario.senha = ''
            this.usuario.perfil = []
            /* limpa validações do navegador referente aos campos */
            this.show = false
            this.$nextTick(() => {
                this.show = true
            })
        }
    }
}
</script>

<style scoped>
    .form-cadastro{
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