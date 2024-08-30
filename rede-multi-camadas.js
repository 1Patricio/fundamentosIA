//Funções de transferência

class Entrada{
    valorEntrada = 0;
    peso = 0;
}

const entradas_pesos = [ //Array
    {entrada: -1,peso: 0}, //Entrada 0 || -1 = Entrada, 0 = Peso
    {entrada: 1,peso: -1}, //Entrada 1 || 1 = Entrada, -1 = Peso
    {entrada: 1,peso: 2} //Entrada 2 || 1 = Entrada, 2 = Peso
];

let p1 = -1, p2=-1, p3=-1

const treinamento = [ //Rede de treinamento
    //Cítricos
    [0,0,0,0] // Se 0 | 0 | 0 == Cítrico que é 0 //Laranja
    [0,0,1,0] // Se 0 | 0 | 1 == Cítrico que é 0 //Abacaxi
    [0,1,0,0] // Se 0 | 1 | 0 == Cítrico que é 0 //Morango
    [0,1,1,0] // Se 0 | 1 | 1 == Cítrico que é 0 //Morango
    //Doces
    [1,0,0,1] // Se 1 | 0 | 0 == Cítrico que é 0 //Mamão
    [1,0,1,1] // Se 1 | 0 | 1 == Cítrico que é 0 //Melão
    [1,1,0,1] // Se 1 | 1 | 0 == Cítrico que é 0 //Melão
    [1,1,1,1] // Se 1 | 1 | 1 == Cítrico que é 0 //Mamão
];

// Escolha a função que vamos utilizar para calcular (Limite Rapido, Função Rápido, Função Sigmoite)
let funcaoEscolhida = 'FS';

let y

switch (funcaoEscolhida) {
    case 'LR': //Limite Rápido
        y = limiteRapido(soma(entradas_pesos))
        console.log("Saída: " + y + ", Função utilizada "+ funcaoEscolhida)
        break;
    case 'FR':
        y = funcaoRampa(soma(entradas_pesos))
        console.log("Saída: " + y + ", Função utilizada "+ funcaoEscolhida)
        break;
    case 'FS':
        y = funcaoSigmoide(soma(entradas_pesos))
        console.log("Saída: " + y + ", Função utilizada "+ funcaoEscolhida)
        break;

    default:
        console.log("A operação não é válida")
        break;
}

//Passando a usar listas ao invés de variáveis únicas
function soma(entradas_pesos) {
    var soma = 0;
    for (let i = 0; i < entradas_pesos.length; i++) { //Forma mais dinâmica 
        soma = soma + (entradas_pesos[i].entrada * entradas_pesos[i].peso)
    }
    console.log("Soma: " + soma);
    return soma;
}

function limiteRapido(soma){
    return soma <= 0 ? -1 : 1; //If ternário
}

function funcaoRampa(soma) {
    if(soma < 0){
        return 0;
    } else if (soma >= 0 && soma <= 1){
        return soma;
    } else if (soma > 1){ //Só o else aqui já funcionária
        return 1;
    }
}

function funcaoSigmoide(soma){
    if (soma >= 0){
        return 1 - 1 / (1 + soma);
    } else{
        return -1 + 1 / (1 - soma);
    }
}