let texts = document.getElementsByClassName("text-field");
let wrapper = document.getElementsByClassName("wrapper")[0];
let title = document.getElementsByClassName("title")[0];

setTimeout(start, 100)

function start(){
    title.style.opacity = "1";
    setTimeout(showText, 500, 0);
}

function showText(index){
    if(index == texts.length)return;
    texts[index].style.opacity = "1";
    setTimeout(showText, 600, index + 1);
}

function homepage(){
    wrapper.style.opacity = "0";
    setTimeout(redirect, 1000)
}

function redirect(){
    window.location.href = "../index.html";

}
