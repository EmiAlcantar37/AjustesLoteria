const TOTAL = 54;

let orden = [];
let actual = 0;
let intervalo = 3000;
let timer = null;
let pausado = false;
let audio = new Audio();

const startBtn = document.getElementById("startBtn");
const inicio = document.getElementById("inicio");
const app = document.getElementById("app");
const cartaImg = document.getElementById("carta");

const btnPausa = document.getElementById("pausa");
const btnAtras = document.getElementById("atras");
const btnReiniciar = document.getElementById("reiniciar");

const btn1 = document.getElementById("vel1");
const btn3 = document.getElementById("vel3");
const btn5 = document.getElementById("vel5");

function mezclar(arr){
  for(let i=arr.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [arr[i],arr[j]]=[arr[j],arr[i]];
  }
}

function iniciar(){
  clearInterval(timer);
  audio.pause();
  orden=Array.from({length:TOTAL},(_,i)=>i);
  mezclar(orden);
  actual=0;
  pausado=false;
  btnPausa.textContent="Pausa";
  btnReiniciar.hidden=true;
  mostrar();
  timer=setInterval(siguiente,intervalo);
}

function mostrar(){
  if(actual>=orden.length)return;
  const n=orden[actual]+1;
  const id=String(n).padStart(2,"0");
  cartaImg.src=`cartas/carta${id}.png`;
  audio.pause();
  audio.currentTime=0;
  audio.src=`sonido/carta${id}.mp3`;
  audio.play().catch(()=>{});
}

function siguiente(){
  if(pausado)return;
  actual++;
  if(actual>=orden.length){
    clearInterval(timer);
    audio.pause();
    btnReiniciar.hidden=false;
    return;
  }
  mostrar();
}

function pausar(){
  pausado=!pausado;
  if(pausado){
    clearInterval(timer);
    audio.pause();
    btnPausa.textContent="Reanudar";
  }else{
    btnPausa.textContent="Pausa";
    timer=setInterval(siguiente,intervalo);
  }
}

function atras(){
  if(actual===0)return;
  clearInterval(timer);
  pausado=true;
  btnPausa.textContent="Reanudar";
  actual--;
  mostrar();
}

function setVel(ms){
  intervalo=ms;
  if(!pausado&&actual<orden.length){
    clearInterval(timer);
    timer=setInterval(siguiente,intervalo);
  }
}

startBtn.addEventListener("click",()=>{
  inicio.style.display="none";
  app.style.display="flex";
  iniciar();
});

btnPausa.addEventListener("click",pausar);
btnAtras.addEventListener("click",atras);
btnReiniciar.addEventListener("click",iniciar);

btn1.addEventListener("click",()=>setVel(1000));
btn3.addEventListener("click",()=>setVel(3000));
btn5.addEventListener("click",()=>setVel(5000));
