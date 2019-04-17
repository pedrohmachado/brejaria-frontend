<template>
    <div class="produtos">
        

        <h1>Produtos</h1>
        <p>descrição produtos</p>

        <b-button to="/produto/novo">Crie seu produto</b-button>

        <b-table striped hover :items="produtos" :fields="fields" :sort-by.sync="sortBy">
            <template slot="acoes" slot-scope="row">
                <div class="acoes">
                    <b-button @click="excluiProduto(row.item, row.index)" v-model="row.produto">Excluir</b-button>
                    <b-button @click="alteraProduto(row.item, row.index)" v-model="row.produto">Alterar</b-button>
                </div>
            </template>
        </b-table>

    </div>
</template>

<script>
import Produto from '../services/produtos'

export default {
    data() {
        return {
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
            ]
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
    }
}
</script>

<style scoped>

</style>
