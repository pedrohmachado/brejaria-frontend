<template>
    <div class="eventos">
        

        <h1>Eventos</h1>
        <p>descrição eventos</p>

        <b-button to="/evento/novo">Crie seu evento</b-button>

        <!-- <b-table striped hover :items="eventos" :fields="fields" :sort-by.sync="sortBy" responsive="sm">
            <template slot="acoes" slot-scope="row">
                <div class="acoes">  
                    <b-button size="sm" @click="detalhaEvento(row.item)" v-model="row.evento">Detalhar</b-button>
                    <b-button size="sm" @click="adicionaParticipante(row.item)" v-model="row.evento">Participar</b-button>
                    <b-button size="sm" @click="removeParticipante(row.item)" v-model="row.evento">Sair</b-button>
                </div>
            </template>
        </b-table> -->

        <div class="mt-3">
            <b-card-group columns class="mb-3">
                <b-card v-for="item in eventos" v-bind:key="item.id" img-src="https://picsum.photos/300/300/?image=41">
                    <b-card-title>{{item.nome}}</b-card-title>
                    <b-card-sub-title>{{item.local}}</b-card-sub-title>
                    <b-card-text>
                        {{item.descricao}}
                    </b-card-text>
                    <b-button size="sm" @click="detalhaEvento(item)">Detalhes</b-button> 
                    <div slot="footer"><small class="text-muted">{{item.data_evento}}</small></div>
                </b-card>

            </b-card-group>
        </div>

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
                usuarioParticipante: '',
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

        detalhaEvento(evento) {
            this.$router.push({name: 'EventoDetalhes', params: {id: evento.id}});
        },
    }
}
</script>

<style scoped>

</style>
