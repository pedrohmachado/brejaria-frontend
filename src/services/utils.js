import { instance } from './config'

export default {
    uploadImagemProduto:(IDProduto, formData)=>{
        return instance.post('upload/produto/' + IDProduto, formData, {
            headers: { Authorization: `Bearer ` + localStorage.getItem('token')}
        })
    },

    getImagemProduto:(IDProduto) => {
        return instance.get('imagem/produto/' + IDProduto, {
            headers: { Authorization: `Bearer ` + localStorage.getItem('token')}
        })
    },

    uploadImagemEvento:(IDEvento, formData)=>{
        return instance.post('upload/evento/' + IDEvento , formData, {
            headers: { Authorization: `Bearer ` + localStorage.getItem('token')}
        })
    },


}