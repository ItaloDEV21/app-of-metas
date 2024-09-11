const { select, input, checkbox } = require('@inquirer/prompts') //Aqui vira um objeto, e de dentro desse objeto quero apenas o "select"

let meta = {
    value: 'Tomar 3L de água por dia',
    checked: false,
}

let metas = [
    meta
]

const cadastrarMeta = async () => {
    const meta = await input({message: "Digite a meta: "})

    if (meta.length == 0) {
        console.log('A meta não pode ser vazia')
        return 
    }

    metas.push({ 
        value: meta, checked: false
    })
}

const listarMeta = async () => {
    const respostas = await checkbox({
        message: "use as setas para mudar de meta, o espaço para marcar ou desmarcar e o enter para finlizar essa etapa",
        choices: [...metas],
        instructions: false
    })

    if(respostas.length == 0){
        console.log("nenhuma meta selecionada!")
        return
    }

    metas.forEach((m) => {
        m.checked = false
    })

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true
    })

    console.log('Meta(s) marcadas como concluída(s) ')
}

const start = async () => {
    
  while(true) {

    const opcao = await select({
        message: "Menu >", // Menu da aplicação, uso o "await" para o código ficar em espera até ele retornar uma promessa, pois caso não tenha o código entraria em loop
        choices: [
            {
                name: "Cadastrar meta",
                value: "cadastrar"
            },
            {
                name: "Listar metas",
                value: "listar"
            },
            {
                name: "Sair", 
                value: "sair"
            }
        ]
    })

    switch(opcao){
        case "cadastrar":
            await cadastrarMeta()
            console.log(metas)
            break
        case "listar":
            await listarMeta()
            break
        case "sair":
            console.log(" até a próxima ")

          return
    }
  }
}

start()