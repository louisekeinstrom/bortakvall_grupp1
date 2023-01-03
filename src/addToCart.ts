export { }
import "./interfaces"
import "./fetch"
import "./popup"
import { fetchProducts } from "./fetchWithInterface"
import { IProductsExt } from "./interfaces";

const cartEL = document.querySelector(".cart-product")
const cartIconEl = Array.from(document.querySelectorAll(".cart-icon-container"))
let cartItem = JSON.parse(localStorage.getItem("products_in_cart"))

console.log(cartItem)

// array för mängd produkter i cart
let amountOfProductsInCart = cartItem.map((product:number) => {
    return product.order_items.qty
})

// array för priserna
let totalPrice = cartItem.map((product:any) => {
    return product.price
})

//räknar ihop priset på varorna
let sum = 0

for (let i = 0; i < totalPrice.length; i++) {
    sum += totalPrice[i] * amountOfProductsInCart[i];
}

// funktion för att synligt rendera ut produkten i varukorgen   
    cartItem.forEach((product:any) => {
    cartEL!.innerHTML += `
    <div>
        <img src="https://bortakvall.se${product.images.large}" alt="Produkt från Bortakväll" class="img-fluid mh-sm-50 m-3 popup-img" />
            <h2 class="candy-name mt-3">${product.name}</h2>
				<p>Pris <span>${product.price}</span> kr</p>
                    <div>
                        <p class ="increase">+</p>
                        <p class ="showAmount">${product.order_items.qty}</p>
                        <p class ="decrease">-</p>
					</div>
    </div>
    `   
   });

   document.querySelector(".total-amount").innerHTML += `Totalt: ${sum} kr`

   const increaseEl = Array.from(document.querySelectorAll(".increase"))
   console.log(increaseEl)

   const decreaseEl = Array.from(document.querySelectorAll(".decrease"))

   console.log(decreaseEl)


   let amountOfProducts = cartItem.map((product:number) => {
    return product.order_items.qty
   })
   console.log(amountOfProducts)

//    för att öka produkter i varukorg
increaseEl.forEach(()=> {
    addEventListener("click", (product) => {
    console.log("yay u increased")
    product.order_items.qty[i]++
    console.log(product.order_items.qty)
    })
})
   //    för att minska produkter i varukorg
   decreaseEl!.forEach((e) => {
    e.addEventListener("click", () => {
    console.log("yay u decreased")
    })
   })


//    productsInCart.map(productInCart => {

//     // rendering OM produkten är slut i stock
//     if(product.id === productInCart.id && productInCart.stock_status === "outofstock"){
//         increaseEl = 'disabled'
//         alert("Finns ej fler i lager") 

//         return increaseEl

//         // rendering om produkten finns i lager och redan är i varukorgen
//     }else if(){

//     }else(product.id === productInCart.id){
        
//     }

// })