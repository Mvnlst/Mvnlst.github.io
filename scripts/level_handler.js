let grid = document.getElementsByClassName("grid")[0];
let wrapper = document.getElementsByClassName("wrapper")[0];
let title = document.getElementsByClassName("title")[0];
let navbar = document.getElementsByClassName("navbar")[0];
let container = document.getElementsByClassName("container")[0];
let question = document.getElementsByClassName("container")[1];
let text_field = document.getElementsByClassName("text-field")[0];
let game_tiles = [];
let edge_tiles = [];
let tiles = [];
let state = [];
let show_amount = false;
let validity = [];
let visible = [];
let currentLevel = -1;
let lock = false;
let current_focus_edge_tile = -1;
let current_focus_game_tiles = [];
let hint_displayed = false;

grid.style.gridTemplateColumns = `repeat(${width}, minmax(0, 1fr))`;
grid.style.gridTemplateRows = `repeat(${height}, minmax(0, 1fr))`;
grid.style.aspectRatio = `${width} / ${height}`;
container.style.transform = "scale(0)";
question.style.transform = "scale(0)";
check_screen()
window.onresize=check_screen
build();
window.addEventListener('orientationchange', check_screen, true);


function setLevel(someLevel){
    currentLevel = someLevel;
}
function homepage(){
    close_animation(2);
    setTimeout(redirect, 2000, "../index");
}

function levels(){
    close_animation(2);
    setTimeout(redirect, 2000, "levels");
}

function redirect(string){
    if(currentLevel == "") currentLevel = 0;
    if(string == "play") {
        totalString = `${string}.html?level=${currentLevel + 1}`
        location.href = totalString;
    } else {
        location.href = `${string}.html`;
    }
}

function ask_question(){
    hint_displayed = !hint_displayed;
    if(hint_displayed){
        let index = select_hint();
        text_field.innerHTML = "there are no further hints for this puzzle.";
        if(index != -1)
            text_field.innerHTML = hints[index][2];
        text_field.style.fontSize = "3vw";
        setTimeout(opacitySetter, 400);
        question.firstElementChild.innerHTML = "x";
        lock = true;
        if(index != -1){
            putInFocus(hints[index][0], hints[index][3]);
        }
        else{
            putInFocus(-1 , []);
        }
    } else {
        text_field.style.opacity = "0";
        setTimeout(fontSizeSetter, 500);
        question.firstElementChild.innerHTML = "?";
        putOutFocus();
        lock = false;
    }
}

function putInFocus(game_tile_indices, other_tile_indices){
    hideTiles(current_focus_game_tiles, current_focus_edge_tile);
    if(game_tile_indices == -1) {
        for(let i = 0; i < tiles.length; i++){
            tiles[i].style.backgroundColor = 'var(--tile-color-out-focus)';
        }
        return;
    }
    for(let i = 0; i < tiles.length; i++){
        if(other_tile_indices.indexOf(i) == -1){
            tiles[i].style.backgroundColor = 'var(--tile-color-out-focus)';
        }
    }
    for(let i = 0; i < game_tile_indices.length; i++){
        game_tiles[game_tile_indices[i]].style.backgroundColor = 'var(--tile-color-focus)';

    }
}

function putOutFocus(){
    for(let i = 0; i < tiles.length; i++){
        tiles[i].style.backgroundColor = "var(--tile-color)";
    }
    for(let i = 0; i < edge_tiles.length; i++){
        if(validity[i] == 1){
            edge_tiles[i].style.backgroundColor = "var(--edge-correct-color)";
        }
    }
}





function opacitySetter(){
    text_field.style.opacity = "1";
}

function fontSizeSetter(){
    text_field.style.fontSize = "0px";
}

function select_hint(){
    for(let i = 0; i < hints.length; i++){
        let indices = hints[i][0];
        let values = hints[i][1];
        for(j = 0; j < indices.length; j++){
            if(state[indices[j]] != values[j]){
                return i;
            }
        }
    } 
    return -1;
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
    title.style.fontSize = `min(${document.body.clientHeight / (10)}px, ${grid.clientWidth / (10)}px`;
}

function opacitier(something){
    something.style.opacity = "1";
}

function build() {
    for(let i = 0; i < (width - 2)*(height-2); i++){
        state.push(0);
    }
    console.log(state.length)
    updateState();
    setTimeout(opacitier, 1000, container);
    setTimeout(grow, 1000, container);
    setTimeout(opacitier, 500, title);
    setTimeout(opacitier, 1500, question);
    setTimeout(grow, 1500, question);
    let corner = 0;
    let edge_index = 0;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let tile = document.createElement("div");
            tile.classList.add("tile");
            if(x % (width-1) == 0 && y % (height-1) == 0) {
                tile.classList.add("corner-tile");
                tile.onclick = () => hideTiles(current_focus_game_tiles, current_focus_edge_tile);
                setTimeout(bend, 1500, tile, corner++);
            }
            else if(x % (width-1) == 0 || y % (height-1) == 0) {
                tile.classList.add("edge-tile");
                visible.push(0);
                validity.push(0);
                addMouseStuff(tile, edge_index);
                tile.innerHTML = `<p>${visible[edge_index]}/</p>${edge_values[edge_index]}`;
                edge_index++;
                edge_tiles.push(tile);

            }else {
                tile.classList.add("game-tile");
                let index = game_tiles.length
                tile.onclick = () => {
                    hideTiles(current_focus_game_tiles, current_focus_edge_tile);
                    increment(index);
                }
                tile.innerHTML = "<p class='shrink-text'></p><p class='grow-text'></p>";
                game_tiles.push(tile);
            }
            setTimeout(grow, Math.random() * 1000, tile);
            grid.appendChild(tile);
        }
    }
    tiles = document.getElementsByClassName("tile");
}

