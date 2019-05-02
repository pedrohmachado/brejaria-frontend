<template>
    <div class="produto-detalhes">
        <p>
        {{produto}}
        </p>
    </div>
</template>

<script>
import Produto from '../services/produtos'

export default {
    data() {
      return {
          produto: {
              id: '',
              nome: '',
              descricao: '',
              usuario_id: '',
          }
      }
    }, 
    
    mounted() {
        this.getProduto()
    },

    methods: {
        getProduto() {
             Produto.getProduto(this.$route.params.id).then((resposta) => {
                this.produto = resposta.data.data;
            })
        }
    }
}
</script>

<style scoped>

</style>

