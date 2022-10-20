import { getCart,setItem } from './cart.js'
import { getCanape } from './api.js';

function deleteArticle() {
    let deleteButton = document.querySelectorAll(".deleteItem");
    deleteButton.forEach(element=>{
        element.addEventListener("click", function (e){
            let cart = getCart();
            console.log(cart);
            e.preventDefault;
            console.log(deleteButton);
            let articleToDelete= element.closest('article');
            console.log(articleToDelete);
            let articleToDeleteId=articleToDelete.dataset.id;
            let articleToDeleteColor=articleToDelete.dataset.color;
            console.log(cart);               
            delete cart[articleToDeleteId][articleToDeleteColor];                
            let keyToFind=Object.keys(cart[articleToDeleteId]);
            if (keyToFind.length===0){
                delete cart [articleToDeleteId];
            };              
            setItem(cart);
            articleToDelete.remove();            
            totalCartPrice();
            });
        });            
};

async function totalCartPrice () {
    //on récupere le panier
    const cart =  getCart();
    console.log(cart);
    //quantityUpdate();
    let grandTotal =0;
    let canapeTotals = 0
    //on boucle sur chaque article et on récupère les données du canapé
    //on va calculer un total par article et un grand total
    for (let id of  Object.keys(cart)) {       
            let q = Object.values(cart[id]);           
            const canape= await getCanape(id);
            q.forEach(element =>{
                let totalPriceOfArticle = 0;
                let priceOfArticle = canape.price;
                let canapeTotal = element;
                canapeTotals += canapeTotal
                totalPriceOfArticle += canapeTotal * priceOfArticle;
                console.log(totalPriceOfArticle);
                grandTotal+=totalPriceOfArticle;                               
            });                 
    };  
    console.log(grandTotal);
    console.log(canapeTotals);
    document.getElementById("totalQuantity").innerHTML= canapeTotals;
    document.getElementById("totalPrice").innerHTML= grandTotal;
};

function quantityUpdate(){
    totalCartPrice();
    let quantitySelector = document.querySelectorAll("article input");
    for (let products of quantitySelector){
        console.log(products);
        products.addEventListener('change',(event)=>{
            const cart = getCart(); 
            event.preventDefault;
            let article = products.closest('article');
            let quantityDisplay = article.querySelector(".cart__item__content__settings__quantity p");   
            quantityDisplay.innerHTML= 'Qté :';         
            const articleModifId = article.dataset.id;
            const articleModifColor = article.dataset.color;                      
            quantityDisplay = products.value;     
            cart[articleModifId][articleModifColor] = parseInt(products.value);
            //mettre a jour le panier
            setItem(cart);
            totalCartPrice();
        });   
    };        
};

async function fillCartPage() {
    //on recupere le panier
    const cart = await getCart();
    console.log(cart);
    // on boucle sur chaque canape pour modifier le DOM
    for (let id of  Object.keys(cart)) {
        const canape= await getCanape(id);
        for (let color of Object.keys(cart[id]) ){
            let article = document.createElement("article");
            article.classList.add("cart__item");
            article.dataset.id = id
            article.dataset.color = color;

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
            divItemContentSettingsQuantityP.innerHTML = "Qté :";
            console.log(cart[id][color]);
            let divItemContentSettingsQuantityInput = document.createElement("input");
            divItemContentSettingsQuantityInput.classList.add("itemQuantity");
            divItemContentSettingsQuantityInput.type = "number";
            divItemContentSettingsQuantityInput.name = "itemQuantity";
            divItemContentSettingsQuantityInput.min = "1";
            divItemContentSettingsQuantityInput.max = "100";
            divItemContentSettingsQuantityInput.value = cart[id][color];
            console.log(cart[id][color]);
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
            article.appendChild(divImg);
            article.appendChild(divContent);
            items.appendChild(article);
            //deleteArticle();
            //ajout des listeners sur les bouton de l'article
            console.log(article);
            console.log(article.dataset.color); 
        };
    };
    /*on appelle les fonctions avec event listeners pour la suppression et modification d'articles,
    puis la fonction qui calcule le total*/ 
    deleteArticle();
    quantityUpdate();
    totalCartPrice();
    
    
    //tu varecuperer le panier 
    //tu boucle pour sur les id du panier pour recupérer les canapees
    //calculer le total
    //et afficher ce total dans le html
    
};   
fillCartPage();

