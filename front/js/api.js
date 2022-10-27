import { deleteCart } from "./cart.js"

const url = "http://localhost:3000/api/products/"
const abc = "http://localhost:3000/api/"

//fonction de requête de l'api qui retourn l'ensemble des canapes
export async function getCanapes(){
    const canapes = await fetch(url).then(res =>{ return res.json()}).then(data => data)
   
    return canapes
}

//fonction de requête de l'api en fonction d'un id de canape, l'api retourne un objet canape
export async function getCanape(id){
    const urlCanape = url + id
    const canape = await fetch(urlCanape).then(res =>{ return res.json()}).then(data => data)
   
    return canape
}

//fonction d'envoi des informations utilisateur et tableau de produits à l'api
export async function postOrder(contact,products){
  const urlPost= url+"order";
  let orderObject= {
    contact,
    products
  }
  const response = await fetch(urlPost, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(orderObject)
    });
  //l'api retourne l'objet contact et tableau produit ainsi qu'un orderID unique
  let result = await response.json();
  
  //l'orderId est passée à l'url de la page confirmation, redirection vers la page confirmation
  let urlConfirmation="confirmation.html?="
  urlConfirmation+=result.orderId;
  window.location.replace(urlConfirmation)
  //une fois sur la page confirmation, suppression du panier d'origine depuis le localStorage
  deleteCart();   
};
