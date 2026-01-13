let typewrites = document.getElementsByClassName("typewriter");
let projects = [];

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
    projects = document.getElementsByClassName("project");
    for(let i = 0; i < projects.length; i++) {
        setTimeout(setOpacity, (i + 2) * 200, projects[i], 1);
        console.log(projects[i].offsetHeight);
        // projects[i].style.height = projects[i].offsetHeight + 'px';
    }
}

function resize() {
    for(let i = 0; i < projects.length; i++) {
        console.log(projects[i].offsetHeight);
        // projects[i].style.height = projects[i].offsetHeight + 'px';
    }
}
function setOpacity(block, value) {
    block.style.opacity = value;
}

function zoom(index) {
    for(let i = 0; i < projects.length; i++) {
        projects[i].style.height = projects[i].offsetHeight + '0px';
        if(i != index) {
            projects[i].style.opacity = 0;
            projects[i].style.height = '0px';
            projects[i].style.cursor = 'default';
        }
    }
    let projectList = document.getElementsByClassName("projects")[0];
    projectList.style.padding = '0px';
    projectList.style.gap = '0px';
    projects[index].classList.remove('project');
}