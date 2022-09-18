const url = "http://localhost:3000/api/products/"

export async function getCanapes(){
    const canapes = await fetch(url).then(res =>{ return res.json()}).then(data => data)
   
    return canapes
}