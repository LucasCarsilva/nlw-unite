let participantes = [
    {
        nome: 'Lucas Carvalho da Silva',
        email: 'lucaskarsilva@gmail.com',
        dataInscricao: new Date(2024, 2, 22, 19, 20),
        dataCheckIn: new Date(2024, 2, 25, 22, 30)
    },
    {
        nome: 'Maycon Silva',
        email: 'maycon@gmail.com',
        dataInscricao: new Date(2024, 0, 2, 19, 45),
        dataCheckIn: new Date(2024, 0, 5, 20, 10)
    },
    {
        nome: 'Fernanda Souza',
        email: 'fernanda@gmail.com',
        dataInscricao: new Date(2024, 1, 12, 14, 30),
        dataCheckIn: new Date(2024, 1, 15, 16, 40)
    },
    {
        nome: 'João Oliveira',
        email: 'joao@gmail.com',
        dataInscricao: new Date(2024, 1, 28, 10, 15),
        dataCheckIn: new Date(2024, 2, 2, 9, 20)
    },
    {
        nome: 'Maria Santos',
        email: 'maria@gmail.com',
        dataInscricao: new Date(2024, 0, 8, 18, 50),
        dataCheckIn: new Date(2024, 0, 10, 11, 30)
    },
    {
        nome: 'Pedro Costa',
        email: 'pedro@gmail.com',
        dataInscricao: new Date(2024, 2, 2, 12, 10),
        dataCheckIn: new Date(2024, 2, 4, 15, 20)
    },
    {
        nome: 'Carla Silva',
        email: 'carla@gmail.com',
        dataInscricao: new Date(2024, 1, 4, 20, 30),
        dataCheckIn: new Date(2024, 1, 6, 10, 40)
    },
    {
        nome: 'Rafael Mendes',
        email: 'rafael@gmail.com',
        dataInscricao: new Date(2024, 0, 28, 17, 10),
        dataCheckIn: new Date(2024, 1, 2, 19, 20)
    },
    {
        nome: 'Ana Oliveira',
        email: 'ana@gmail.com',
        dataInscricao: new Date(2024, 1, 10, 15, 45),
        dataCheckIn: new Date(2024, 1, 13, 12, 30)
    },
    {
        nome: 'Carlos Souza',
        email: 'carlos@gmail.com',
        dataInscricao: new Date(2024, 1, 18, 9, 20),
        dataCheckIn: new Date(2024, 1, 20, 17, 30)
    }
];

const criarNovoParticipante = (participante) => {
    const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)
    let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

    if(participante.dataCheckIn == null) {
        dataCheckIn = `
            <button data-email="${participante.email}" onclick="fazerCheckIn(event)">
                Confirmar check-in
            </button>
        `

    }

    return `
    <tr>
        <td>
            <strong>${participante.nome}</strong>
            <br>
            <small>${participante.email}</small>
        </td>
        <td>${dataInscricao}</td>
        <td>${dataCheckIn}</td>
    </tr>  
    `
}

const atualizarLista = (participantes) => {
    let output = ''
    for(let participante of participantes){
        output = output + criarNovoParticipante(participante)
    }

    document.querySelector('tbody').innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
    event.preventDefault()

    const dadosDoFormulario = new FormData(event.target)
    
    const participante = {
        nome: dadosDoFormulario.get('nome'),
        email: dadosDoFormulario.get('email'),
        dataInscricao: new Date(),
        dataCheckIn: null
    }

    const participanteExiste = participantes.find(
        (p) =>  p.email == participante.email
    )

    if (participanteExiste) {
        alert('Email já cadastrado!')
        return
    }

    participantes = [participante, ...participantes]

    atualizarLista(participantes)

    event.target.querySelector('[name="nome"]').value = ""
    event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
    const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'

    if (confirm(mensagemConfirmacao) == false) {
        return
    }

    const participante = participantes.find(
        (p) => p.email == event.target.dataset.email
    )

    participante.dataCheckIn = new Date()

    atualizarLista(participantes)
}