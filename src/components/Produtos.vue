<template>
    <div class="produtos">
        

        <h1>Produtos</h1>
        <p>descrição produtos</p>

        <b-button to="/produto/novo">Crie seu produto</b-button>

        <!-- <b-table striped hover fixed style="vertical-align: middle;" :items="produtos" :fields="fields" :sort-by.sync="sortBy">
            <template slot="acoes" slot-scope="row">
                <div class="acoes">
                    <b-button @click="excluiProduto(row.item, row.index)" v-model="row.produto">Excluir</b-button>
                    <b-button @click="alteraProduto(row.item, row.index)" v-model="row.produto">Alterar</b-button>
                    <b-button @click="detalhaProduto(row.item)" v-model="row.produto">Detalhar</b-button>
                </div>
            </template>
        </b-table> -->


        <div class="mt-3">
            <b-card-group columns class="mb-3">
                <b-card v-for="item in produtos" v-bind:key="item.id" :img-src="getImagem(item)" img-fluid img-top>
                    <b-card-title>{{item.nome}}</b-card-title>
                    <b-card-text>
                        {{item.descricao}}
                    </b-card-text>
                    <b-button size="sm" @click="detalhaProduto(item)">Detalhes</b-button> 
                    <div slot="footer"><small class="text-muted">{{item.usuario_id}}</small></div>
                </b-card>

            </b-card-group>
        </div>

    </div>
</template>

<script>
import Produto from '../services/produtos'
import { URLImagem } from '../services/config'

export default {
    data() {
        return {
            sortBy: 'id',
            produto: {
                id: '',
                nome: '',
                descricao: '',
                usuario_id: '',
                urlImagem: '',
            },
            produtos: [],
            fields: [{key: 'id', sortable: true},
                'nome',
                'descricao',
                'usuario_id',
                'acoes'
            ],
            
        }
    },

    mounted() {
        this.getProdutos()
    },

    methods: {
        getProdutos() {
            Produto.getProdutos().then((resposta) => {
                this.produtos = resposta.data.data
            })
        },

        detalhaProduto(produto) {
            this.$router.push({name: 'ProdutoDetalhes', params: {id: produto.id}});
        },

        getImagem(produto) {
            return produto.urlImagem = URLImagem + produto.id
        },
    }
}
</script>

<style scoped>

</style>
