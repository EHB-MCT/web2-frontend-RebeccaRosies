import * as C from "./credentials.js";
const apiKey = C.apiKey;

console.log("test");
const buttonsHTMLCollection = document.getElementsByClassName("btn");
var buttons = [...buttonsHTMLCollection];
console.log(buttons);


let htmlString = ""
/* const poetry = "q_lyrics=read&q_lyrics=dream&q_lyrics=thought&q_lyrics=write&q_lyrics=book"
const love = "q_lyrics=love&q_lyrics=heart&q_lyrics=forever&q_lyrics=stay&q_lyrics=darling" */
/* 
for (let button of buttons) {
    button.addEventListener("click", function () {
        console.log("click");
        if (button.style.cssText != 'background-image: url("./icons/checkedbox.svg");') {
            button.style.cssText = 'background-image: url("./icons/checkedbox.svg");'
            console.log("succes");
            if (button.className == "genre") {
                console.log("genre");
                console.log(button.id)
                getSongsByGenre(button.id);
            } else {
                console.log("theme");
                console.log(button.id)
                getSongsByLyrics(button.id);
            }

            //add songs to database 

        } else if (button.style.cssText == 'background-image: url("./icons/checkedbox.svg");') {
            button.style.cssText = 'background-image: url("./icons/square.svg");';
            console.log("idk", button.style.cssText)
            console.log(button.id)
            getSongsByGenre(button.id);
            // delete these songs from database
        };
    });
} */
/* const button = document.getElementById("btn3_1");
button.addEventListener("click", function(){console.log("click")}); */



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

document.getElementById('form').addEventListener('submit', e => {
    e.preventDefault();
    console.log("submit");
    //newSongs();
    getSongs();
})


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
                    "name" : track.track_name,
                    "artist" : track.artist_name,
                    "genre" : genreName,
                    "rating" : track.track_rating
                    }
                postSongs(song); 
                })
        })
}

function postSongs(song) {
    console.log("fetch is happening, be patient...");
    fetch('http://persic.herokuapp.com/songs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(song)
        })
        .then(response => response.json())
        .then(data => {
            console.log('songs posted', data);
        });


}


