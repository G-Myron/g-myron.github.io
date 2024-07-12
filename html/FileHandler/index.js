const file = document.querySelector("#fileUp");
const fileButton = document.querySelector("#buttonin");
const output = document.querySelector("#showFile");
const outTxt = document.querySelector("#myFileText");
const outByte = document.querySelector("#myFileBytes");

output.value = getFileName(file.value);
file.addEventListener("change", (e)=>{getFileName(file.value); readSingleFile(e);})

function getFileName(path){
    if (path=="") return "Επιλέξτε ένα αρχείο από τον υπολογιστή σας: ";
    fileButton.value = "Επιλογή άλλου αρχείου";
    output.innerHTML = `Επιλέξατε το αρχείο <strong>${path.split("\\").pop().split("/").pop()}</strong>.`;
}

function readSingleFile(e) {
    var file = e.target.files[0]; //File Object
    var [reader1, reader2] = [new FileReader(),new FileReader()];
    var filesContent;

    reader1.readAsArrayBuffer(file);
    reader2.readAsText(file);

    reader1.onload = function() {
        console.log(reader1);

        filesContent = buf2hex(new Uint8Array(reader1.result));
        outByte.innerHTML = filesContent;
    };

    reader2.onload = function() {
        outTxt.innerHTML = reader2.result;
    };
}

function printInOutdiv(bytes, text){
}

function buf2hex(buffer) { // buffer is an ArrayBuffer
    return [...new Uint8Array(buffer)].map(x => x.toString(16).toUpperCase().padStart(2,"0")).join(' ');
  }

