const cover = document.getElementById('thumb');
const namemusic = document.getElementById('songname');
const artista = document.getElementById('cantor');
const song = document.getElementById('som');
const play = document.getElementById('play');
const esquerda = document.getElementById('previous');
const likeButton = document.getElementById('like');
const direita = document.getElementById('next');
const cora = document.getElementById('like');
const barras = document.getElementById('pintaogrosso');
const boxBarras = document.getElementById('barra-lore');
const shuffleButton = document.getElementById('shuffle');
const loop = document.getElementById('repeat');
const songTime = document.getElementById('song-time');
const totalTime = document.getElementById('total-time');

const snowUkulele = {
    namemusic : 'i wrote this song 4 u',
    artista : 'Snow',
    File : 'snow_linda',
    liked : false,
};


const opium = {
    namemusic : 'if looks could kill',
    artista : 'Destroy Lonely',
    File : 'opium_friday',
    liked : false,
};

const ugliest = {
    namemusic : 'Ugliest',
    artista : '$UICIDEBOY$',
    File : 'ugliest',
    liked : false,
};

const ghostKilla = {
    namemusic : 'GHOSTKILLA',
    artista : '1nonly',
    File : 'ghost_Killa',
    liked : false,
};

const corsaFreestyle = {
    namemusic : 'Corsa Freestyle',
    artista : 'Ryu, the Runner',
    File : 'corsa_Freestyle',
    liked : false,
};

const sempreTravado = {
    namemusic : 'SEMPRE TRAVADO',
    artista : 'DEREK',
    File : 'sempre_travado',
    liked : false,
};

let isPlaying = false;
let isShuffled = false;
let isLooping = false;

const originalPlaylist =  JSON.parse(localStorage.getItem('playlisty')) ?? [snowUkulele, opium, ugliest, ghostKilla, corsaFreestyle, sempreTravado,];
let sortedPlaylist = [...originalPlaylist];
let index = 0;


function playSong(){
    play.querySelector('.bi').classList.remove('bi-play-circle-fill');
    play.querySelector('.bi').classList.add('bi-pause-circle-fill');
    song.play();
    isPlaying = true;
}

function pauseSong(){
    play.querySelector('.bi').classList.add('bi-play-circle-fill');
    play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
    song.pause();
    isPlaying = false;
}


function playDecisao(){
    if (isPlaying === true){
        pauseSong();
    }
    else {
        playSong();
    }
}

function loadingSong(){
    cover.src = `capas/${sortedPlaylist[index].File}.jpg`;
    namemusic.innerText = sortedPlaylist[index].namemusic;
    artista.innerText = sortedPlaylist[index].artista;
    song.src = `songs/${sortedPlaylist[index].File}.mp3`;
    likeButtonRender();
}




function esquerdaSong(){
    if(index === 0){
    index = sortedPlaylist.length - 1;
    }
    else {
        index -= 1;
    }
    loadingSong();
    playSong();
}

function direitaSong(){
    if(index === sortedPlaylist.length - 1){
    index = 0;
    }
    else {
        index += 1;
    }
    loadingSong();
    playSong();
}

function updateProgress(){
    const larguraBar = (song.currentTime/song.duration)*100;
    barras.style.setProperty('--progress',  `${larguraBar}% `);
    songTime.innerText = toHHMMSS   (song.currentTime);
}

function jumpTo(event){
    const width = boxBarras.clientWidth;
    const clickPosition = event.offsetX;
    const jumpToTime = (clickPosition/width)*song.duration;
    song.currentTime = jumpToTime;
}


function shuffleArray(preShuffArray){
    const size = preShuffArray.length;
    let currentIndex = size - 1;
    while(currentIndex > 0){
        let randomIndex = Math.floor(Math.random()* size);
        let auxiliar = preShuffArray[currentIndex];
        preShuffArray[currentIndex] = preShuffArray[randomIndex];
        preShuffArray[randomIndex]  = auxiliar;
        currentIndex -= 1;
    }
}

function shuffleButtonClicked(){
    if(isShuffled === false){
        isShuffled = true;
        shuffleArray(sortedPlaylist);
        shuffleButton.classList.add('button-active');
    }
    else{
        isShuffled = false;
        sortedPlaylist = [...originalPlaylist]
        shuffleButton.classList.remove('button-active');
    }
}

function loopButtonClicked(){
    if(isLooping === false){
        isLooping = true;
        loop.classList.add('button-active');
    }
    else{
        isLooping = false;
        loop.classList.remove('button-active');
    }
}

function nextOrRepeat(){
    if(isLooping === false){
    direitaSong();
    }
    else {
    playSong();
    }
}

function toHHMMSS( orignalNumber) {
    let hours = Math.floor(orignalNumber / 3600);
    let min = Math.floor((orignalNumber - hours * 3600) / 60);
    let secs = Math.floor(orignalNumber - hours * 3600 - min * 60);

    return `${hours.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}


function updateTotalTime(){
    totalTime.innerText = toHHMMSS (song.duration);
}

function likeButtonRender(){
    if(sortedPlaylist[index].liked === true){
        likeButton.querySelector('.bi').classList.remove('bi-heart');
        likeButton.querySelector('.bi').classList.add('bi-heart-fill');
        likeButton.classList.add('button-active');  
    }
    else{
        likeButton.querySelector('.bi').classList.add('bi-heart');
        likeButton.querySelector('.bi').classList.remove('bi-heart-fill');
        likeButton.classList.remove('button-active');
    }
}

function likeButtonClicked(){
    if(sortedPlaylist[index].liked === false){
    sortedPlaylist[index].liked = true;
    }
    else{
        sortedPlaylist[index].liked = false;
    }
    likeButtonRender();
    localStorage.setItem('playlisty', 
    JSON.stringify(originalPlaylist)
    );
}

loadingSong();
play.addEventListener('click', playDecisao);
direita.addEventListener('click', direitaSong);
esquerda.addEventListener('click', esquerdaSong);
song.addEventListener('timeupdate', updateProgress);
song.addEventListener('ended', nextOrRepeat);
song.addEventListener('loadedmetadata', updateTotalTime);
boxBarras.addEventListener('click', jumpTo);
shuffleButton.addEventListener('click', shuffleButtonClicked);
loop.addEventListener('click', loopButtonClicked);
likeButton.addEventListener('click', likeButtonClicked)
