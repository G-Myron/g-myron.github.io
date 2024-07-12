
const span = document.querySelector("span");
const front = document.querySelector(".front");
const back = document.querySelector(".back");

front.append(span.cloneNode(true));
span.remove();

