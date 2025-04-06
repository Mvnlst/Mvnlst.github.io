let grid = document.getElementsByClassName("grid")[0];
let wrapper = document.getElementsByClassName("wrapper")[0];
let clear_button = document.getElementsByClassName("clear-mode")[0];
let title = document.getElementsByClassName("title")[0];
let navbar = document.getElementsByClassName("navbar")[0];
let container = document.getElementsByClassName("container")[0];
let game_tiles = [];
let edge_tiles = [];
let tiles = [];
let state = [];
let clear_mode = false;
let show_amount = false;

let width = 8;
let height = 8;
let edge_values = [3, 6, 2, 3, 1, 2, 3, 2, 6, 1, 2, 3, 1, 2, 3, 3, 2, 3, 2, 1, 3, 2, 6, 3];
let visible = [];

grid.style.gridTemplateColumns = `repeat(${width}, minmax(0, 1fr))`;
grid.style.gridTemplateRows = `repeat(${height}, minmax(0, 1fr))`;
grid.style.aspectRatio = `${width} / ${height}`;

container.style.transform = "scale(0)";
title.style.opacity = "0";

check_screen()
window.onresize=check_screen
build();
window.addEventListener('orientationchange', check_screen, true);

function homepage(){
    close_animation(2);
    setTimeout(redirect, 3500, "../index");
}

function levels(){
    close_animation(2);
    setTimeout(redirect, 3500, "levels");
}

function redirect(string){
    location.href = `../${string}.html`;
}

function check_screen() {
    if(wrapper.clientHeight *width / height < wrapper.clientWidth) {
        grid.classList.add("height");
        grid.classList.remove("width");
    } else {
        grid.classList.add("width");
        grid.classList.remove("height");
    }
    grid.style.fontSize = `${grid.clientWidth / (width * 2.5)}px`;
    title.style.fontSize = `${grid.clientWidth / (width * 2)}px`;
}

function opacitier(){
    title.style.opacity = "1";
}

function build() {
    setTimeout(grow, 1000, container);
    setTimeout(opacitier, 500);
    setTimeout(grow, 1500, clear_button);
    let corner = 0;
    let edge_index = 0;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let tile = document.createElement("div");
            tile.classList.add("tile");
            if(x % (width-1) == 0 && y % (height-1) == 0) {
                tile.classList.add("corner-tile");
                setTimeout(bend, 2000 + 1000, tile, corner++);
            }
            else if(x % (width-1) == 0 || y % (height-1) == 0) {
                tile.classList.add("edge-tile");
                visible.push(0);
                tile.innerHTML = `<p>${visible[edge_index]}/</p>${edge_values[edge_index]}`;
                edge_index++;
                edge_tiles.push(tile);

            }else {
                tile.classList.add("game-tile");
                let index = game_tiles.length
                tile.onclick = () => increment(index);
                tile.innerHTML = "<p class='shrink-text'></p><p class='grow-text'></p>";
                game_tiles.push(tile);
                state.push(0);
            }
            setTimeout(grow, Math.random() * 2000, tile);
            grid.appendChild(tile);
        }
    }
    tiles = document.getElementsByClassName("tile");
}

function grow(tile) {
    tile.style.transform = "scale(1)";
}

function bend(tile, corner) {
    switch (corner) {
        case 0:
            tile.style.borderTopLeftRadius = "100%";
            break;
        case 1:
            tile.style.borderTopRightRadius = "100%";
            break;
        case 2:
            tile.style.borderBottomLeftRadius = "100%";
            break;
        case 3:
            tile.style.borderBottomRightRadius = "100%";
            break;
    
        default:
            break;
    }
}

