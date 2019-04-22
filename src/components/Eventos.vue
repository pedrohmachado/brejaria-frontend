<template>
    <div class="eventos">
        

        <h1>Eventos</h1>
        <p>descrição eventos</p>

        <b-button to="/evento/novo">Crie seu evento</b-button>

        <b-table striped hover :items="eventos" :fields="fields" :sort-by.sync="sortBy">
            <template slot="acoes" slot-scope="row">
                <div class="acoes">  
                    <b-button @click="detalhaEvento(row.item)" v-model="row.evento">Detalhar</b-button>
                    <b-button  >Excluir</b-button>
                    <b-button  >Alterar</b-button>
                    <b-button @click="adicionaParticipante(row.item)" v-model="row.evento">Participar</b-button>
                    <b-button @click="removeParticipante(row.item)" v-model="row.evento">Sair</b-button>
                </div>
            </template>
        </b-table>







    </div>
</template>

<script>
import Evento from '../services/eventos'

export default {
    props: {
        IDEvento: String
    },
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
        },

        adicionaParticipante(item) {
            Evento.adicionaParticipante(item.id).then((resposta) => {
                alert(JSON.stringify(resposta))
                item = {}
                this.listaEventos()
            })
        },

        removeParticipante(item) {
            Evento.removeParticipante(item.id).then((resposta)=>{
                alert(JSON.stringify(resposta))
                item = {}
                this.listaEventos()
            })
        },

        detalhaEvento(item) {
            this.IDEvento = item.id
            this.$router.push({name: 'EventoDetalhes', params: {id: this.IDEvento}});
        }
    }
}
</script>

<style scoped>

</style>
