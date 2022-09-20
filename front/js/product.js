import {getCanape, getCanapes} from './api.js'

//récupérer l'id fourni en parametre d'url en js
var url = new URL(window.location.href);
var id = url.searchParams.get("id");
console.log(id);

// on va récuperer les données de ce canape via l'api

getCanape(id);
console.log (getCanape(id));

//on va remplir les vides du html avec les données de ce canapé
async function fillCanape (){
    const canape= await getCanape(id);

    let itemImg = document.querySelector(".item__img");
    let img = document.createElement("img");
  
    itemImg.appendChild(img);
    img.src = canape.imageUrl;
    document.getElementById('title').innerHTML = canape.name;
    document.getElementById('price').innerHTML = canape.price;
    document.getElementById('description').innerHTML = canape.description;
    console.log(canape.colors);
    
    //une boucle ici pour creer les options de couleur pour chaque element
    canape.colors.forEach(element => {
        let option = document.createElement("option");
        let colors = document.getElementById('colors');
        
        colors.appendChild(option);
        option.innerHTML = element;
        option.value = element;
        console.log(option.value);
    });

}
fillCanape();

// on crée des fonctions permettant de recupérer les options ou inputs
function getColorValue () {
    let colorSelect = document.getElementById('colors');
    let colorSelected = colorSelect.options[colorSelect.selectedIndex].value;
    console.log (colorSelected); 
}

function getCanapCount () {
    let canapQuantity = document.getElementById('quantity').value;
   
    console.log (canapQuantity); 
}

//on va chercher a créer des objets qui représenteront les infos nécessaires au panier
class CanapToAdd {
    constructor(id, color, quantity) {
        this.id = id;
        this.color = color;
        this.quantity = quantity;
    }
};

//on crée un eventListener pour le submit des infos du canapé
const cartSubmit = document.getElementById('addToCart');
cartSubmit.addEventListener('click',(event) => {
    getColorValue();
    getCanapCount();
});
console.log(canape);

// ajouter le controle sur la soumission du formulaire et verifier que les bonnes infos sont saisies