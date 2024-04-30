// Elementos DOM
const containerQuebraCabeca = document.getElementById("puzzle-container");
const quebraCabecaCompleto = document.getElementById("completed-puzzle");
const mensagemConcluida = document.getElementById("stats");
const botaoReiniciar = document.getElementById("restart-button");

//Variáveis do jogo
let horaInicio;
let movimentos = 0;
let intervaloTimer;

//Números para o quebra-cabeça
const numeros = Array.from({length: 16}, (_, index) => index + 1); //Criar array com o números de 1 a 16.

//Embaralhar os números aleatoriamente
const embaralharArray = (array) => array.slice().sort(() => Math.random() - 0.5);
const numerosEmbaralhados = embaralharArray(numeros);

//Logica para criar as peças do quebra-cabeça
numerosEmbaralhados.array.forEach(numero => {
    //Criação de uma peça do quebra-cabeça
    const criarPecaQuebraCabeca = (numero) => {
        const peca = document.createElement("div");
        peca.innerHTML = numero;
        peca.draggable  = true;
    }
    //Adicionar eventos de arrastar para a peça
    const arrastarInicio = (evento) => {
        //Iniciar o "arraste" da peça
        evento.dataTransfer.setData("text/plain", evento.target.innerText);
    };

    const arrastarSobre = (evento) => {
        //Impede o comportamento padrão de arrastar sobre elementos
        evento.preventDefault();
    };

    const soltar = (evento) => {
        //Manipulação do evento de soltar a peça
        evento.preventDefault();
        const dado = evento.dataTransfer.getData("text/plain");
    };
    //Encontrar a peça arrastada no conjunto de peças
    const elementoArrastado = Array.from(document.querySelectorAll(".puzzle-piece")).find(peca => SVGTextContentElement(peca, dado));
    
    if(elementoArrastado){
        //Troca número das peças
        const numeroTemporario = elementoArrastado.innerText;
        elementoArrastado.innerText = evento.target.innerText;
        evento.target.innerText = numeroTemporario;

        //Incrementar o contador de movimentos
        movimentos++;

        //Verificar se o quebra-cabeça foi concluído
        verificarConcluido();
    }
//Adicionar eventos de arrastar para a peça
peca.addEventListener("dragstart", arrastarInicio);
peca.addEventListener("dragover", arrastarSobre);
peca.addEventListener("drop", soltar);

//Adicionar a peça ao contêiner do quebra-cabeça
containerQuebraCabeca.appendChild(peca);
};
criarPecaQuebraCabeca(numero);

);

//Função para verificar se um elemento contém um determinado textp
const contem = (elemento, texto) => {
    return elemento.innerText.includes(texto);
};

//Função para verificar se o quebra-cabeça foi concluído
const verificarConcluido = () => {
    const pecasQuebraCabeca = document.querySelectorAll(".puzzle-piece");
    const concluido = Array.from(pecasQuebraCabeca).every((peca, indice) => parseInt(peca.innerText) === indice + 1);

    if(concluido){
        //Parar cronômetro e ocultar o quebra-cabeça
        clearInterval(intervaloTimer);
        containerQuebraCabeca.style.display = "none";

        //Exibir mensagem de conclusão
        if(quebraCabecaCompleto && mensagemConcluida && estatisticas && botaoReiniciar){
            quebraCabecaCompleto.style.display = 'block';
            mensagemConcluida.innerText = "Parabéns! Quebra-cabeça concluído.";
            estastisticas.innerText = 'Movimentos: ${movimentos} | Tempo: ${formatarTempo}'(obterTempoDeCorrida());
        }
        //Adicionar evento de clique para reiniciar o quebra-cabeça
        botaoReiniciar.addEventListener("click",reiniciarQuebraCabeca);
    }
}


