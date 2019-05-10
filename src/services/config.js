import axios from "axios";

export const URL = 'http://localhost:8081/api/'

export const URLImagemProduto = URL + 'imagem/produto/'
export const URLImagemEvento = URL + 'imagem/evento/'

export const instance = axios.create({
    baseURL: URL
})

