const apiKey = ""

function getSongs(){
    fetch(`http://api.musixmatch.com/ws/1.1/music.genres.get?apikey=${apiKey}`)
    // fetch(`http://api.musixmatch.com/ws/1.1/track.search?q_lyrics=vengabus&apikey=${apiKey}`)
    // fetch(`http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=15953433&apikey=${apiKey}`)
    .then(response => response.json())
    .then(data =>
        console.log(data))
}

getSongs();