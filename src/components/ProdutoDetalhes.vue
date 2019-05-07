<template>
    <div class="produto-detalhes">
        <p>
        {{produto}}
        <img height="100px" width="100px" v-bind:src="urlImagem"/>
        </p>

        <form enctype="multipart/form-data" @submit="onUpload"> 
          <input type="file" @change="onFileSelected" />
          <button type="submit">Upload</button>
        </form>
    </div>
</template>

<script>
import Produto from '../services/produtos'
import { URLImagem } from '../services/config'
import Util from "../services/utils"

export default {
    data() {
      return {
          produto: {
              id: '',
              nome: '',
              descricao: '',
              usuario_id: '',
          },
          urlImagem: '',
          selectedFile: null,

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
        },

        onFileSelected(event) {
            this.selectedFile = event.target.files[0]
        },

        onUpload() {
            const fd = new FormData();
            fd.append('image', this.selectedFile, this.selectedFile.name)
            Util.uploadImagemProduto(this.produto.id, fd).then(()=>{
                
            })
        },
    }
}
</script>

<style scoped>

</style>

