let typewrites = document.getElementsByClassName("typewriter");

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