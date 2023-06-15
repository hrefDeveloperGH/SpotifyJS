const opium = {
    id: '0',
    namemusic : 'if looks could kill',
    artista : 'Destroy Lonely',
    album: 'single',
    coverFile : 'opium_friday.jpg',
};

const ugliest = {
    id: '1',
    namemusic : 'Ugliest',
    artista : '$UICIDEBOY$',
    album : 'Long Term Effects of Suffering',
    coverFile : 'ugliest.jpg',
};

const ghostKilla = {
    id: '2',
    namemusic : 'GHOSTKILLA',
    artista : '1nonly', 
    album : 'single',
    coverFile : 'ghost_Killa.jpg',
};

const corsaFreestyle = {
    id: '3',
    namemusic : 'Corsa Freestyle',
    artista : 'Ryu, the Runner',
    album : 'Essa é a Vida de um Corredor',
    coverFile : 'corsa_Freestyle.jpg',
};

const sempreTravado = {
    id: '4',
    namemusic : 'SEMPRE TRAVADO',
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

let songsPlaylist = [...musicBiblioteca]

const pageBody = document.getElementById('corpinho');
const searchTerm = document.getElementById('search-term');
const searchBt = document.getElementById('search-button');


function loadBiblioteca(){
    pageBody.innerHTML = '';
    for(let index = 0; index < songsPlaylist.length; index++)  {
        pageBody.innerHTML += `
        <div class="card d-flex flex-column align-items-center" 
        style="width: 18rem; height: 30rem;"
        >
            <img src="covers/${musicBiblioteca[index].coverFile}"
             class="card-img-top" 
             alt="Disc Cover"
             />
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${musicBiblioteca[index].namemusic}</h5>
              <p class="card-text">${musicBiblioteca[index].artista}</p>
              <p class="card-text">${musicBiblioteca[index].album}</p>
              <button class="btn btn-outline-success"><i class="bi bi-play-circle"></i></button>
            </div>
          </div>
        `} 
}

function searchClick(){
    console.log(searchTerm.value);
}

searchBt.addEventListener('click', searchClick);


loadBiblioteca();
