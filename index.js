const { select, input } = require('@inquirer/prompts') //Aqui vira um objeto, e de dentro desse objeto quero apenas o "select"

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
            console.log("vamos listar ")
            break
        case "sair":
            console.log(" até a próxima ")

          return
    }
  }
}

start()