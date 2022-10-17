const cartName = "panier";


export function addItem(order){

    let cart = getCart();
    const id = order.id
    const color = order.colorSelected
    const quantity = order.canapQuantity
    //on va verifier si le canapé existe dans le panier
    if(id in cart){
        // => on va verifier si la couleur existe deja
        if (color in cart[id]){
             //on va incremeter la quantite
            cart[id][color] += quantity
        }else{
             // on va juste creer la clé couleur avec sa quantité
            cart[id][color] = quantity
        }
    }else{
        // on va creer une clé pour le produit avec sa couleur et sa quentite
        cart[id] = {
                    [color] : quantity
                } 
           
    }
    
    //remplir la cart
    localStorage.setItem(cartName, JSON.stringify(cart));
};

export function getCart(){
    return JSON.parse(localStorage.getItem(cartName) || '{}')
};
export function setItem(cart){
    localStorage.setItem(cartName, JSON.stringify(cart));
}

/* {
    1231321: {
        'green' :3,
        'blue' :2
    },
    '456464':{
        'red' :1
    }
} */

