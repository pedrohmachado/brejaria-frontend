<template>
    <div class="perfil">
        <b-form class="form-signin">
          <p>meus dados {{usuario}}</p>
            
          <p>meus produtos {{produtos}}</p>

          <p>meus eventos {{eventos}}</p>

          <b-button class="btn btn-lg btn-primary btn-block" variant="dark" v-on:click="getPerfil">Salvar</b-button>
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
                token: ''
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
        }


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


