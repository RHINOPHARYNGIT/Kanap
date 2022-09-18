import {getCanapes} from './api.js'
console.log("ça marche !!")





//
async function fillCanapes(){
    // on recupre la liste des canapé de l'api
     const canapes = await getCanapes();
     console.log(canapes);
     console.log(canapes.length);
     fillProducts(canapes);
  

     //on affiche dynamiquement chaque canapé dans la page
    
}
fillCanapes()

function fillProducts(canapes) {
    canapes.forEach(element => {
        console.log(element)
        
        let items = document.getElementById("items");
        let a = document.createElement("a");
        let article = document.createElement("article");
        let img = document.createElement("img");
        let h3 = document.createElement("h3");
        let p = document.createElement("p");

        items.appendChild(a);
        a.appendChild(article);
        article.appendChild(img);
        article.appendChild(h3);
        article.appendChild(p);

        a.href ="product.html?id=" + element._id;
        img.src= element.imageUrl;
        img.alt = element.altTxt;
        h3.innerHTML = element.name;
        p.innerHTML = element.description;
        
       
        
    }
    
    )};
    
    
    

  
    
