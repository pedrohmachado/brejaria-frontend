<template>
        <div class="header-app">
            <b-navbar toggleable="lg" type="dark" variant="dark" fixed="top">
                <b-navbar-brand to="/home">
                    <img class="d-inline-block align-top" src="../assets/logo.png" alt="" width="30" height="30"/> 
                </b-navbar-brand>
                <b-navbar-toggle target="nav_collapse"/>
                <b-collapse is-nav id="nav_collapse">
                    <b-navbar-nav>
                        <b-nav-item to="/sobre">Sobre</b-nav-item>
                        <b-nav-item to="/eventos">Eventos</b-nav-item>
                        <b-nav-item to="/produtos">Produtos</b-nav-item>
                    </b-navbar-nav>
                    <b-navbar-nav class="ml-auto">
                        <b-nav-item-dropdown right>
                            <template slot="button-content">Usuário<!--{{usuario.nome}}--></template>
                                <b-dropdown-item to="/eu">Perfil</b-dropdown-item>
                                <b-dropdown-item v-on:click='logout()'>Sair</b-dropdown-item>
                        </b-nav-item-dropdown>  
                    </b-navbar-nav>
                </b-collapse>
            </b-navbar>
        </div>
</template>

<script>

export default {
    name: 'header-app',
    components: {

    },
    data() {
        return {
            // usuario: {
            //     nome: localStorage.getItem("nome-usuario")
            // }
        }
    },

    methods : {
        logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('nome-usuario');
            this.$router.push({name: 'Login'});
        }
    }
}

</script>

<style scoped>
</style>