function updateState(){
    // cookie stuff, need right naming to ensure compatability between levels
    // let cookies = document.cookie;
    // cookies = cookies.split("; ");
    // for(let i = 0; i < cookies.length; i++){
    //     let cookie = cookies[i].split("=");
    //     let state_index = cookie[0].split("state");
    //     if(state_index.length == 2){
    //         console.log(state_index[1], cookie[1])
    //         state[Number(state_index[1])] = Number(cookie[1]);
    //     }
    // }
    // console.log(state);
}

function addMouseStuff(edgeTile, index){
    edgeTile.onclick = () => hideTiles(current_focus_game_tiles, current_focus_edge_tile);
    edgeTile.onmouseenter = () => showTileInfo(index);
    edgeTile.onmouseleave = () => hideTileInfo(index);
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

function increment(index) {
    if(lock) return;
    let tile = game_tiles[index];
    let value = state[index];
    if(value == Math.max(width - 2, height - 2)) {
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
    // cookie stuff
    // document.cookie = `state${index}=${value}`;
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
    edge_tile.onclick = () => showTiles(visible_game_tiles, edge_index);
    edge_tile.onmouseenter = () => showTileInfo(edge_index);
    edge_tile.onmouseleave = () => hideTileInfo(edge_index);
    if(invalid){
        edge_tile.style.backgroundColor = 'var(--edge-wrong-color)';
        validity[edge_index] = 0;
    }
    else if(visible_amount == edge_values[edge_index]){
        edge_tile.style.backgroundColor = 'var(--edge-correct-color)';
        validity[edge_index] = 1;
    } else {
        edge_tile.style.backgroundColor= 'var(--tile-color)'
        validity[edge_index] = 0;
    }
    visible[edge_index] = visible_amount;
    edge_tile.innerHTML = `<p>${visible[edge_index]}/</p>${edge_values[edge_index]}`;
    
}

function showTiles(tiles, edge_index) {
    hideTiles(current_focus_game_tiles, current_focus_edge_tile);
    tiles.forEach(index => {
        game_tiles[index].style.backgroundColor = "var(--lighter-background-color)";
    });
    edge_tiles[edge_index].firstElementChild.style.fontSize = "100%";
    current_focus_edge_tile = edge_index;
    current_focus_game_tiles = tiles;
}

function showTileInfo(edge_index){
    if(!lock)
    edge_tiles[edge_index].firstElementChild.style.fontSize = "100%";
}

function hideTileInfo(edge_index){
    if(current_focus_edge_tile != edge_index)
    edge_tiles[edge_index].firstElementChild.style.fontSize = "0%";
}

function hideTiles(tiles, edge_index) {
    if(edge_index == -1) return;
    edge_tiles[edge_index].firstElementChild.style.fontSize = "0%";
    edge_tiles[edge_index].classList.add("edge_tile:hover");
    tiles.forEach(index => {
        game_tiles[index].style.backgroundColor = "var(--tile-color)";
    });
}

function finish() {
    for (let index = 0; index < edge_values.length; index++) {
        if(edge_values[index] != visible[index]) return;
    }
    if(validity.indexOf(0) != -1) return;
    if(state.indexOf(0) == -1) {
        lock = true;
        correct_animation(0);
        document.cookie = `level${currentLevel}=1; path/; SameSite=None; Secure;`;
        if(currentLevel == 4){
            setTimeout(redirect, (width - 2)*(height - 2)*100 + 2000, "what_is_rally");
        } else {
            setTimeout(redirect, (width - 2)*(height - 2)*100 + 2000, "play");
        }
    }
}

function correct_animation(index){
    if(index >= game_tiles.length) {
        close_animation(1)
        return;
    }
    game_tiles[index].style.backgroundColor = 'var(--edge-correct-color)';
    game_tiles[index].style.transform = "scale(1.2)"
    setTimeout(correct_animation, 100, index + 1);
}

function close_animation(speedup){
    for(let index = 0; index < tiles.length; index++){
        setTimeout(shrink, Math.random()*(1000), tiles[index]);
    }
    setTimeout(shrink, 800, title);
    setTimeout(shrink, 800, container);
    setTimeout(shrink, 800, question);
}

function shrink(tile) {
    tile.style.transform = "scale(0)";
}