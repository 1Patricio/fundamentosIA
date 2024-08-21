//Entrada e resultados esperados
let x11 = 0, x12 = 0, resultado1 = 0; //Grupo1
let x21 = 0, x22 = 1, resultado2 = 0; //Grupo2
let x31 = 1, x32 = 0, resultado3 = 1; //Grupo3 
let x41 = 1, x42 = 1, resultado4 = 1; //Grupo4

let p1 = -1, p2 = -1;

let soma, ajustes, quantidadeAjustesTotais = 0, repeticoes = 0;

do{
    ajustes = 0;
    soma =  somar(x11, x12);
    y = transferencia(soma)
    if (y != resultado1){
        ajustar(x11, x12, resultado1, y)
        ajustes++;
        quantidadeAjustesTotais++;
    }

    soma =  somar(x21, x22);
    y = transferencia(soma)
    if (y != resultado2){
        ajustar(x21, x22, resultado2, y)
        ajustes++;
        quantidadeAjustesTotais++;
    }

    soma =  somar(x31, x32);
    y = transferencia(soma)
    if (y != resultado3){
        ajustar(x31, x32, resultado3, y)
        ajustes++;
        quantidadeAjustesTotais++;
    }

    soma =  somar(x41, x42);
    y = transferencia(soma)
    if (y != resultado4){
        ajustar(x41, x42, resultado4, y)
        ajustes++;
        quantidadeAjustesTotais++;
    }


    
}while(ajustes != 0);

console.log("Teste de aprendizagem com rede neural\n");
console.log("Peso 1: " + p1);
console.log("Peso 2: " + p2);
console.log("Foram necessarios " + quantidadeAjustesTotais + " ajustes para treinar a rede\n");

function somar(x1, x2){
    return (x1*p1 + x2*p2)
}

function transferencia() {
    return soma <= 0 ? 0 : 1;
    // if (soma <= 0) {
    //     return 0;
    // } else{
    //     return 1;
    // }
}
function ajustar(entrada1, entrada2, resuldadoEsperado, resultadoObtido){
    p1 = p1 + 1 * (resuldadoEsperado - resultadoObtido) * entrada1;
    p2 = p2 + 1 * (resuldadoEsperado - resultadoObtido) * entrada2;
}


//teste commit