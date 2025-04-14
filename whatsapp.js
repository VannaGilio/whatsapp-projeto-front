'use strict'

const listarContatos = async (numero) => {
    const contatosUrl = `http://localhost:8080/v1/whatsapp/contatos/${numero}`
    const response = await fetch(contatosUrl)
    return response.json()

    
}

function criarContato(contato){
    const div = document.createElement('div')
    div.className = 'contato'

    const nome = document.createElement('h3')
    nome.textContent = contato.name

    const desc = document.createElement('p')
    desc.textContent = contato.description

    div.appendChild(nome)
    div.appendChild(desc)

    return div
}

async function logarUsuario() {
    const input = document.querySelector('.entrando')
    const numero = input.value.trim()
    if (!numero) return

    const data = await listarContatos(numero)
    console.log('Dados da API:', data)

    if (!data || !Array.isArray(data.dados_contato)) {
        alert('Usuário não encontrado ou sem contatos.')
        return
    }

    mostrarContatos(data.dados_contato)
}

const mostrarContatos = (contatos) => {
    const container = document.querySelector('.container')
    const resultados = document.createElement('section')
    resultados.className = 'resultados'

    const titulo = document.createElement('h2')
    titulo.textContent = 'Meus Contatos' 
    resultados.appendChild(titulo)

    contatos.forEach(contato => {
        const mostrar = criarContato(contato)
        resultados.appendChild(mostrar)
    })
    container.appendChild(resultados)
}

const precionarEnter = ({key}) => {
    if (key === 'Enter'){
        logarUsuario()
    }
}

document.querySelector('.entrando').addEventListener('keypress', precionarEnter)

