'use strict'

const getListarContatos= async (numero) => {
    const contatosUrl = `http://localhost:8080/v1/whatsapp/contatos/${numero}`
    const response = await fetch(contatosUrl)
    return response.json()
}

