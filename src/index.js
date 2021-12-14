import * as c from "credentials.js";
const apiKey = c.apiKey

function getSongs(){
    fetch(`https://api.musixmatch.com/ws/1.1/music.genres.get?apikey=${apiKey}`)
    // fetch(`https://api.musixmatch.com/ws/1.1/track.search?q_lyrics=vengabus&apikey=${apiKey}`)
    // fetch(`https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=15953433&apikey=${apiKey}`)
    .then(response => response.json())
    .then(data =>
        console.log(data))
}

getSongs();