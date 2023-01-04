export { }
import "./interfaces"
import "./fetch"
import "./popup"
import { fetchProducts } from "./fetchWithInterface"
import { IProductsExt } from "./interfaces";

const addToCartBtnEl = document.querySelector(".popup-add-to-cart")
const cartEL = document.querySelector(".cart-product")
const cartIconEl = Array.from(document.querySelectorAll(".cart-icon-container"))
let cartItem = JSON.parse(localStorage.getItem("products_in_cart") ?? '[]')

const wholeCart = document.querySelector('.shopping-cart-roll-down')

const cartBtn = document.querySelector(".shopping-cart-btn"); //knapp för cart
const cartMenu = document.querySelector(".cart-product"); //cart

console.log(cartItem)

// funktion för totala summan
let totalSum = () => {
// array för mängd produkter i cart
let amountOfProductsInCart = cartItem.map((product:any) => {
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

document.querySelector(".total-amount")!.innerHTML += `Totalt: ${sum} kr`

}
// funktion för att synligt rendera ut produkten i varukorgen   
let renderIntoCart = () => {
    cartItem = JSON.parse(localStorage.getItem("products_in_cart") ?? '[]')    
cartItem.forEach((product:any) => {
    cartEL!.innerHTML += `
    <div>
        <img src="https://bortakvall.se${product.images.large}" alt="Produkt från Bortakväll" class="img-fluid mh-sm-50 m-3 popup-img" />
            <h2 class="candy-name mt-3">${product.name}</h2>
				<p>Pris <span>${product.price}</span> kr</p>
                    <div class="product-${product.name}">
                        <p data-current-product-id="${product.id}" class="increase">+</p>
                        <p class="showAmount">${product.order_items.qty}</p>
                        <p data-current-product-id="${product.id}" class="decrease">-</p>
					</div>
    </div>
    `  
    return cartItem 
})
}
renderIntoCart();

(wholeCart as HTMLElement).addEventListener('click', (e:any) => {
    cartItem = JSON.parse(localStorage.getItem("products_in_cart") ?? '[]')  
    
    const currentProductId = Number((e.target as HTMLElement).dataset.currentProductId)
    const currentProduct = cartItem.find((product:any) => product.id === currentProductId) 
   
    if(e.target === document.querySelector(".increase") && currentProduct){
       console.log(`increased product with product ID: `, currentProductId);
        
        // uppdatera följande egenskaper
		cartItem.map((foundProduct:any) => {
            if(foundProduct.id === currentProduct.id){
				// addera 1 av produkten
				foundProduct.order_items.qty! ++
                console.log(foundProduct.order_items.qty)
				// minska 1 i lager
				foundProduct.stock_quantity --
				// OM produkten då tar slut i lager, ändra status
				if(foundProduct.stock_quantity <= 0 ){
					return foundProduct.stock_status = "outofstock"
				}
				// uppdatera totala summan för denna produkt
				foundProduct.order_items.item_total = foundProduct.order_items.qty! * foundProduct.price 
				// återkom med den uppdaterade produkten
				return foundProduct	
			} 
        })

        totalSum()
                

    }else if((e.target === document.querySelector(".decrease") && currentProduct) ){
       console.log(`decreased product with product ID: `, currentProductId);

    }

   })

   const increaseEl = Array.from(document.querySelectorAll(".increase"))
   console.log(increaseEl)

   const decreaseEl = Array.from(document.querySelectorAll(".decrease"))

   console.log(decreaseEl)

  


//    let amountOfProducts = cartItem.map((product:any) => {
//     return product.order_items.qty
//    })
//    console.log(amountOfProducts)

//    för att öka produkter i varukorg
// increaseEl.forEach((e)=> {
//     e.addEventListener("click", (product) => {
//     console.log("yay u increased")
//     product.order_items.qty[i]++
//     console.log(product.order_items.qty)
//     })
// })

//    //    för att minska produkter i varukorg
//    decreaseEl!.forEach((e) => {
//     e.addEventListener("click", () => {
//     console.log("yay u decreased")
//     })
//    })

  

//  visar/döljer shoppingvagnen
cartBtn!.addEventListener("click", (e) => {
    cartItem = JSON.parse(localStorage.getItem("products_in_cart") ?? '[]')
    cartMenu!.classList.toggle("active")
    e.preventDefault
    console.log("Du klickade på cart")
})

// hela funktionen

