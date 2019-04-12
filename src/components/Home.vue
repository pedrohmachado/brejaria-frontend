<template>
    <div class="home">
        <img alt="Brejaria Logo" src="../assets/logo.png">
        <HelloWorld msg="Bem-vindo à Brejaria"/>
    </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'

export default {
    name: 'Home',
    components : {
        HelloWorld
    }
}
</script>

<style scoped>

</style>
