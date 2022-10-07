import { getCart } from './cart.js'
import { getCanape } from './api.js';

function createAppend(element,target){
    let created = document.createElement(element);
    target.appendChild(created);
};

async function fillCartPage() {
    //on recupere le panier
    const cartName = await getCart();
    console.log(cartName);
    // on boucle sur chaque canape pour modifier le DOM
    for (let id of  Object.keys(cartName)) {
        const canape= await getCanape(id);

        for (let color of Object.keys(cartName[id]) ){
             let article = document.createElement("article");
            article.classList.add("cart__item");
            article.dataset.id = id
            article.dataset.color = color

            let divImg = document.createElement('div')
            divImg.classList.add("cart__item__img")
            let img = document.createElement("img");
            img.src = canape.imageUrl;
            img.alt = canape.altText;
            divImg.appendChild(img);
           
            let divContent = document.createElement("div");
            divContent.classList.add("cart__item__content");

            let items=document.getElementById("cart__items");
            items.appendChild(article);
            article.appendChild(divImg);
            article.appendChild(divContent);
            console.log(article);

        }

       
       /*  let items = document.getElementById("cart__items");
        
        let div = document.createElement("div");
        
        let h2 = document.createElement("h2");
        let p = document.createElement("p");
        
        items.appendChild(article);
        
        article.appendChild(div);
        div.classList.add("cart__item__img");
        div.appendChild(img);
        img.src=canape.imageUrl;      
        div.classList.add('cart__item__img');
        article.insertAdjacentElement('beforeend',document.createElement("div"));
        let articleSecondDiv = document.querySelectorAll("article > div:not(.cart__item__img)");
        articleSecondDiv.forEach(element=>element.classList.add("cart__item__content"));
         */
        
    };
        
       /*  let cartItemContent = document.getElementsByClassName("cart__item__content");
        for (let i = 0; i < cartItemContent.length; i++) {
            createAppend("div",cartItemContent[i]);
            createAppend("div",cartItemContent[i]);
            };

        let cartItemContentFirstDiv = document.querySelectorAll(".cart__item__content > div:first-of-type");
        console.log(cartItemContentFirstDiv);    
        cartItemContentFirstDiv.forEach(element=>{
            element.classList.add("cart__item__content__description");
            element.nextElementSibling.classList.add("cart__item__content__settings");
            });
        let cartItemContentDescription = document.querySelectorAll(".cart__item__content__description");    
        cartItemContentDescription.forEach(element=>createAppend("h2",element));
        
         */
    };   

    fillCartPage();

    
    
    
        
        
    
   



//on récupere le panier


// on boucle sur ce panier
    // on va recuperer l'id du canapé et fair un appel à l'pi pour recuperer les données du canapé
    // on va boucler sur les couleurs du panier et y remplir la ligne correspondante pour chaque couleur
    // mettre en place le listener du changement de quantité
    // mettre le listener pour la suppresion du produit

    
// fonction de calcul du prix totall
