let levels = document.getElementsByClassName("levels")[0];
let wrapper = document.getElementsByClassName("wrapper")[0];
let clear_button = document.getElementsByClassName("clear-mode")[0];
let title = document.getElementsByClassName("title")[0];
let level_tiles = [];
let tileIndex = 0;

for(let index = 0; index < 4; index++){
    let tile = document.createElement("div");
    tile.classList.add("level-tile");
    tile.innerHTML = `${index+1}`;
    tile.onclick = () => removeTiles(index, 0);
    levels.appendChild(tile);
    level_tiles.push(tile);
}
setTimeout(start, 100)

function start(){
    title.style.opacity = "1";
    setTimeout(grow, 500, 0);
}

function grow(index){
    if(index == level_tiles.lenght) return;
    level_tiles[index].style.transform = "scale(1)";
    setTimeout(grow, 500, index + 1);
}

function homepage(){
    window.location.href = "index.html";
}

function removeTiles(index, current){
    if(current == level_tiles.length){
        title.style.opacity = "0";
        level_tiles[index].style.opacity = "0";
        level_tiles[index].style.cursor = "default";
        setTimeout(redirect, 700, index + 1);
    }
    if(index != current) {
        level_tiles[current].style.transform = "scale(0)";
        setTimeout(removeTiles, 300, index, current+1);
    } else {
        setTimeout(removeTiles, 0, index, current+1);
    }
    
}

function redirect(level){
    location.href = `levels/level${level}.html`;
}