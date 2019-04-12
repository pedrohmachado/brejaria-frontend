<template>
        <div class="header-app">
            <b-navbar toggleable="lg" type="dark" variant="dark" fixed="top">
                <b-navbar-brand to="/">
                    <img class="d-inline-block align-top" src="../assets/logo.png" alt="" width="30" height="30"/> 
                </b-navbar-brand>
                <b-navbar-toggle target="nav_collapse"/>
                <b-collapse is-nav id="nav_collapse">
                    <b-navbar-nav>
                        <b-nav-item to="/about">Sobre</b-nav-item>
                        <b-nav-item to="/eventos">Eventos</b-nav-item>
                        <b-nav-item to="/produtos">Produtos</b-nav-item>
                    </b-navbar-nav>
                    <b-navbar-nav class="ml-auto">
                        <b-nav-item-dropdown right>
                            <template slot="button-content">Usuário</template>
                                <b-dropdown-item to="/perfil">Perfil</b-dropdown-item>
                                <b-dropdown-item to="/login">Sair</b-dropdown-item>
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
      
  }
}
</script>

<style scoped>
</style>

