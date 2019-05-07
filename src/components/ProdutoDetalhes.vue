<template>
    <div class="produto-detalhes">
        <p>
        {{produto}}
        <img height="100px" width="100px" v-bind:src="urlImagem"/>
        </p>
    </div>
</template>

<script>
import Produto from '../services/produtos'
import { URLImagem } from '../services/config'

export default {
    data() {
      return {
          produto: {
              id: '',
              nome: '',
              descricao: '',
              usuario_id: '',
          },
          urlImagem: ''
      }
    }, 
    
    mounted() {
        this.getProduto(),
        this.urlImagem = URLImagem + this.$route.params.id
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