// appel au listener qui ecoute la soumission du formulaire
// on boucle sur ce panier
    // on va recuperer l'id du canapé et fair un appel à l'pi pour recuperer les données du canapé
    // on va boucler sur les couleurs du panier et y remplir la ligne correspondante pour chaque couleur
    // 
    // mettre le listener pour la suppresion du produit
// fonction de calcul du prix totall


/*ajoute un listener qui écoute la soumission du fomulaire:

vérification de la validité des données du formulaire

soumission de ce formulaire

récupération du traitement de l'api et redirection vers la page confirmation
*/
function getUserData (){
    let contact={};
    let formInputs = document.querySelectorAll(".cart__order__form__question input");
    formInputs.forEach(input=>{
        let inputName = input.id;
        let inputValue = input.value;
        contact[inputName] = inputValue;
    });
console.log(contact);    
};
getUserData();

//une fonction qui verifie la validité de chaque input, 

function inputErrorMsg () {
    
    let errorMsgsValues = {
        lastNameErrorMsg : "Veuillez entrer un nom conforme(texte uniquement)",
        firstNameErrorMsg : "Veuillez entrer un prénom conforme(texte uniquement)",
        addressErrorMsg : "Veuillez entrer une adresse valide(sans caractères spéciaux)",
        cityErrorMsg : "Veuillez entrer un nom de ville valide(sans chiffres)",
        emailErrorMsg : "Veuillez entrer un email conforme(type exemple@mail.com)",
    };

    let cartOrderFormQuestionP = document.querySelectorAll(".cart__order__form__question p");
    cartOrderFormQuestionP.forEach(element=> {
        console.log(element);
        let errorMsg= element.id;
        element.innerHTML = errorMsgsValues[errorMsg];
    });
    
};
inputErrorMsg();

function disableSubmit(disabled){
    let orderSubmit = document.querySelector("#order");
    if(disabled){
        orderSubmit.setAttribute("disabled",true);
    }
    else{
        orderSubmit.removeAttribute("disabled");
    }
};

function checkInput() {
    let inputRegexs = {
        firstName:/^[a-z ,.'-]+$/i,
        lastName: /^[a-z ,.'-]+$/i,
        address: /^[a-zA-Z0-9\s,.'-]{3,}$/,
        city: /^[a-z ,.'-]+$/i,
        email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    };
    let orderBtn = document.getElementById("order");
    orderBtn.addEventListener('click',function(e){
        e.preventDefault();
        let inputs = document.querySelectorAll(".cart__order__form__question input");
        inputs.forEach(input=>{
            let fieldRegex = inputRegexs[input.id];
            let errorDisplay=input.nextElementSibling;
            console.log(errorDisplay);
            let validity = 0
            
            if (!fieldRegex.test(input.value) || input.value ==""){
                console.log("mauvais");
                validity --
                
            }
            else {
                console.log("bon");
                errorDisplay.innerHTML="";
                validity ++
            }
            
            if (validity==5){
            console.log("5sur5")
            console.log(fieldRegex.test(input.value));
            disableSubmit(false);
            } 
            else{
            console.log(validity);
            orderBtn.setAttribute("disabled", true);
            disableSubmit(true)
            }           
        });
        
    });
    let form = document.querySelector(".cart__order__form");
    
    console.log(form);
    console.log(typeof form);
            
    
    
};
checkInput();

document
    .querySelectorAll(".cart__order__form__question")
    .forEach(input=>{
        input.addEventListener("change", function(e){
            checkInput();
        })})
    
    

/*
document.getElementbyId("order").addEventListenner('submit',(e) {
    e.prevent.default;
    submit order
    let cart = get cart();
    let cartIds = pour chaque ID different dans la liste des id retourner l id
    
    post l'objet order et array product ID
    recuperation de l id unique de commande
    window. location. replace("page_url")
}

*/
