const root = document.querySelector(":root");

function createHandler(property="--angX", id="rotateX", unit="deg") {
    const initial = window.getComputedStyle(root,null).getPropertyValue(property);
    const input = document.querySelector(".helpers input#"+id);
    input.value = input.nextElementSibling.value = Number(initial.split(unit)[0])
    return (el) => {
        root.style.setProperty(property, el.value + unit);
        el.nextElementSibling.value = el.value;
    }
}

const changeAngleX = createHandler("--angX", "rotateX", "deg");
const changeAngleY = createHandler("--angY", "rotateY", "deg");
const changeX = createHandler("--X", "translateX", "px");
const changeY = createHandler("--Y", "translateY", "px");

