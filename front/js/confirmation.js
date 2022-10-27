//on récupère l'order Id 
let orderId = document.location.href.replace('http://127.0.0.1:5500/front/html/confirmation.html?=','');

//on l'implémente dans la balise
document.getElementById("orderId").innerHTML = orderId;