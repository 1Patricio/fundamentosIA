//Entrada e resultados esperados
let x11 = 0, x12 = 0, resultado1 = 0; //Grupo1
let x21 = 0, x22 = 1, resultado2 = 0; //Grupo2
let x31 = 1, x32 = 0, resultado3 = 1; //Grupo3 
let x41 = 1, x42 = 1, resultado4 = 1; //Grupo4

let p1 = -1, p2 = -1;

let soma, ajustes = 0, quantidadeAjustesTotais = 0, repeticoes = 0;

do{ //Função de treinamento
    ajustes = 0;
    // soma =  somar(x11, x12);
    // y = transferencia(soma)
    // if (y != resultado1){
    //     ajustar(x11, x12, resultado1, y)
    //     ajustes++;
    //     quantidadeAjustesTotais++;
    // }

    //Abstração de Código
    verificaSeNecessitaAjustar(x11,x12,resultado1);
    verificaSeNecessitaAjustar(x21,x22,resultado2);
    verificaSeNecessitaAjustar(x31,x32,resultado3);
    verificaSeNecessitaAjustar(x41,x42,resultado4);
} while(ajustes != 0);

console.log("Teste de aprendizagem com rede neural\n");
console.log("Peso 1: " + p1);
console.log("Peso 2: " + p2);
console.log("Foram necessarios " + quantidadeAjustesTotais + " ajustes para treinar a rede\n");

function somar(x1, x2){
    return (x1*p1 + x2*p2)
}

function transferencia() {
    if (soma<1) {
        return 0
    }
    if (soma>1) {
        return 1
    }
    return soma; //Sua soma está retornando valores entre 0 e 1

}
function ajustar(entrada1, entrada2, resuldadoEsperado, resultadoObtido){
    p1 = p1 + 1 * (resuldadoEsperado - resultadoObtido) * entrada1;
    p2 = p2 + 1 * (resuldadoEsperado - resultadoObtido) * entrada2;
}

function verificaSeNecessitaAjustar(x1, x2, resuldadoEsperado){
    soma =  somar(x1, x2);
    resultadoObtido = transferencia(soma)
    if (resultadoObtido != resuldadoEsperado){
        ajustar(x1, x2, resuldadoEsperado, resultadoObtido)
        ajustes++;
        quantidadeAjustesTotais++;
    }
}