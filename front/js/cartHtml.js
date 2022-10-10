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
            article.dataset.color = color;
            console.log(article.dataset.color);

            let divImg = document.createElement('div')
            divImg.classList.add("cart__item__img")
            let img = document.createElement("img");
            img.src = canape.imageUrl;
            img.alt = canape.altTxt;
            divImg.appendChild(img);
           
            let divContent = document.createElement("div");
            divContent.classList.add("cart__item__content");
            let divItemContentDescription = document.createElement("div");
            divItemContentDescription.classList.add("cart__item__content__description");
            let productName = document.createElement("h2");
            productName.innerHTML = canape.name;
            let colorContent = document.createElement("p");
            colorContent.innerHTML = article.dataset.color;
            let priceOfArticle = document.createElement("p");
            priceOfArticle.innerHTML = canape.price +"€";
            divItemContentDescription.appendChild(productName);
            divItemContentDescription.appendChild(colorContent);
            divItemContentDescription.appendChild(priceOfArticle)
            let divItemContentSettings = document.createElement("div");
            divItemContentSettings.classList.add("cart__item__content__settings");
            let divItemContentSettingsQuantity = document.createElement("div");
            divItemContentSettingsQuantity.classList.add("cart__item__content__settings__quantity");
            let divItemContentSettingsQuantityP = document.createElement("p");
            divItemContentSettingsQuantityP.innerHTML = "Qté :"+cartName[id][color];
            console.log(cartName[id][color]);
            let divItemContentSettingsQuantityInput = document.createElement("input");
            divItemContentSettingsQuantityInput.classList.add("itemQuantity");
            divItemContentSettingsQuantityInput.type = "number";
            divItemContentSettingsQuantityInput.name = "itemQuantity";
            divItemContentSettingsQuantityInput.min = "1";
            divItemContentSettingsQuantityInput.max = "100";
            divItemContentSettingsQuantityInput.value = cartName[id][color];
            console.log(cartName[id][color]);
            divItemContentSettingsQuantity.appendChild(divItemContentSettingsQuantityP);
            divItemContentSettingsQuantity.appendChild(divItemContentSettingsQuantityInput);
            let divContentSettingsDelete = document.createElement("div");
            divContentSettingsDelete.classList.add("cart__item__content__settings__delete");
            let divItemContentSettingsDeleteP = document.createElement("p");
            divItemContentSettingsDeleteP.innerHTML = "Supprimer";
            divItemContentSettingsDeleteP.classList.add("deleteItem");
            divContentSettingsDelete.appendChild(divItemContentSettingsDeleteP);
            divItemContentSettings.appendChild(divItemContentSettingsQuantity);
            divItemContentSettings.appendChild(divContentSettingsDelete);

            divContent.appendChild(divItemContentDescription);
            divContent.appendChild(divItemContentSettings);

            let items = document.getElementById("cart__items");
            items.appendChild(article);
            article.appendChild(divImg);
            article.appendChild(divContent);
            console.log(article);
            console.log(article.dataset.color);
           
        };
    };
    //mettre en place le listener du changement de quantité(pas encore abouti,pbm de selecteur et variable)
    function quantityUpdate(){
        let quantitySelector = document.querySelector('.itemQuantity');
        quantitySelector.addEventListener('input',(event)=>{
        event.preventDefault;
        let colorQuantity = quantitySelector.previousElementSibling.innerHTML-"Qté :";
        colorQuantity = quantitySelector.value;
        console.log (quantitySelector.value);
        console.log(colorQuantity);
        });
    };
    quantityUpdate();
    
};   
fillCartPage();
    
    
    



// on boucle sur ce panier
    // on va recuperer l'id du canapé et fair un appel à l'pi pour recuperer les données du canapé
    // on va boucler sur les couleurs du panier et y remplir la ligne correspondante pour chaque couleur
    // 
    // mettre le listener pour la suppresion du produit

    
// fonction de calcul du prix totall
