import * as C from "./credentials.js";
const apiKey = C.apiKey;

console.log("test");
const buttonsHTMLCollection = document.getElementsByClassName("btn");
var buttons = [...buttonsHTMLCollection];
console.log(buttons);

for (let button of buttons){
    button.addEventListener("click", function(){console.log("click");    
                                        if (button.style.cssText != 'background-image: url("./icons/checkedbox.svg");'){
                                            button.style.cssText = 'background-image: url("./icons/checkedbox.svg");'
                                            console.log("succes");
                                            
                                            console.log(button.id)
                                            if(button.id == "music_genre_id=5" ){  
                                                console.log("get songs of this genre");
                                                getSongs(button.id);
                                            }
                                         } else if (button.style.cssText == 'background-image: url("./icons/checkedbox.svg");') {
                                            button.style.cssText = 'background-image: url("./icons/square.svg");';
                                            console.log("idk",button.style.cssText)  
                                       }; 
                                    });
}
/* const button = document.getElementById("btn3_1");
button.addEventListener("click", function(){console.log("click")}); */


function getSongs(genreId){
   // fetch(`https://api.musixmatch.com/ws/1.1/music.genres.get?apikey=${apiKey}`)
    fetch(`https://api.musixmatch.com/ws/1.1/track.search?f_${genreId}&apikey=${apiKey}`)
    // fetch(`https://api.musixmatch.com/ws/1.1/track.search?q_lyrics=vengabus&apikey=${apiKey}`)
    // fetch(`https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=15953433&apikey=${apiKey}`)
    .then(response => response.json())
    .then(data =>
        console.log(data))
}


