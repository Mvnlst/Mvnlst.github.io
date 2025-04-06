let menu_items = document.getElementsByClassName("menu-item");
let title = document.getElementsByClassName("title")[0];

setTimeout(appear, 1000, 0);

function appear(index){
    if(index == menu_items.length) return;
    menu_items[index].style.opacity = "1";
    setTimeout(appear, 300, index+1);
}


function levels(){
    disappear(-1, 0);
}

function how_to_play(){
    disappear(-1, 1);
}

function what_is_rally(){
    disappear(-1, 2);
}

function disappear(index, skip){
    if(index == menu_items.length){
        menu_items[skip].style.transform = "scale(2)";
        menu_items[skip].style.opacity = "0";
        setTimeout(redirect, 800, skip);
        return;
    }
    if(index == -1){
        title.style.color = "var(--background-color)";
        setTimeout(disappear, 500, index + 1, skip);
    } else {
        if(index != skip) {
            menu_items[index].style.opacity = "0";
            setTimeout(disappear, 300, index + 1, skip);

        } else {
            setTimeout(disappear, 0, index + 1, skip);
        }
    }
}

function redirect(index){
    switch (index) {
        case 0:
            window.location.href="pages/levels.html";
            break;
        case 1:
            window.location.href="pages/how_to_play.html";
            break;
        case 2:
            window.location.href="pages/levels.html";
            break;
        default:
            break;
    }
}

