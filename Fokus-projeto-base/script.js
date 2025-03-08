const html = document.querySelector('html');
const focobt = document.querySelector('.app__card-button--foco');
const curtobt = document.querySelector('.app__card-button--curto');
const longobt = document.querySelector('.app__card-button--longo');
const displayTempo = document.querySelector('#timer');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button');
const musicaFotoInput = document.querySelector('#alternar-musica');
const musica = new Audio('sons/luna-rise-part-one.mp3');
const startPausebt = document.querySelector('#start-pause');
const audioPlay = new Audio('sons/play.wav');
const audioPause = new Audio('sons/pause.mp3');
const audioTempoFinalizado = new Audio('sons/beep.mp3')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const iniciarOuPausarBtIcone = document.querySelector(".app__card-primary-butto-icon") 
const tempoNaTela = document.querySelector('#timer');
musica.loop=true;

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;
musicaFotoInput.addEventListener('change', () => {
    if (musica.paused){
        musica.play();
    }else {
        musica.pause();
    }
})

const duracaoFoco = 1500;
const duracaoDescansoCurto = 300;
const duracaoDescansoLongo = 900;

focobt.addEventListener('click', () => {
    tempoDecorridoEmSegundos= 1500
  alterarContexto('foco');
  focobt.classList.add('active')
});
curtobt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
   alterarContexto('descanso-curto');
   curtobt.classList.add('active');
});
longobt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    longobt.classList.add('active');
})
function alterarContexto(contexto){
    mostrarTempo()
    botoes.forEach(function (contexto){
        contexto.classList.remove('active');
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
             Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            </h1>
            `;
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
            </h1>`
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar a superficice,  <strong class="app__title-strong">Faça uma pausa longa.</strong>
            </h1>`
        default:
            break;
    }
}
const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <=0){
        audioTempoFinalizado.play()
        alert('Tempo finalizado.')
        zerar()
        return
    }
    tempoDecorridoEmSegundos -=1
    mostrarTempo()
}
startPausebt.addEventListener('click', iniciar)

function iniciar(){
    if (intervaloId){
        audioPause.play();
        zerar()
        return
    }
    audioPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = 'Pausar'
    iniciarOuPausarBtIcone.setAttribute('src','imagens/pause.png')
}
function zerar(){
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = 'Começar'
    intervaloId = null
    iniciarOuPausarBtIcone.setAttribute('src','imagens/play_arrow.png')
}
function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-BR',{minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}
mostrarTempo()