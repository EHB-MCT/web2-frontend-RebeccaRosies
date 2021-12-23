import * as C from "./credentials.js";
const apiKey = C.apiKey;

console.log("test");
const buttonsHTMLCollection = document.getElementsByClassName("btn");
var buttons = [...buttonsHTMLCollection];
console.log(buttons);

let htmlString = ""

/* function getSongsByGenre(genreId) {
    // fetch(`https://api.musixmatch.com/ws/1.1/music.genres.get?apikey=${apiKey}`)
    fetch(`https://api.musixmatch.com/ws/1.1/track.search?${genreId}&s_track_rating=desc&apikey=${apiKey}`)
        // fetch(`https://api.musixmatch.com/ws/1.1/track.search?q_lyrics=vengabus&apikey=${apiKey}`)
        // fetch(`https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=15953433&apikey=${apiKey}`)
        .then(response => response.json())
        .then(data =>
            console.log(data))
}; */

/* function getSongsByLyrics(lyrics) {
    fetch(`https://api.musixmatch.com/ws/1.1/track.search?${lyrics}&s_track_rating=desc&apikey=${apiKey}`)
        .then(response => response.json())
        .then(data =>
            console.log(data))
}; */

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

                console.log(track.track.artist_name,genreName,track.track.track_name,track.track.track_rating)
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
            body:  JSON.stringify(song)
        })
        .then(response => response.json())
        .then(data => {
            console.log('song posted', data);
            databaseSongs();//get all the songs in the database (after having added the new ones)
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

//displaying all data
function displayAll(data){
    let suggestionsDiv = document.getElementById('suggestionsDiv')
    let htmlString = ""

    if (data){
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
                        <button id="favorite" class="favorite" value="${song._id}"></button>
                        <button id="used" class="used" value="${song._id}" ></button>
                    </div>
                </article>`
        });
        suggestionsDiv.innerHTML = htmlString;
    } else{ //in case of reset 
        suggestionsDiv.innerHTML = "";
    }
}


//reset button
document.getElementById("resetSongs").addEventListener("click", e => {
    e.preventDefault();
    console.log("reset");
    resetSongs();
})
//reset function
function resetSongs(){
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
            console.log("these are the favorites:");
            console.log(data);
            displayFavs(data); 
        });
}
favSongs();
function displayFavs(data){

    let favoritesDiv = document.getElementById('favoritesDiv')
    let htmlString = ""

    data.forEach(song => {
        console.log(song.name, song.artist, song.genre, song.rating, song)
        htmlString +=
            `<article class="songSuggestion favoriteSong">
                <h3>${song.name}</h3>
                <div class="info">
                    <p>Artist: ${song.artist}</p>
                    <p>Genre: ${song.genre}</p>
                    <p>Rating: ${song.rating}</p>
                </div>
                <div class ="change">
                    <button id="favorite" class="favorite" value="${song._id}"></button>
                    <button id="used" class="used" value="${song._id}" ></button>
                </div>
            </article>`
    });
    favoritesDiv.innerHTML = htmlString;

}

