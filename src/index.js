import * as C from "./credentials.js";
const apiKey = C.apiKey;
let favorite = document.getElementsByClassName('favorite');
let favorited = document.getElementsByClassName('favorited');

console.log("test");
const buttonsHTMLCollection = document.getElementsByClassName("btn");
var buttons = [...buttonsHTMLCollection];
console.log(buttons);

let htmlString = ""

//prepare the form (get possible genres, artists and provide space to put lyrics)
function getGenres() {
    fetch(`https://api.musixmatch.com/ws/1.1/music.genres.get?apikey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const genreList = data.message.body.music_genre_list;
            console.log(genreList);

            genreList.forEach(genre => {
                htmlString += `<option class="${genre.music_genre.music_genre_id} value="1">${genre.music_genre.music_genre_name}</option>`;
            });
            document.getElementById("genre0").insertAdjacentHTML("afterend", htmlString)
        })
};

getGenres();

//sumbit the form
document.getElementById('form').addEventListener('submit', e => {
    e.preventDefault();
    console.log("submit");
    //newSongs();
    getSongs();
})
//get songs from musixmatch api with form values
function getSongs() {
    let lyric = document.getElementById('lyric').value;
    let lyricparam = `q_lyrics=${lyric}`;
    let genreId = document.getElementById('genre').className;
    let genreparam = `f_music_genre_id=${genreId}`;
    let artist = document.getElementById('artist').value;
    let artistparam = `q_artist=${artist}`;
    console.log(lyric, genreId, artist);
    fetch(`https://api.musixmatch.com/ws/1.1/track.search?${lyricparam}&${genreparam}&${artistparam}&s_track_rating=desc&apikey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            let trackList = data.message.body.track_list;
            console.log(trackList);
            trackList.forEach(track => {
                let genreName = ""
                if (track.track.primary_genres.music_genre_list[0]) {
                    genreName = track.track.primary_genres.music_genre_list[0].music_genre.music_genre_name
                } else {
                    genreName = "/";
                }
                console.log(genreName);
                let song = {
                    "artist": track.track.artist_name,
                    "genre": genreName,
                    "name": track.track.track_name,
                    "rating": track.track.track_rating
                }

                console.log(track.track.artist_name, genreName, track.track.track_name, track.track.track_rating)
                postSong(song);
            })
        })
}

//post songs gotten from musixmatch api to my database
function postSong(song) {
    fetch('https://persic.herokuapp.com/songs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(song)
        })
        .then(response => response.json())
        .then(data => {
            console.log('song posted', data);
            databaseSongs(); //get all the songs in the database (after having added the new ones)
            console.log("getting updated list of songs")
        });
}

//get all the songs in the database
function databaseSongs() {
    console.log("getting it, just a sec...");
    fetch('https://persic.herokuapp.com/songs')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayAll(data);
        });
}
databaseSongs(); //get all the songs in the database when loading the page

//display suggested songs
function displayAll(data) {
    let suggestionsDiv = document.getElementById('suggestionsDiv')
    let htmlString = ""

    if (data) {
        data.forEach(song => {
            console.log(song.name, song.artist, song.genre, song.rating, song)
            htmlString +=
                `<article class="songSuggestion">
                    <h3>${song.name}</h3>
                    <div class="info">
                        <p>Artist: ${song.artist}</p>
                        <p>Genre: ${song.genre}</p>
                        <p>Rating: ${song.rating}</p>
                    </div>
                    <div class ="change">
                        <button id="favorite${song._id}" class="favorite" value="${song._id}"></button>
                        <button id="used" class="used" value="${song._id}" ></button>
                    </div>
                </article>`;
        });
        suggestionsDiv.innerHTML = htmlString;

        //eventlisteners vr favorite
        for (let i = 0; i < favorite.length; i++) {
            favorite[i].addEventListener('click', e => {
                e.preventDefault();
                let id = favorite[i].value;
                document.getElementById(`favorite${id}`).style.backgroundImage = "url(../docs/icons/filledHeart.svg)";
                console.log(id, data);
                saveToFavSongs(id, data);
            })
        }
    } else { //in case of reset 
        suggestionsDiv.innerHTML = "";
    }
}


function saveToFavSongs(id, songs) {
    console.log("get from songs database with id & save to favSongs database")
    let song = {}
    songs.forEach(data => {
        if (id == data._id) {
            song = {
                "artist": data.artist,
                "genre": data.genre,
                "name": data.name,
                "rating": data.rating
            }
        }
    })
    console.log(song)
    fetch(`https://persic.herokuapp.com/songs/favorites`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(song)
        })
        .then(response => response.json())
        .then(data => {
            console.log('songs posted to favSongs', data);
            favSongs(); //get all the favorites songs in the database (after having added the new ones)
            console.log("getting updated list of favSongs")
        });
}


//reset button
document.getElementById("resetSongs").addEventListener("click", e => {
    e.preventDefault();
    console.log("reset");
    resetSongs();
})


//reset button
document.getElementById("resetSongs").addEventListener("click", e => {
    e.preventDefault();
    console.log("reset");
    resetSongs();
})
//reset function
function resetSongs() {
    console.log("reset function");
    fetch(`https://persic.herokuapp.com/songs`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            console.log(`All songs deleted`);
            //setTimeout(displayAll, 1000)
            displayAll();
        });
}


//get favorites from database
function favSongs() {
    console.log("getting the favs, just a sec...");
    fetch('https://persic.herokuapp.com/songs/favorites')
        .then(response => response.json())
        .then(data => {
            //console.log("these are the favorites:");
            //console.log(data);
            displayFavs(data);
        });
}
favSongs();
//display favorites 
function displayFavs(data) {

    let favoritesDiv = document.getElementById('favoritesDiv')
    let htmlString = ""

    data.forEach(song => {
        //console.log(song.name, song.artist, song.genre, song.rating, song)
        htmlString +=
            `<article class="songSuggestion favoriteSong">
                <h3>${song.name}</h3>
                <div class="info">
                    <p>Artist: ${song.artist}</p>
                    <p>Genre: ${song.genre}</p>
                    <p>Rating: ${song.rating}</p>
                </div>
                <div class ="change">
                    <button id="favorited${song._id}" class="favorited" value="${song._id}"></button>
                    <button id="used" class="used" value="${song._id}" ></button>
                </div>
            </article>`
    });
    favoritesDiv.innerHTML = htmlString;

    for (let i = 0; i < favorited.length; i++) {
        favorited[i].addEventListener('click', e => {
            e.preventDefault();
            let id = favorited[i].value;
            document.getElementById(`favorited${id}`).style.backgroundImage = "url(../docs/icons/heart.svg)";
            console.log(id, data);
            deleteFav(id);
        })
    }
}

function deleteFav(id) {
    console.log("delete this song");
    fetch(`https://persic.herokuapp.com/songs/favorites/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            console.log(`song deleted with id: ${id}`, data);
        });
}