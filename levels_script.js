let grid = document.getElementsByClassName("grid")[0];
let wrapper = document.getElementsByClassName("wrapper")[0];
let clear_button = document.getElementsByClassName("clear-mode")[0];
let title = document.getElementsByClassName("title")[0];
let navbar = document.getElementsByClassName("navbar")[0];


let amountOfLevels = 4
let width = 4;
let height = 1;
let tileIndex = 0;

grid.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
grid.style.gridTemplateRows = `repeat(${height}, 1fr)`;
grid.style.aspectRatio = `${width} / ${height}`;

console.log(wrapper.clientHeight, wrapper.clientWidth)

check_screen()
window.onresize=check_screen
build();
window.addEventListener('orientationchange', check_screen, true);

function homepage(){
    window.location.href = "index.html";
}

function check_screen() {
    if(wrapper.clientHeight *width / height < wrapper.clientWidth) {
        grid.classList.add("height");
        grid.classList.remove("width");
    } else {
        grid.classList.add("width");
        grid.classList.remove("height");
    }
    let max = Math.max(height, width);
    let min = Math.min(height, width);
    if(wrapper.clientHeight > wrapper.clientWidth) {
       height = max;
       width = min;
       grid.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
        grid.style.gridTemplateRows = `repeat(${height}, 1fr)`;
        grid.style.aspectRatio = `${width} / ${height}`;
    } else {
        width = max;
        height = min;
        grid.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
        grid.style.gridTemplateRows = `repeat(${height}, 1fr)`;
        grid.style.aspectRatio = `${width} / ${height}`;
    }
    grid.style.fontSize = `${grid.clientWidth / (width * 2)}px`;
}

function build() {
    for(let amount = 0; amount < amountOfLevels; amount++){
        let level_tile = document.createElement("div");
        level_tile.classList.add("level-tile");
        level_tile.onclick = () => {
            window.location.href = `level${amount+1}.html`;
        }
        grid.appendChild(level_tile);
    }
}

function create_empty_tile(){
    let empty_tile = document.createElement("div");
    empty_tile.classList.add("empty-tile");
    grid.appendChild(empty_tile);
    tileIndex++;
}


function grow(tile) {
    tile.style.transform = "scale(1)";
}

function finish() {
    for (let index = 0; index < edge_values.length; index++) {
        if(edge_values[index] != visible[index]) return;
    }
    if(state.indexOf(0) == -1) {
        close_animation();
    }
}

function close_animation(){
    for(let index = 0; index < tiles.length; index++){
        setTimeout(shrink, Math.random()*2000, tiles[index]);
    }
}
function shrink(tile) {
    tile.style.transform = "scale(0)";
}