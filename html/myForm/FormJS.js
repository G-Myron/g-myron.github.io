const form = document.querySelector("#myform");

form.addEventListener("submit",(ev)=>{
    if(!form.checkValidity() && !validate()){
        ev.preventDefault();
    }
    form.classList.add("validate");
});

//form.onsubmit = validate;

///////////////////////////////////////-----CV file upload-----///////////////////////////////////////
const file = document.querySelector("#fileUp");
const fileButton = document.querySelector("#buttonin");
const output = document.querySelector("#showFile");

output.value = getFileName(file.value);
file.addEventListener("change", (e)=>{getFileName(file.value);})

function getFileName(path){
    if (path=="") return "Επιλέξτε ένα αρχείο βιογραφικού: ";
    fileButton.value = "Επιλογή άλλου αρχείου";
    output.innerHTML = `Επιλέξατε το αρχείο <strong>${path.split("\\").pop().split("/").pop()}</strong>.`;
}

///////////////////////////////////////-----Age calculation-----///////////////////////////////////////
const date = document.querySelector("#birthDate");
const agePlace = document.querySelector("#age");

date.addEventListener("change", calculateYears);

function calculateYears(){
    let age= Date.now() - new Date(date.value);     //in millisec
    age= Math.floor(age/ (1000*60*60*24*365.5));    //in years
    agePlace.style.backgroundColor = '#fff';
    if (age<1){
        alert('Μη έγκυρη ημερομηνία γέννησης');
        agePlace.value='';
        return false;
    }
    agePlace.value = age;
    if (age<18) agePlace.style.color = '#f44';
}

///////////////////////////////////////-----Datalist options-----///////////////////////////////////////
const select = document.querySelector("select");
const myTowns = 
`Αθήνα
Θεσσαλονίκη
Πάτρα
Γιάννενα
Κρήτη
Κομμοτηνή
Λάρισα
Βόλος
Κέρκυρα
Καλαμάτα
`.split("\n").sort();

for(let town of myTowns){
    let optionItem = document.createElement("Option");
    optionItem.value = town;
    if (town==="Αθήνα") optionItem.setAttribute("selected","selected");
    select.appendChild(optionItem);
}

///////////////////////////////////////-----Text Area max chars-----///////////////////////////////////////

const text = document.querySelector("#giveText");
const chars = document.querySelector("#charsLeft");

text.addEventListener("input",(e)=>{
    chars.innerHTML = `Μένουν ακόμα <span style="text-decoration: underline">${text.maxLength-text.value.length}</span> χαρακτήρες.`;
})

///////////////////////////////////////-----Validation checking-----///////////////////////////////////////

function validate(){
    //Same Paswords
    if (document.querySelector("#pass").value!==document.querySelector("#repass").value){
        alert("Η επαλήθευση κωδικού δεν έγινε σωστά");
        return false;
    }
    //Valid Age
    if(document.querySelector("#age").value<18){
        alert("Η φόρμα για ανάρτηση βιογραφικού αναφέρεται μόνο σε ενήλικες");
        document.querySelector("#myform").reset();
        return false;
    }

    return true;
}