function alter_clear_mode(){
    clear_mode = !clear_mode;
    if(clear_mode){
        clear_button.style.backgroundColor = 'var(--edge-correct-color)';
    } else {
        clear_button.style.backgroundColor = 'var(--edge-wrong-color)';

    }
}
function increment(index) {
    let tile = game_tiles[index];
    let value = state[index];
    if(value == Math.max(width - 2, height - 2) || clear_mode) {
        if(value != 0) {
            tile.innerHTML = `<p class='shrink-text'>${value}</p><p class='grow-text'></p>`;
        } else {
            tile.innerHTML = `<p class='shrink-text'></p><p class='grow-text'></p>`;
        }
        value = 0;
        state[index] = value;
    } else {
        value = value + 1;
        if(value == 1){
            tile.innerHTML = `<p class='shrink-text'></p><p class='grow-text'>${value}</p>`;

        } else {
            tile.innerHTML = `<p class='shrink-text'>${value - 1}</p><p class='grow-text'>${value}</p>`;
        }

    }
    state[index] = value;
    update_board(index);
    finish();
}

function update_board(index){
    let column = index % (width-2);
    let row = Math.floor(index / (width - 2));

    let row_indices = [];
    for (let start = row*(width - 2); start < (row+1)*(width - 2); start++) {
        row_indices.push(start);
    }
    update_edge_visbility(width - 2 + row * 2, row_indices)
    update_edge_visbility(width - 1 + row * 2, row_indices.slice().reverse());
    let column_indices = [];
    for (let index = 0; index < (height - 2); index++) {
        column_indices.push(column + index * (height - 2));
    }
    update_edge_visbility(column, column_indices);
    update_edge_visbility(edge_tiles.length - (width - 2 - column), column_indices.slice().reverse());
}

function update_edge_visbility(edge_index, arr){
    let visited_values = [];
    let visible_game_tiles = [];
    let visible_amount = 0;
    let current_highest = 0;
    let invalid = false;
    for (let index = 0; index < arr.length; index++) {
        let value = state[arr[index]];
        if(visited_values.indexOf(value) == -1) {
            if(value > current_highest) {
                visible_amount++;
                current_highest = value;
                visible_game_tiles.push(arr[index]);
            }
            visited_values.push(value);
        } else if(value != 0) {
            invalid = true;
            break;
        }
    }
    let edge_tile = edge_tiles[edge_index];
    edge_tile.onmouseenter = () => showTiles(visible_game_tiles, edge_index);
    edge_tile.onmouseleave = () => hideTiles(visible_game_tiles, edge_index);
    if(invalid){
        edge_tile.style.backgroundColor = 'var(--edge-wrong-color)';
    }
    else if(visible_amount == edge_values[edge_index]){
        edge_tile.style.backgroundColor = 'var(--edge-correct-color)';
    } else {
        edge_tile.style.backgroundColor= 'var(--tile-color)'
    }
    visible[edge_index] = visible_amount;
    edge_tile.innerHTML = `<p>${visible[edge_index]}/</p>${edge_values[edge_index]}`;
    
}

function showTiles(tiles, edge_index) {
    tiles.forEach(index => {
        game_tiles[index].style.backgroundColor = "var(--lighter-background-color)";
    });
}

function hideTiles(tiles, edge_index) {
    tiles.forEach(index => {
        game_tiles[index].style.backgroundColor = "var(--tile-color)";
    });
}

function finish() {
    for (let index = 0; index < edge_values.length; index++) {
        if(edge_values[index] != visible[index]) return;
    }
    if(state.indexOf(0) == -1) {
        correct_animation(0);
        setTimeout(close_animation, 5000, 1)
        setTimeout(redirect, 7000, "levels");
    }
}

function correct_animation(index){
    if(index == game_tiles.length) return;
    game_tiles[index].style.backgroundColor = 'var(--edge-correct-color)';
    setTimeout(correct_animation, 1000/(index+1), index + 1);
}

function close_animation(speedup){
    for(let index = 0; index < tiles.length; index++){
        setTimeout(shrink, Math.random()*(2000/speedup), tiles[index]);
    }

    setTimeout(shrink, 3000/speedup, title);
    setTimeout(shrink, 2500/speedup, container);
    setTimeout(shrink, 2000/speedup, clear_button);
}
function shrink(tile) {
    tile.style.transform = "scale(0)";
}