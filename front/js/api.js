const url = "http://localhost:3000/api/products/"

export async function getCanapes(){
    const canapes = await fetch(url).then(res =>{ return res.json()}).then(data => data)
   
    return canapes
}
export async function getCanape(id){
    const urlCanape = url + id
    const canape = await fetch(urlCanape).then(res =>{ return res.json()}).then(data => data)
   
    return canape
}

//export async function postOrder(order){
 //   const urlPost= url+"order"
 //   const userOrderId = await post
//}