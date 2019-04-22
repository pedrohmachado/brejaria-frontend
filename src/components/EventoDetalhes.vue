<template>
    <div class="evento-detalhes">  
        <p>a</p>
    </div>
</template>

<script>
import Evento from '../services/eventos'


export default {
    data() {
        return{
            evento: ''
        }
    },

    mounted() {

    },

    methods: {
        getEvento() {
            Evento.getEvento(1)
        }
    }
}
</script>

<style scoped>

</style>
