<template>
    <div class="eventos">
        

        <h1>Eventos</h1>
        <p>descrição eventos</p>

        <b-button to="/evento/novo">Crie seu evento</b-button>

        <b-table striped hover :items="eventos" :fields="fields" :sort-by.sync="sortBy">
            <template slot="acoes" slot-scope="row">
                <div class="acoes">  
                    <b-button  >Excluir</b-button>
                    <b-button  >Alterar</b-button>
                    <b-button @click="adicionaParticipante(row.item, row.index)" v-model="row.evento">Participar</b-button>
                    <b-button @click="removeParticipante(row.item, row.index)" v-model="row.evento">Sair</b-button>
                </div>
            </template>
        </b-table>







    </div>
</template>

<script>
import Evento from '../services/eventos'

export default {
    data() {
        return {
            sortBy: 'id',
            evento: {
                id: '',
                nome: '',
                descricao: '',
                local: '',
                data_evento: '',
                data_criacao: '',
                status: '',
                usuario_id: '',
                participantes: [],
            },
            eventos: [],
            fields: [{key: 'id', sortable: true},
                'nome',
                'descricao',
                'local',
                'data_evento',
                'data_criacao',
                'status',
                'usuario_id',
                'participantes',
                'acoes'
            ]
        }
    },

    mounted() {
        this.listaEventos()
    },

    methods: {
        listaEventos() {
            Evento.getEventos().then((resposta) => {
                this.eventos = resposta.data.data
            })
        }
    }
}
</script>

<style scoped>

</style>
