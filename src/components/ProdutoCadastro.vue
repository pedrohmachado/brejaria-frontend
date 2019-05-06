<template>
    <div class="produto-cadastro">
        <h1>Informe os dados do seu evento</h1>
        <b-form @submit="cadastraProduto" @reset="limpaForm" v-if="show" class="form-register">
            <b-form-group
                id="nomeGroup"
                label="Nome: "
                label-for="nomeInput"
            >
                <b-form-input
                    id="nomeInput"
                    type="text"
                    v-model="produto.nome"
                    required
                    placeholder="Digite o nome do seu produto" />
            </b-form-group>

            <b-form-group
                id="descricaoGroup"
                label="Descrição: "
                label-for="descricaoInput"
            >
                <b-form-textarea
                    id="descricaoInput"
                    type="text"
                    v-model="produto.descricao"
                    required
                    placeholder="Faça as pessoas se interessarem pelo seu produto" />
            </b-form-group>

             
                <div class="butao">
                    <b-button class="btn btn-md btn-primary btn-block" type="submit" variant="dark">Enviar</b-button>
                    <b-button class="btn btn-md btn-primary btn-block" type="reset" variant="danger">Limpar</b-button>
                </div>
        </b-form>
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
        cadastraProduto() {
            alert(JSON.stringify(this.produto))
            Produto.cadastraProduto(this.produto).then(resposta =>{
                alert(JSON.stringify(resposta))
                this.produto = {}
                alert("Salvo com sucesso")
                this.$router.push({path: '/produtos'})
            })
        },
        limpaForm(evt) {
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
.form-register {
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
  }
</style>
