let typewrites = document.getElementsByClassName("typewriter");
let projects = [];
let projectList;
let go_back_button;
let current_zoom = -1;

function start_animation() {
    for (typewritten in typewrites) {
        typewriter_effect(0, typewrites[typewritten].innerHTML, typewritten);
    }
}

function typewriter_effect(show_until_char_index, text, block) {
    block.innerHTML = text.substring(0, show_until_char_index);
    if(show_until_char_index < text.length)
        setTimeout(typewriter_effect, 60, show_until_char_index + 1, text, block);
    else {
        type_pulse(0, 6, text, block);
    }
}

function type_pulse(counter, max, text, block) {
    if(counter % 2 == 0) {
        block.innerHTML = text + '|';
    } else {
        block.innerHTML = text;
    }
    if(counter < max || counter % 2 == 0) {
        setTimeout(type_pulse, 600, counter + 1, max, text, block);
    }
}

function redirect(string) {
    window.location.href=string + ".html";
}

function appearProjects() {
    projects = document.getElementsByClassName("projectid");
    go_back_button = document.getElementsByClassName("go-back")[0];
    projectList = document.getElementsByClassName("projects")[0];
    for(let i = 0; i < projects.length; i++) {
        setTimeout(setOpacity, (i + 2) * 200, projects[i], 1, i);
    }
}

function setOpacity(block, value, zIndex) {
    block.style.opacity = value;
    block.style.zIndex = zIndex;
}

function zoom(index) {
    if(current_zoom != -1) return;
    current_zoom = index;
    for(let i = 0; i < projects.length; i++) {
        if(i != index) {
            projects[i].style.height = projects[i].offsetHeight + 'px';
            projects[i].offsetHeight;
            projects[i].style.opacity = 0;
            projects[i].style.height = '0px';
        }
        projects[i].style.cursor = 'default';
    }
    projectList.style.gap = '0px';
    projects[index].classList.remove('project');
    projects[index].style.zIndex = 1000;
    projects[index].style.paddingLeft = '0px';
    projects[index].style.paddingRight = '0px';
    projects[index].children[1].style.gap = '1vw';
    projects[index].children[1].children[2].style.opacity = 1;

    setTimeout(showButton, 500);
}

function showButton() {
    go_back_button.style.cursor = 'pointer';
    go_back_button.style.opacity = 1;
}

function hideButton() {
    go_back_button.style.cursor = 'default';
    go_back_button.style.opacity = 0;
}

function zoomOut() {
    projects[current_zoom].classList.add('project');
    for(let i = 0; i < projects.length; i++) {
        if(i != current_zoom) {
            projects[i].style.height = 'auto';
            let correctHeight = projects[i].offsetHeight;
            projects[i].style.height = '0px';
            projects[i].offsetHeight;
            projects[i].style.height = correctHeight + 'px';
            projects[i].style.opacity = 1;
        } else {
            projects[i].style.paddingLeft = '3vw';
            projects[i].style.paddingRight = '3vw';
            projects[i].children[1].children[2].style.opacity = 0;
            projects[i].children[1].style.gap = '0px';
            projects[i].style.zIndex = i;
        }
        projects[i].style.cursor = 'pointer';
    }
    projectList.style.gap = '2vw';
    
    current_zoom = -1;

    hideButton();
}

