(()=>{"use strict";var e={324:(e,t,n)=>{n.d(t,{q:()=>s});let s="aa0c97fdf12ac5c22d95200cf13d6a00"},138:(e,t,n)=>{const s=n(324).q;console.log("test");var o=[...document.getElementsByClassName("btn")];console.log(o);let a="";function r(){console.log("getting it, just a sec..."),fetch("https://persic.herokuapp.com/songs").then((e=>e.json())).then((e=>{console.log(e),function(e){let t=document.getElementById("suggestionsDiv"),n="";e.forEach((e=>{console.log(e.name,e.artist,e.genre,e.rating,e),n+=`<article class="songSuggestion">\n                <h3>${e.name}</h3>\n                <div class="info">\n                    <p>Artist: ${e.artist}</p>\n                    <p>Genre: ${e.genre}</p>\n                    <p>Rating: ${e.rating}</p>\n                </div>\n                <div class ="change">\n                    <button id="favorite" class="favorite" value="${e._id}"></button>\n                    <button id="used" class="used" value="${e._id}" ></button>\n                </div>\n            </article>`})),t.innerHTML=n}(e)}))}fetch(`https://api.musixmatch.com/ws/1.1/music.genres.get?apikey=${s}`).then((e=>e.json())).then((e=>{const t=e.message.body.music_genre_list;console.log(t),t.forEach((e=>{a+=`<option class="${e.music_genre.music_genre_id} value="1">${e.music_genre.music_genre_name}</option>`})),document.getElementById("genre0").insertAdjacentHTML("afterend",a)})),document.getElementById("form").addEventListener("submit",(e=>{e.preventDefault(),console.log("submit"),function(){let e=document.getElementById("lyric").value,t=`q_lyrics=${e}`,n=document.getElementById("genre").className,o=`f_music_genre_id=${n}`,a=document.getElementById("artist").value,c=`q_artist=${a}`;console.log(e,n,a),fetch(`https://api.musixmatch.com/ws/1.1/track.search?${t}&${o}&${c}&s_track_rating=desc&apikey=${s}`).then((e=>e.json())).then((e=>{let t=e.message.body.track_list;console.log(t),t.forEach((e=>{let t="";t=e.track.primary_genres.music_genre_list[0]?e.track.primary_genres.music_genre_list[0].music_genre.music_genre_name:"/",console.log(t);let n={artist:e.track.artist_name,genre:t,name:e.track.track_name,rating:e.track.track_rating};console.log(e.track.artist_name,t,e.track.track_name,e.track.track_rating),function(e){fetch("https://persic.herokuapp.com/songs",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then((e=>e.json())).then((e=>{console.log("song posted",e),r(),console.log("getting updated list of songs")}))}(n)}))}))}()})),r()}},t={};function n(s){var o=t[s];if(void 0!==o)return o.exports;var a=t[s]={exports:{}};return e[s](a,a.exports,n),a.exports}n.d=(e,t)=>{for(var s in t)n.o(t,s)&&!n.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n(138),n(324)})();