let perguntas = [
    {
        identificador: "verificar-necessidade-mei",
        pergunta: "Você precisa de um registro para formalizar seu negócio?", 
        respostas: [
            {
                respostaPossivel: "Não",
                resposta: "Certo, neste caso talvez uma abertura de CNPJ pode não ser uma opção acertiva",
                diagnostico: "Usuário não possui necessidade de ter uma MEI"
            },
            {
                respostaPossivel: "Sim",
                redireciona: "entender-beneficios",
            },
            {
                respostaPossivel: "Não Sei",
                redireciona: "sabe-o-que-e-mei"
            },
        ]
    },
    {
        identificador: "sabe-o-que-e-mei",
        pergunta: "Você sabe o que é uma Microempresa Individual (MEI)?", 
        respostas: [
            {
                respostaPossivel: "Não",
                redireciona: "entender-beneficios",
                diagnostico: "Usuário não sabe o que é Microempresa Individual (MEI)"
            },
            {
                respostaPossivel: "Sim",
                redireciona: "verificar-necessidade-mei"
            },
        ]
    },
    {
        identificador: "entender-beneficios",
        pergunta: "Você conhece os benefícios de ser um MEI?", 
        respostas: [
            {
                respostaPossivel: "Não",
                redireciona: "documentos-necessarios",
                diagnostico: "Usuário não conhece os benefícios de ser um MEI"
            },
            {
                respostaPossivel: "Sim",
                redireciona: "documentos-necessarios",
            },
        ]
    },
    {
        identificador: "documentos-necessarios",
        pergunta: "Você tem todos os documentos necessários para se cadastrar como MEI?", 
        respostas: [
            {
                respostaPossivel: "Não",
                resposta: "Os documentos básicos incluem CPF, RG e comprovante de residência.",
                diagnostico: "Usuário não tem conhecimento de quais documentos são necessários para se cadastrar como MEI"
            },
            {
                respostaPossivel: "Sim",
                redireciona: "passos-cadastro"
            },
            {
                respostaPossivel: "Não Sei",
                redireciona: "sabe-documentos-mei"
            },
        ]
    },
    {
        identificador: "sabe-documentos-mei",
        pergunta: "Você sabe quais documentos precisa para abrir um MEI?", 
        respostas: [
            {
                respostaPossivel: "Não",
                resposta: "Consulte um especialista ou pesquise sobre os documentos necessários."
            },
            {
                respostaPossivel: "Sim",
                redireciona: "documentos-necessarios"
            },
        ]
    },
    {
        identificador: "passos-cadastro",
        pergunta: "Você sabe quais são os passos para se cadastrar como MEI?", 
        respostas: [
            {
                respostaPossivel: "Não",
                resposta: "O cadastro pode ser feito online no Portal do Empreendedor."
            },
            {
                respostaPossivel: "Sim",
                redireciona: "realizar-cadastro"
            },
        ]
    },
    {
        identificador: "realizar-cadastro",
        pergunta: "Você já realizou o cadastro como MEI?", 
        respostas: [
            {
                respostaPossivel: "Não",
                resposta: "Acesse o Portal do Empreendedor para realizar seu cadastro."
            },
            {
                respostaPossivel: "Sim",
                redireciona: "obrigacoes-mensais"
            },
        ]
    },
    {
        identificador: "obrigacoes-mensais",
        pergunta: "Você está ciente das obrigações mensais do MEI?", 
        respostas: [
            {
                respostaPossivel: "Não",
                resposta: "Você deve pagar mensalmente a DAS (Documento de Arrecadação do Simples Nacional)."
            },
            {
                respostaPossivel: "Sim",
                redireciona: "pagar-das"
            },
        ]
    },
    {
        identificador: "pagar-das",
        pergunta: "Você entende o que significa DAS quando falamos de MEI?", 
        respostas: [
            {
                respostaPossivel: "Não",
                diagnostico: "Usuário não tem conhecimento do imposto mensal que o MEI deve pagar.",
                redireciona: "fim"
            },
            {
                respostaPossivel: "Sim",
                redireciona: "fim"
            },
        ]
    },
    {
        identificador: "fim",
        pergunta: "Você está pronto para seguir em frente com seu MEI?", 
        respostas: [
            {
                respostaPossivel: "Não",
                resposta: "Busque mais informações ou assistência para se sentir mais seguro."
            },
            {
                respostaPossivel: "Sim",
                resposta: "Ótimo! Boa sorte com sua Microempresa Individual!"
            },
        ]
    },
];

diagnostico = [];
const readline = require('readline');
const respostaInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function fazPergunta(pergunta) {
    return new Promise((resolve) => {
        respostaInterface.question(pergunta, (resposta) => {
            resolve(resposta);
        })
    })
}

Object.prototype.hasOwnProperty = function(property) {
    return this[property] !== undefined;
};

// Motor de inferência
async function processNode(node) {
    let opcoes = "\n";
    for (let index = 0; index < node.respostas.length; index++) {
        opcoes += index + " - " + node.respostas[index].respostaPossivel + "\n";
    }
    let respostaEscolhida = await fazPergunta(node.pergunta + opcoes);

    if(node.respostas[respostaEscolhida].hasOwnProperty('diagnostico'))
    {
        diagnostico.push(node.respostas[respostaEscolhida].diagnostico);
    }

    if (node.respostas[respostaEscolhida].hasOwnProperty('redireciona'))
    {
        let identificador = node.respostas[respostaEscolhida].redireciona;
        if(identificador === 'fim') {
            return false;
        }
        var otherNode = perguntas.find(item => item.identificador == identificador);
        return await processNode(otherNode);
    }

    if(node.respostas[respostaEscolhida].hasOwnProperty('resposta')){
        console.log("\n")
        console.log(node.respostas[respostaEscolhida].resposta + ("\n")); 
        return false;
    }
}

async function iniciarPerguntas(perguntas) {
    resposta = await processNode(perguntas[0]);
    respostaInterface.close();

    if(diagnostico.length > 0) {
        console.log("Fatores considerados ao usuário com interesse em ser MEI :");
        for (let index = 0; index < diagnostico.length; index++) {
            console.log(diagnostico[index] + "\n");
        }
    }else {
        console.log("Nenhum problema foi identificado.");
    }   
}

iniciarPerguntas(perguntas);