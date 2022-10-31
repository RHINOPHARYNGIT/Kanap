import { getCart,setItem,deleteCart } from './cart.js'
import { getCanape } from './api.js';
import { postOrder } from './api.js';

//fonction pour la suppression d'un article: un event listener sur le bouton supprimer supprime l'article dans le panier et supprime l'élément html
function deleteArticle() {
    let deleteButton = document.querySelectorAll(".deleteItem");
    deleteButton.forEach(element=>{
        element.addEventListener("click", function (e){
            let cart = getCart();
            e.preventDefault;
            let articleToDelete= element.closest('article');
            let articleToDeleteId=articleToDelete.dataset.id;
            let articleToDeleteColor=articleToDelete.dataset.color;
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

//fonction de calcul du total d'articles et du prix total
async function totalCartPrice () {
    //on récupere le panier
    const cart =  getCart();
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
                grandTotal+=totalPriceOfArticle;                               
            });                 
    };  
    document.getElementById("totalQuantity").innerHTML= canapeTotals;
    document.getElementById("totalPrice").innerHTML= grandTotal;
};

//fonction de mise à jour des quantités de canapé après modification
function quantityUpdate(){
    let quantitySelector = document.querySelectorAll("article input");
    for (let products of quantitySelector){
        //ici un event listener pour chaque changement sur l'input va etre crée 
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
            //recalcul du total lorsque le panier est mis à jour
            totalCartPrice();
        });   
    };        
};

//fonction pour le remplissage de la page panier
async function fillCartPage() {
    //on recupere le panier
    const cart = await getCart();
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
            let divItemContentSettingsQuantityInput = document.createElement("input");
            divItemContentSettingsQuantityInput.classList.add("itemQuantity");
            divItemContentSettingsQuantityInput.type = "number";
            divItemContentSettingsQuantityInput.name = "itemQuantity";
            divItemContentSettingsQuantityInput.min = "1";
            divItemContentSettingsQuantityInput.max = "100";
            divItemContentSettingsQuantityInput.value = cart[id][color];
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
        };
    };

    /*on appelle les fonctions avec event listeners pour la suppression et modification d'articles,
    puis la fonction qui calcule le total*/ 
    deleteArticle();
    quantityUpdate();
    totalCartPrice();

    //un event listener sur le bouton submit appelle la fonction de vérification
    let orderBtn = document.querySelector("form.cart__order__form");
    orderBtn.addEventListener('submit',function(e){
        e.preventDefault();
        checkInput();
    })

    //icicheckInput();
};   
fillCartPage();

//fonction qui récupère des données utilisateur saisies dans les inputs et retourne un objet "contact"
function getUserData (){
    let contact={};
    let formInputs = document.querySelectorAll(".cart__order__form__question input");
    formInputs.forEach(input=>{
        let inputName = input.id;
        let inputValue = input.value;
        contact[inputName] = inputValue;
    });
return contact;  
};



//définition des valeurs des messages d'erreur des inputs
const errorsMessages = {
    firstName : "Veuillez entrer un prénom conforme(texte uniquement)",
    lastName : "Veuillez entrer un nom conforme(texte uniquement)",
    address : "Veuillez entrer une adresse valide",
    city : "Veuillez entrer un nom de ville valide(sans chiffres)",
    email : "Veuillez entrer un email conforme(type exemple@mail.com)",
};

//fonction qui attribue et verifie les Regexp pour chaque input
function checkInput() {
    let inputRegexs = {
        firstName:/^[a-zA-Z ,.'-]+$/,
        lastName: /^[a-zA-Z ,.'-]+$/,
        address: /^[a-zA-Z0-9\s,.'-]{3,}$/,
        city: /^[a-zA-Z ,.'-]+$/,
        email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    };
    
    let inputs = document.querySelectorAll(".cart__order__form__question input");
    let errors = 0;
    //on boucle sur les inputs pour la validation.
    inputs.forEach(input=>{
        //attribution des valeurs de regexs pour les inputs
        let fieldRegex = inputRegexs[input.id];
        let errorDisplay=input.nextElementSibling;
        //en cas d'invalidité ou de valeur de champ vide, définition du message d'erreur
        if (!fieldRegex.test(input.value) || input.value ==""){
           errorDisplay.innerHTML =  errorsMessages[input.id]
           errors++
        }   
    });
    
    if(errors > 0) {
        return false
    }
    let contact = getUserData()
    let products = setArrayOfProductId()
    //on vérifie que le tableau de produits ne soit pas vide
    if (products.length == 0) {
        alert("Votre panier est vide")
        return false
    }
    //la commande au submit est validée, on appelle la fonction qui envoie la commande
    postOrder(contact,products)
};

//fonction de génération d'un tableau d'id uniques de produits à partir du panier
function setArrayOfProductId(){
    let cart = getCart();

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }
    
    let cartArray= Object.keys(cart);
      let products = cartArray.filter(onlyUnique);
      return products;
};