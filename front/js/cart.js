const cartName = "panier";

//fonction de création du panier et stockage sur le localStorage
export function setItem(cart){
    localStorage.setItem(cartName, JSON.stringify(cart));
}

//fonction de récuperation du panier via le localStorage
export function getCart(){
    return JSON.parse(localStorage.getItem(cartName) || '{}')
};

//fonction de suppression du panier du localStorage (elle sera appelée à la soumission du panier après chaque commande)
export function deleteCart(){
    localStorage.removeItem(cartName);
}

//fonction d'ajout d'items dans le panier
export function addItem(order){

    let cart = getCart();
    const id = order.id
    const color = order.colorSelected
    const quantity = order.canapQuantity
    //on va verifier si le canapé existe dans le panier
    if(id in cart){
        //on vérifie si la couleur existe deja
        if (color in cart[id]){
            //on incrémente la quantité
            cart[id][color] += quantity
        }
        else{
            //sinon on crée la clé couleur avec sa quantité
            cart[id][color] = quantity
        }
    }
    else{
    //si le canapé n'est pas dans le panier, creer une clé pour le produit avec sa couleur et sa quantité
        cart[id] = {
            [color] : quantity
        }           
    }   
    //on remplit le panier
    localStorage.setItem(cartName, JSON.stringify(cart));
};