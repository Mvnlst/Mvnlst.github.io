let levels = document.getElementsByClassName("levels")[0];
let wrapper = document.getElementsByClassName("wrapper")[0];
let clear_button = document.getElementsByClassName("clear-mode")[0];
let title = document.getElementsByClassName("title")[0];
let level_tiles = [];
let tileIndex = 0;
let text_field = document.getElementsByClassName("text-field")[0];

let level_progress = false;
let completed_levels = [];
let cookies = document.cookie;
let split_up = cookies.split("; ");
for(let i = 0; i < split_up.length; i++){
    let strings = split_up[i].split("=");
    let completedLevel = Number(strings[0].charAt(strings[0].length - 1));
    if(Number(strings[1]) == 1){
        completed_levels.push(completedLevel);
    }
}

for(let index = 0; index < 5; index++){
    let tile = document.createElement("div");
    tile.classList.add("level-tile");
    tile.innerHTML = `${index}`;
    if(completed_levels.indexOf(index) != -1){
        level_progress = true;
        tile.style.backgroundColor = "var(--edge-correct-color)";
    }
    tile.onclick = () => removeTiles(index, 0);
    levels.appendChild(tile);
    level_tiles.push(tile);
}
setTimeout(start, 100)

function remove_cookies(){
    // retrieve all cookies
    let Cookies = document.cookie.split(';');
    // set past expiry to all cookies
    for (let i = 0; i < Cookies.length; i++) {
    document.cookie = Cookies[i] + "=; expires="+ new Date(0).toUTCString();
    }
    level_tiles.forEach(tile => {
        tile.style.backgroundColor = "var(--tile-color)";
    });
}




function start(){
    title.style.opacity = "1";
    setTimeout(text_field_reveal, 900);
    setTimeout(grow, 500, 0);
}

function text_field_reveal(){
    if(level_progress)
    text_field.style.opacity = "1";
}

function grow(index){
    if(index == level_tiles.length) return;
    if(index == level_tiles.lenght) return;
    level_tiles[index].style.transform = "scale(1)";
    setTimeout(grow, 100, index + 1);
}

function homepage(){
    window.location.href = "../index.html";
}

function removeTiles(index, current){
    if(current >= level_tiles.length){
        title.style.opacity = "0";
        text_field.style.opacity = "0";
        level_tiles[index].style.transition = "0.5s";
        level_tiles[index].style.transform = "scale(1.5)";
        level_tiles[index].style.opacity = "0";
        level_tiles[index].style.cursor = "default";
        setTimeout(redirect, 1500, index);
        return;
    }
    if(index != current) {
        level_tiles[current].style.transform = "scale(0)";
        setTimeout(removeTiles, 100, index, current+1);
    } else {
        setTimeout(removeTiles, 0, index, current+1);
    }
    
}

function redirect(level){
    location.href = `play.html?level=${level}`;
}