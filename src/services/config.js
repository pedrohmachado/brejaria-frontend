import axios from "axios";

export const URL = 'http://localhost:8081/api/'

export const URLImagem = URL + 'imagem/produto/'

export const instance = axios.create({
    baseURL: URL
})

