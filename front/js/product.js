import { getCanape } from './api.js'
import { addItem } from './cart.js';

//récupération de l'id fourni en parametre d'url en js
var url = new URL(window.location.href);
var id = url.searchParams.get("id");

const cartSubmit = document.getElementById('addToCart');

//fonction de remplissage de la page produit
async function fillCanape (){
    //on récupere les données de ce canape via l'api
    const canape= await getCanape(id);

    //on remplit les vides du html avec les données de ce canapé
    let itemImg = document.querySelector(".item__img");
    let img = document.createElement("img");

    //définition des valeurs des attributs des éléments du DOM
    itemImg.appendChild(img);
    img.src = canape.imageUrl;
    document.getElementById('title').innerHTML = canape.name;
    document.getElementById('price').innerHTML = canape.price;
    document.getElementById('description').innerHTML = canape.description;
    
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
        const order = {id,colorSelected,canapQuantity};
        // ajouter le controle sur la soumission du formulaire et verifier que les bonnes infos sont saisies
        if(colorSelected === ''){ 
            alert("Veuillez saisir tous les champs")
            return false
        }
        if (!Number.isInteger(canapQuantity) || (!(canapQuantity>=1) || !(canapQuantity<=100))){               
            alert("Veuillez saisir un nombre entre 1 et 100")
            return false
        }
        //appel à la fonction d'ajout au panier
        addItem(order);
    });
}
fillCanape();








