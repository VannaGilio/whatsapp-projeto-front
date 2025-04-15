'use strict'

/***********FETCH API***********/
const getListarContatos = async (numero) => {
    try {
        const contatosUrl = `http://localhost:8080/v1/whatsapp/contatos/${numero}`
        const response = await fetch(contatosUrl)

        if (!response.ok) throw new Error('Erro ao buscar contatos')

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Erro na API:', error)
    }
}

/***********EXIBIR CONTATOS***********/
const mostrarContatos = (contatos) => {
    const main = document.querySelector('body')
    main.innerHTML = '' 

    const resultados = document.createElement('section')
    resultados.className = 'resultados'

    const titulo = document.createElement('h2')
    titulo.textContent = 'Meus Contatos'
    resultados.appendChild(titulo)

    contatos.forEach(contato => {
        const container = document.createElement('div')
        container.classList.add('contato')

        const nome = document.createElement('h3')
        nome.textContent = contato.name 

        const descricao = document.createElement('p')
        descricao.textContent = contato.description || 'Sem descrição.' 

        container.appendChild(nome)
        container.appendChild(descricao)
        resultados.appendChild(container)
    })

    main.appendChild(resultados)
}

/***********FUNÇÃO LOGIN***********/
async function logarUsuario() {
    const input = document.querySelector('.entrando')
    const numero = input.value.trim()
    if (!numero) return

    const data = await getListarContatos(numero)
    console.log('Dados da API:', data)

    if (!data || !Array.isArray(data.dados_contato)) {
        alert('Usuário não encontrado ou sem contatos.')
        return
    }

    mostrarContatos(data.dados_contato)
}

/***********EVENTO DE ENTER***********/
const precionarEnter = ({ key }) => {
    if (key === 'Enter') {
        logarUsuario()
    }
}

document.querySelector('.entrando').addEventListener('keypress', precionarEnter)
