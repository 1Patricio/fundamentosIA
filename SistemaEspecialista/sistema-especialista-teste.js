const { resolve } = require('path');
//motor de inferencia
const readline = require('readline');

const resposta = readline.createInterface(
    {
        input: process.stdin,
        output: process.stdout
    }
);

async function fazPergunta(pergunta) {
    return new Promise((resolve) => {
        resposta.question(pergunta, (resposta) => {
            resolve(resposta);
        });
    });
}

async function iniciarPerguntas(perguntaAtual) {
    let resposta = await fazPergunta(perguntaAtual.pergunta + ": 1 para SIM, 2 para não\n\n");

    if (resposta == 1 && perguntaAtual.subElemento && perguntaAtual.subElemento.sim) {
        //Se a resposta for uma String o que caracteriza uma resposta final (GPT)
        if (typeof perguntaAtual.subElemento.sim === 'string') {
            console.log("Resposta: " + perguntaAtual.subElemento.sim);
        } else { //Se não for a resposta final, inicia as perguntas de novo
            await iniciarPerguntas(perguntaAtual.subElemento.sim);
        }
    } else if (resposta == 2 && perguntaAtual.subElemento && perguntaAtual.subElemento.nao) {
        if (typeof perguntaAtual.subElemento.nao === 'string') {
            console.log("Resposta: " + perguntaAtual.subElemento.nao);
        } else {
            await iniciarPerguntas(perguntaAtual.subElemento.nao);
        }
    }
    else {
        console.log("Não consegui adivinhar")
    }
}


//Ordem de perguntas
//Regras

const perguntas = [
    {
        pergunta: "É um Professor Homem?",
        subElemento: {
            sim: {
                pergunta: "Usa óculos?",
                subElemento: {
                    sim: {
                        pergunta: "Seu principal destaque é o PHP?",
                        subElemento: {
                            sim: "Lucas Saraiva",
                            nao: {
                                pergunta: "É pai?",
                                subElemento: {
                                    sim: "Lucas Fogaça",
                                    nao: "Daniel"
                                }
                            }
                        }
                    },
                    nao: {
                        pergunta: "É conhecido como mestre dos magos?",
                        subElemento: {
                            sim: "Ramon Lumertz",
                            nao: "Juliano"
                        }
                    }
                }
            }
        }
    },
    {
        pergunta: "É Mulher?",
        subElemento: {
            sim: {
                pergunta: "Ela usa óculos?",
                subElemento: {
                    sim: {
                        pergunta: "Ela dá aula relacionado a banco de dados?",
                        subElemento: {
                            sim: "Mari",
                            nao: "Andrezza"
                        }
                    },
                    nao: {
                        pergunta: "Ela gosta de cavalos?",
                        subElemento: {
                            sim: "Andrezza",
                            nao: "Mari"
                        }
                    }
                }
            }
        }
    },
    {
        pergunta: "É um Estudante da Ulbra?",
        subElemento: {
            sim: {
                pergunta: "Usa óculos?",
                subElemento: {
                    sim: {
                        pergunta: "Já está trabalhando na área?",
                        subElemento: {
                            sim: "Cleitinho",
                            nao: "Caetano"
                        }
                    },
                    nao: {
                        pergunta: "Mora no Estado de SC?",
                        subElemento: {
                            sim: "Anderson",
                            nao: "Lorenzo"
                        }
                    }
                }
            }
        }
    },
    {
        pergunta: "Ele não é professor e não estuda na ulbra?",
        subElemento: {
            sim: {
                pergunta: "Dá cafezinho de cortesia?",
                subElemento: {
                    sim: "Seu Barriga",
                    nao: "Tiozinho da Pipoca"
                }
            }
        }
    }
];

// Informa ao usuário para ele pensar em uma das opções válidas
const arrayDeRespostasPossiveis = ["Ramon Lumertz", "Lucas Fogaça", "Lucas Saraiva", "Andrezza", "Juliano", "Daniel", "Mari", "Thiago", "Paulo", "Anderson Patricio", "Cleitinho", "Caetano", "Lorenzo", "Seu Barriga", "Tiozinho da Pipoca"];

console.log("Pense em uma das opções abaixo para eu tentar adivinhar");
arrayDeRespostasPossiveis.forEach(resposta => {
    console.log(resposta);
});


async function iniciar() {
    for (const pergunta of perguntas){
        let resposta = await fazPergunta(pergunta.pergunta + ": 1 para SIM, 2 para NÂO \n\n");
        if (resposta == 1){
            await iniciarPerguntas(pergunta.subElemento.sim);
            break;
        }
    }
    resposta.close()
}

iniciar();