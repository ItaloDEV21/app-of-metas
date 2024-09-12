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

    metas.forEach((m) => {
        m.checked = false
    })

    if(respostas.length == 0){
        console.log("nenhuma meta selecionada!")
        return
    }
    

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true
    })

    console.log('Meta(s) marcadas como concluída(s) ')
}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if (realizadas.length < 1 ){
        console.log("Não exisem metas realizadas! :(")
        return 
    }

    await select ({
        message: "Metas Realizadas: ",
        choices: [...realizadas]
    })
}

const metasAbertas = async () => {
    const abertas = metas.filter((meta) => {
        return meta.checked != true
    })

    if (abertas.length == 0) {
        console.log('Não existem metas abertas! :)')
        return 
    }

    await select ({
        message: "Metas Abertas:" + abertas.length,
        choices: [...abertas]
    })
}

const deletarMetas = async () => {
    const metasDemarcadas = metas.map((meta)=> {
        return {value: meta.value, checked: false}
    }) 

    const itensADeletar = await checkbox({
        message: "Selecione item para deletar", 
        choices: [...metasDemarcadas],
        instructions: false
    })

    if (itensADeletar.length == 0){
        console.log('Nenhum item para deletar')
        return 
    }

    itensADeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item
        })
    })

    console.log("Meta(s) deletada(s) com sucesso! ")
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
                name: "Metas realizadas",
                value: "realizadas"
            },
            {
                name: "Metas abertas",
                value: "abertas"
            },
            {
                name: "Deletar metas",
                value: "deletar"
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
        case "realizadas":
            await metasRealizadas()
            break
        case "abertas":
            await metasAbertas()
            break
        case "deletar":
            await deletarMetas()
            break
        case "sair":
            console.log(" até a próxima ")

          return
    }
  }
}

start()