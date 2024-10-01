class Neuronio { //Perseptron //Escopo

    constructor(numeroEntradas){
        this.numeroEntradas = numeroEntradas; //Refêrenciando //this dá acesso global a classe, por isso se chama constructor
        this.pesos = [];

        for (let i = 0; i < numeroEntradas; i++) { //Para definir quantidade de pesos e entradas
            this.pesos.push(Math.random()); //adiciona dentro do array
        }
        this.bias = Math.random(); //Aqui vai definir um valor e depois vai ser o mesmo em qualquer lugar
        this.taxaAprendizagem = 0.1; //Quanto menor o valor mais preciso
    }

    somar(entrada){ //Somar é uma função do Neurono logo ela tem que estar dentro da classe
        let somaPonderada = this.bias; //Primeiro valor e nosso bias
        for (let i = 0; i < this.numeroEntradas; i++) { //Fizemos pois podemos ter N números de entradas
            somaPonderada += entrada[i] * this.pesos[i]; //Valor da entrada x * Valor do peso x 
        }
        return somaPonderada;
    }

    ativacao(valor){
        return valor<0 ? 0 : 1; //Só vai retornar 0 ou 1
    }

    processar(entrada){ //
        let resultadoSoma = this.somar(entrada); //somaPonderada é o resultado do método somar
        let saida = this.ativacao(resultadoSoma);
        return saida
    }

    ajustar(erro, entrada){
        for (let i = 0; i < this.numeroEntradas; i++) {
            this.pesos [i] += erro * entrada [i] * this.taxaAprendizagem //Pesos balanceados
        }
        this.bias += erro * this.taxaAprendizagem;
    }

    treinarRede(arrayTreinamento){ //Função mais legal // Ver se tem algum ajuste, se tiver ele fica se não 
        let ajustesNecessarios = true;

        while(ajustesNecessarios){
            ajustesNecessarios = false;

            for (let i = 0; i < arrayTreinamento.length; i++) {
                const entrada = arrayTreinamento[i].entrada;
                const resultadoEsperado = arrayTreinamento[i].resultadoEsperado;
                const resultadoObtido = this.processar(entrada);
                const erro = resultadoEsperado - resultadoObtido;

                if (erro !==0) {
                    ajustesNecessarios = true;
                    this.ajustar(erro, entrada);
                }
            }
        }
    }
}

const treinamento = [ //Rede de treinamento
    //Neste exemplo estamos com 3 entradas e 3 pesos
    {entrada: [0,0,0], resultadoEsperado: 0}, //Citrico
    {entrada: [0,0,1], resultadoEsperado: 0}, //Citrico
    {entrada: [0,1,0], resultadoEsperado: 0}, //Citrico
    {entrada: [0,1,1], resultadoEsperado: 0}, //Citrico
    
    {entrada: [1,0,1], resultadoEsperado: 1}, //Doce
    {entrada: [1,0,1], resultadoEsperado: 1}, //Doce
    {entrada: [1,1,0], resultadoEsperado: 1}, //Doce
    {entrada: [1,1,1], resultadoEsperado: 1}, //Doce
];

neuronio = new Neuronio(3);
neuronio.treinarRede(treinamento);

let resultadoArray = ["Citrico", "doce"]

perguntaParaUsuario = true;
while(perguntaParaUsuario){
    perguntaParaUsuario = false
    console.log("Informe o código da fruta separado por virgula")

    console.log("Deseja fazer outra verificação?");
}

let resultado = neuronio.processar([0,1,1])
console.log("A fruta informada é " + resultadoArray[resultado])
