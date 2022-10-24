let productId = document.location.href.replace('http://127.0.0.1:5500/front/html/confirmation.html?=','');
document.getElementById("orderId").innerHTML = productId;