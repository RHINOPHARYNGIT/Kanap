const url = "http://localhost:3000/api/products/"
const bob = "http://localhost:3000/api/"

export async function getCanapes(){
    const canapes = await fetch(url).then(res =>{ return res.json()}).then(data => data)
   
    return canapes
}
export async function getCanape(id){
    const urlCanape = url + id
    const canape = await fetch(urlCanape).then(res =>{ return res.json()}).then(data => data)
   
    return canape
}

export async function postOrder(contact,products){
    //const contact = getUserData ();
    //const products = setArrayOfProductId();
    const urlPost= url+"order";
    let bob= {
      contact,
      products
    }
    console.log(bob)
    console.log(typeof bob)
    const response = await fetch(urlPost, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(bob)
      });
    let result = await response.json();
    //alert(result.message)
    //return result
    
    let urlConfirmation="confirmation.html?="
    urlConfirmation+=result.orderId;
    window.location.replace(urlConfirmation)
    
    };
