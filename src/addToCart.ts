export { }
import "./interfaces"
import "./fetch"
import "./popup"
import { fetchProducts } from "./fetchWithInterface"
import { IProductsExt } from "./interfaces";

const cartEL = document.querySelector(".cart-product")

   let cartItem = JSON.parse(localStorage.getItem("products_in_cart"))

   console.log(cartItem)

   let showCartItems = () => {
   cartItem.forEach((product:any) => {
    console.log(product.name)
    cartEL!.innerHTML += `
    <div>
        <img src="https://bortakvall.se${product.images.large}" alt="Produkt från Bortakväll" class="img-fluid mh-sm-50 m-3 popup-img" />
            <h2 class="candy-name mt-3">${product.name}</h2>
				<p>Pris <span>${product.price}</span> kr</p>
                    <div>
                        <p class ="increase">+</p>
                        <p class ="showAmount"></p>
                        <p class ="decrease">-</p>
					</div>
    </div>
    `
    return {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        on_sale: product.on_sale,
        images: {
            thumbnail: product.images.thumbnail,
            large: product.images.large
        },
        stock_status: product.stock_status,
        stock_quantity: product.stock_quantity,
        order_items: 
        {
            product_id: product.id,
            qty: 0, 
            item_price: product.price,
            item_total: 0
        },	
    }
   });
   }

   showCartItems()

   const increaseEl = Array.from(document.querySelectorAll(".increase"))
   console.log(increaseEl)

   const decreaseEl = Array.from(document.querySelectorAll(".decrease"))

   let cartAmount: IProductsExt 
   
//    för att öka produkter i varukorg
   increaseEl!.forEach((e) => {
    e.addEventListener("click", () => {
    console.log("yay u clicked")
    cartAmount.order_items.qty! ++
    console.log(cartAmount.order_items.qty)
    return cartAmount
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