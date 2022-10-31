import {getCanapes} from './api.js'

//fonction de récuperation des canapés pour le remplissage de la page
async function fillCanapes(){
    // on recupere la liste des canapé de l'api
    const canapes = await getCanapes();
    //on affiche dynamiquement chaque canapé dans la page
    fillProducts(canapes);
}
fillCanapes()

//fonction de remplissage des éléments de la page d'accueil
function fillProducts(canapes) {
    //Pour chaque canapé,
    canapes.forEach(element => {
        //déclaration des variables pour les éléments du DOM
        let items = document.getElementById("items");
        let a = document.createElement("a");
        let article = document.createElement("article");
        let img = document.createElement("img");
        let h3 = document.createElement("h3");
        let p = document.createElement("p");

        //imbrication des éléments du HTML
        items.appendChild(a);
        a.appendChild(article);
        article.appendChild(img);
        article.appendChild(h3);
        article.appendChild(p);

        //attributions de valeurs pour les balises html de la page
        a.href ="product.html?id=" + element._id;
        img.src= element.imageUrl;
        img.alt = element.altTxt;
        h3.innerHTML = element.name;
        p.innerHTML = element.description;
    })   
};