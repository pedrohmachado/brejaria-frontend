<template>
    <div class="perfil">      

          <h1>Meus produtos</h1>  
          <div class="container"> 
            <b-table striped hover fixed style="vertical-align: middle;" :items="produtos" :fields="fields" :sort-by.sync="sortBy">
              <template slot="acoes" slot-scope="row">
                  <div class="acoes">
                      <b-button size="sm" block @click="excluiProduto(row.item, row.index)" v-model="row.produto">Excluir</b-button>
                      <b-button size="sm" block @click="alteraProduto(row.item, row.index)" v-model="row.produto">Alterar</b-button>
                      <b-button size="sm" block @click="detalhaProduto(row.item)" v-model="row.produto">Detalhar</b-button>
                  </div>
              </template>
            </b-table>
          </div>

          <h1>Meus eventos</h1>  
          <div class="container"> 
            <b-table striped hover fixed style="vertical-align: middle;" :items="eventos" :fields="fields" :sort-by.sync="sortBy">
              <template slot="acoes" slot-scope="row">
                  <div class="acoes">
                      <b-button size="sm" block @click="excluiEventos(row.item, row.index)" v-model="row.produto">Excluir</b-button>
                      <b-button size="sm" block @click="alteraEventos(row.item, row.index)" v-model="row.produto">Alterar</b-button>
                      <b-button size="sm" block @click="detalhaEventos(row.item)" v-model="row.produto">Detalhar</b-button>
                  </div>
              </template>
            </b-table>
          </div>
          
          <h1>Meus dados</h1>
          <div class="form-cadastro">
            <b-form @submit="altera" @reset="limpa">
                  <b-form-group>
                      
                      <b-input-group size="md" prepend="Nome">
                          <b-input v-model="usuario.nome" required size="md" type="text" placeholder="Digite seu nome completo"/>
                      </b-input-group>
                  </b-form-group>
                  <b-form-group label-for="emailInput" description="Seu e-mail não será compartilhado com ninguém.">
                      
                      <b-input-group id="emailInput" size="md" prepend="E-mail">
                          <b-input v-model="usuario.email" required size="md" type="email" placeholder="exemplo@brejaria.com"/>
                      </b-input-group>
                  </b-form-group>
                  <b-form-group>
                      
                      <b-input-group size="md" prepend="Senha">
                          <b-input v-model="usuario.senha" required size="md" type="password" placeholder="Senha com mais de 6 caracteres"/>
                      </b-input-group>
                  </b-form-group>

                  <b-form-group id="interessesGroup" label="Interesses:">
                      <b-form-checkbox-group stacked switches v-model="usuario.perfil" id="interessesCheck">
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
import Usuario from '../services/usuario';
import Produtos from '../services/produtos';
import Eventos from '../services/eventos'

export default {
    name: 'perfil',
    data(){
        return{
            usuario: {
                id: '',
                nome: '',
                email: '',
                senha: '',
                token: '',
                perfil: [],
            },
            evento: {
              id: '',
              nome: '',
              descricao: '',
            },
            sortBy: 'id',
            produto: {
                id: '',
                nome: '',
                descricao: '',
                usuario_id: '',
            },
            produtos: [],
            fields: [{key: 'id', sortable: true},
                'nome',
                'descricao',
                'usuario_id',
                'acoes'
            ],
            eventos: [],
            show: true,
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
                this.usuario.perfil = []
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

        altera() {
          Usuario.altera(this.usuario).then((resposta)=>{
            this.usuario = resposta.data.data;
            this.getPerfil();
            this.getMeusProdutos();
            this.getMeusEventos();
          })
        },

        limpa(){
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
        }, 

        detalhaProduto(produto) {
            this.$router.push({name: 'ProdutoDetalhes', params: {id: produto.id}});
        },

    }
}
</script>

<style>
.form-cadastro{
        width: 100%;
        max-width: 600px;
        padding: 15px;
        margin: auto;
}

.container{
    width: 100%;
    max-width: 600px;
    padding: 15px;
    margin: auto;
}
</style>


