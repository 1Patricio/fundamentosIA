let perguntas = [
    {
        identificador: "sabe-ligar-pc",
        pergunta: "Voce sabe ligar o computador?", 
        respostas: [
            {
                respostaPossivel: "sim"
            },
            {
                respostaPossivel: "não"
            },
        ],
    },
    {
        identificador: "liga-ou-da-tela-azul",
        pergunta: "Ele liga normalmente e dá tela azul ou reinicia inesperadamente?",
        respostas: [
            {
                respostaPossivel: "sim",
                redireciona: "identificar-problema-tela-azul-ou-reinicia"
            },
            {
                respostaPossivel: "não",
                redireciona: "verifica-sinal-de-video"
            }
        ],
    },
    {
        redireciona: "verifica-sinal-de-video",
        pergunta: "Ele dá sinal de vida mas não da video, correto?",
        respostas: [
            {
                respostaPossivel: "sim",
                redireciona: "identifica-problema-video"
            },
            {
                respostaPossivel: "não",
                redireciona: "liga-ou-da-tela-azul"
            },
            {
                respostaPossivel: "não tem certeza",
                redireciona: "sabe-ligar-pc"
            }
        ]
    },
    {
        identificador: "verificar-pc-liga",
        pergunta: "O computador liga ou dá aul sinal que está ligado?",
        respostas: [
            {
                respostaPossivel: "Sim"
                //Dá algum sinal de vida
            },
            {
                respostaPossivel: "Não"
                //Não dá sinal de vida
            },
            {
                respostaPossivel: "Não tenho certeza",
                //Verificar se a pessoa sabe o que é e como se tenta ligar um computador 
                redireciona: "sabe-ligar-pc"
            },
        ]
    }
]
