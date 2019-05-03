<template>
    <div class="perfil">
        <b-form class="form-signin">
          <p>meus dados</p> 
          <div>{{usuario}}</div>
            
          <p>meus produtos</p>
          <div v-for="(produto, i) in produtos" :key="i">
            <p> {{produto}}</p>
          </div>

          <p>meus eventos</p>
          <div v-for="(evento, i) in eventos" :key="`A-${i}`">
            <p>{{evento}}</p>
          </div>

        </b-form>
        <b-form @submit="alteraUsuario" @reset="limpaForm">
                <b-form-group
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
                        placeholder="exemplo@brejaria.com" />
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
                <b-button class="btn btn-md btn-primary btn-block" type="reset" variant="danger">Limpar</b-button>
        </b-form>

    </div>

</template>

<script>
import Usuario from '../services/usuario';
import Produtos from '../services/produtos';
import Eventos from '../services/eventos'

export default {
    name: 'perfil',
    data(){
        return{
            usuario: {
                id: '',
                email: '',
                senha: '',
                token: '',
                perfil: ''
            },
            evento: {
              id: '',
              nome: '',
              descricao: '',
            },
            produto: {
              id: '',
              nome: '',
              descricao: '',
            },
            produtos: [],
            eventos: []
        } 
    },
    mounted() {
        this.getPerfil()
        this.getMeusProdutos()
        this.getMeusEventos()
    },
    methods: {
        getPerfil() {
            Usuario.getPerfil().then((resposta) =>{
                this.usuario = resposta.data.data
                //alert(JSON.stringify(this.usuario))
            })
        },

        getMeusProdutos() {
          Produtos.getMeusProdutos().then((resposta) => {
            this.produtos = resposta.data.data
          })
        },

        getMeusEventos() {
          Eventos.getMeusEventos().then((resposta)=>{
            this.eventos = resposta.data.data
          })
        },

        alteraUsuario() {
          Usuario.altera(this.usuario).then((resposta)=>{
            this.usuario = resposta.data.data;
            this.getPerfil();
            this.getMeusProdutos();
            this.getMeusEventos();
          })
        },

        limpaForm(){}

    }
}
</script>

<style>
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
.form-signin input[type="text"] {
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


