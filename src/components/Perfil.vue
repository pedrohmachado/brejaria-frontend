<template>
    <div class="perfil">
        <b-button v-on:click="getPerfil"/>
    </div>

</template>

<script>
import Usuario from '../services/usuario';

export default {
    name: 'perfil',
    data(){
        return{
            usuario: {
                email: '',
                senha: '',
                token: ''
            }
        } 
    },
    mounted() {
        this.getPerfil()
    },
    methods: {
        getPerfil() {
            Usuario.getPerfil().then(resposta =>{
                alert(JSON.stringify(resposta))
            })
        }
    }
}
</script>

<style>

</style>


