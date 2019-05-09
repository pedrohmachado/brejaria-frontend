<template>
    <div class="produto-cadastro">
        <h1>Informe os dados do seu produto</h1>
        <div class="form-cadastro">
            <b-form @submit="cadastra" v-if="show" @reset="limpa">
                <b-form-group>
                    
                    <b-input-group size="md" prepend="Nome">
                        <b-input  v-model="produto.nome" required size="md" type="text" placeholder="Digite o nome do seu produto"></b-input>
                    </b-input-group>
                </b-form-group>
                <b-form-group>
                    
                    <b-input-group size="md" prepend="Descrição">
                        <b-form-textarea v-model="produto.descricao" required size="md" type="email" placeholder="Faça as pessoas se interessarem pelo seu produto"></b-form-textarea>
                    </b-input-group>
                </b-form-group>
               
                    <b-btn-group>
                        <b-button variant="success" type="submit">Enviar</b-button>
                        <b-button variant="info" type="reset">Limpar</b-button>
                    </b-btn-group>
            </b-form>
        </div>
    </div>
</template>

<script>
import Produto from '../services/produtos'

export default {
    name: "ProdutoCadastrado",
    data() {
      return {
        produto: {
            nome: '',
            descricao: '',
        },
        imagem: '',
        show: true
      }
    },
    methods: {
        cadastra() {
            Produto.cadastraProduto(this.produto).then((resposta) =>{
                let idProduto = JSON.stringify(resposta.data.produto.id)
                alert(idProduto)
                this.produto = {}
                this.$router.push({path: '/produto/' + idProduto})
            })
        },
        limpa(evt) {
            evt.preventDefault()
            /* limpa todos os campos */
            this.produto.descricao = ''
            this.produto.nome = ''
            /* limpa validações do navegador referente aos campos */
            this.show = false
            this.$nextTick(() => {
                this.show = true
            })
        }
    }
}
</script>

<style scoped>
.form-cadastro{
        width: 100%;
        max-width: 600px;
        padding: 15px;
        margin: auto;
}
/* .form-register {
    width: 100%;
    max-width: 400px;
    padding: 15px;
    margin: auto;
  }
  .form-register .checkbox {
    font-weight: 400;
  }
  .form-register .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
  }
  .form-register .form-control:focus {
  z-index: 2;
  }
  .butao {
    width: 100%;
    margin: auto;
  } */
</style>
