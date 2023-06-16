const opium = {
    id: '0',
    songName : 'if looks could kill',
    artista : 'Destroy Lonely',
    album: 'single',
    coverFile : 'opium_friday.jpg',
};

const ugliest = {
    id: '1',
    songName : 'Ugliest',
    artista : '$UICIDEBOY$',
    album : 'Long Term Effects of Suffering',
    coverFile : 'ugliest.jpg',
};

const ghostKilla = {
    id: '2',
    songName : 'GHOSTKILLA',
    artista : '1nonly', 
    album : 'single',
    coverFile : 'ghost_Killa.jpg',
};

const corsaFreestyle = {
    id: '3',
    songName : 'Corsa Freestyle',
    artista : 'Ryu, the Runner',
    album : 'Essa é a Vida de um Corredor',
    coverFile : 'corsa_Freestyle.jpg',
};

const sempreTravado = {
    id: '4',
    songName : 'SEMPRE TRAVADO',
    artista : 'DEREK',
    album: 'single',
    coverFile : 'sempre_travado.jpg',
};

const musicBiblioteca = [
    opium, 
    ugliest,
    ghostKilla, 
    corsaFreestyle, 
    sempreTravado,
];

let songs = [...musicBiblioteca];

let playlist = [opium, ugliest, corsaFreestyle, sempreTravado]

const pageBody = document.getElementById('corpinho');
const searchTerm = document.getElementById('search-term');
const searchBt = document.getElementById('search-button');
const playlistElement = document.getElementById('playlist');


function loadBiblioteca(){
    pageBody.innerHTML = '';
    for(let index = 0; index < songs.length; index++)  {
        pageBody.innerHTML += `
        <div class="card d-flex flex-column align-items-center" 
        style="width: 18rem; height: 30rem;"
        >
            <img src="covers/${songs[index].coverFile}"
             class="card-img-top" 
             alt="Disc Cover"
             />
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${songs[index].songName}</h5>
              <p class="card-text">${songs[index].artista}</p>
              <p class="card-text">${songs[index].album}</p>
              <button class="btn btn-outline-success" onclick="addToPlaylist('${songs[index].id}')"><i class="bi bi-play-circle"></i></button>
            </div>
          </div>
        `} 
}

function loadPlayList(){
    playlistElement.innerHTML = '';
    for(let index = 0; index < playlist.length; index++){
        playlistElement.innerHTML += `
        <div id="playlist" class="modal-body">
        <p id=${playlist[index].id} class="d-flex justify-content-between border-top border-bottom align-items-center">
          ${playlist[index].songName} - ${playlist[index].artista}
          <button class="btn btn-outline-danger" onclick="removeFromPlaylist('${playlist[index].id}'
            )">
            <i class="bi bi-trash"></i>
          </button>
        </p>
        `;
    }
}

function searchClick() {
    if(searchTerm.value === '') return;
   songs = songs.filter(
    (songs) => 
    songs.songName.includes(searchTerm.value) ||
    songs.album.includes(searchTerm.value) ||
    songs.artista.includes(searchTerm.value) );
   loadBiblioteca();
}

function resetFilter() {
    if(searchTerm.value !== '') return;
    songs = [...musicBiblioteca];
    loadBiblioteca();
}

function removeFromPlaylist(songId){
    playlist = playlist.filter(
        (song) => 
        song.id !== songId
    )
    document.getElementById(songId).remove();
}

function addToPlaylist(songId){
    if(playlist.find(song => song.id === songId)) return;
    const songToAdd = songs.find((x) => x.id === songId);
    playlist.push(songToAdd);

    playlistElement.innerHTML += `
    <div id="playlist" class="modal-body">
    <p id=${songToAdd.id} class="d-flex justify-content-between border-top border-bottom align-items-center">
      ${songToAdd.songName} - ${songToAdd.artista}
      <button class="btn btn-outline-danger" onclick="removeFromPlaylist('${songToAdd.id}'
        )">
        <i class="bi bi-trash"></i>
      </button>
    </p>
    `;
}

searchBt.addEventListener('click', searchClick);
searchTerm.addEventListener('input', resetFilter);

loadBiblioteca();
loadPlayList();
