(()=>{"use strict";var e={324:(e,o,s)=>{s.d(o,{q:()=>c});let c="aa0c97fdf12ac5c22d95200cf13d6a00"},138:(e,o,s)=>{const c=s(324).q;console.log("test");var t=[...document.getElementsByClassName("btn")];console.log(t);for(let e of t)e.addEventListener("click",(function(){console.log("click"),'background-image: url("./icons/checkedbox.svg");'!=e.style.cssText?(e.style.cssText='background-image: url("./icons/checkedbox.svg");',console.log("succes"),console.log(e.id),"music_genre_id=5"==e.id&&(console.log("get songs of this genre"),n(e.id))):'background-image: url("./icons/checkedbox.svg");'==e.style.cssText&&(e.style.cssText='background-image: url("./icons/square.svg");',console.log("idk",e.style.cssText))}));function n(e){fetch(`https://api.musixmatch.com/ws/1.1/track.search?f_${e}&apikey=${c}`).then((e=>e.json())).then((e=>console.log(e)))}n()}},o={};function s(c){var t=o[c];if(void 0!==t)return t.exports;var n=o[c]={exports:{}};return e[c](n,n.exports,s),n.exports}s.d=(e,o)=>{for(var c in o)s.o(o,c)&&!s.o(e,c)&&Object.defineProperty(e,c,{enumerable:!0,get:o[c]})},s.o=(e,o)=>Object.prototype.hasOwnProperty.call(e,o),s(138),s(324)})();