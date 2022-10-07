import { getCanape } from './api.js'
import { addItem } from './cart.js';

//récupérer l'id fourni en parametre d'url en js
var url = new URL(window.location.href);
var id = url.searchParams.get("id");

const cartSubmit = document.getElementById('addToCart');

// on va récuperer les données de ce canape via l'api
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
    });

    //on crée un eventListener pour le submit des infos du canapé

    cartSubmit.addEventListener('click',(event) => {
        event.preventDefault;
//au clic sur l'element, on genere un nouvel objet canapToAdd;   
        const colorSelected =  document.getElementById('colors').value;
        const canapQuantity = parseInt( document.getElementById('quantity').value);
        console.log (colorSelected, canapQuantity);
        const order = {id,colorSelected,canapQuantity};  
        // ajouter le controle sur la soumission du formulaire et verifier que les bonnes infos sont saisies
        if(colorSelected === '' || canapQuantity == 0 ){
            alert("Veuillez saisir tous les champs")
            return false
        };
        addItem(order);
    });
}
fillCanape();








