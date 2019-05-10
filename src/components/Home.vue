<template>
    <div class="home">
        <img alt="Brejaria Logo" src="../assets/logo.png">
        <HelloWorld titulo="Bem-vindo à Brejaria" msg="Você já participou de x eventos e avaliou x produtos!"/>
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
