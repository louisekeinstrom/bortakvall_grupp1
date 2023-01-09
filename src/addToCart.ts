export { }
//import { IProductsExt } from "./interfaces"


//const addToCartBtnEl = document.querySelector(".popup-add-to-cart")
const cartEL = document.querySelector(".cart-product")
//const cartIconEl = Array.from(document.querySelectorAll(".cart-icon-container"))
let cartItem = JSON.parse(localStorage.getItem("products_in_cart") ?? '[]')

const wholeCart = document.querySelector('.shopping-cart-roll-down')

const cartBtn = document.querySelector(".shopping-cart-btn"); //knapp för cart
const cartMenu = document.querySelector(".cart-product"); //cart

console.log(cartItem)

// funktion för totala summan
let totalSum = () => {

    // array för mängd produkter i cart
    let amountOfProductsInCart = cartItem.map((product: any) => {
        return product.order_items.qty
    })

    // array för priserna
    let totalPrice = cartItem.map((product: any) => {
        return product.price
    })

    //räknar ihop priset på varorna
    let sum = 0

    for (let i = 0; i < totalPrice.length; i++) {
        sum += totalPrice[i] * amountOfProductsInCart[i];
    }

    document.querySelector(".total-amount")!.innerHTML = `Totalt: ${sum} kr`

}

// funktion för att synligt rendera ut produkten i varukorgen   
export let renderIntoCart = () => {
    cartItem = JSON.parse(localStorage.getItem("products_in_cart") ?? '[]')
    cartEL!.innerHTML = cartItem
        .map((product: any) =>
            `
    <div class="rendered-products-in-cart">
    <i class="fa-solid fa-xmark deleteBtn" data-id="${product.id}"></i>
        <img src="https://bortakvall.se${product.images.large}" alt="Produkt från Bortakväll" class="img-fluid mh-sm-50 m-3 popup-img" />
            <h2 class="candy-name mt-3">${product.name}</h2>
				<p>Pris <span>${product.price}</span> kr</p>
                    <div class="decide-amount">
                        <p data-current-product-id="${product.id}" class="increase">+</p>
                        <p class="show-amount">${product.order_items.qty}</p>
                        <p data-current-product-id="${product.id}" class="decrease">-</p>
					</div>
    </div>
    `
        ).join('')
    totalSum();
}
renderIntoCart();
totalSum();

//Klistra ev in i samma klickevent som increase/decrease när de fungerar

(wholeCart as HTMLElement)!.addEventListener('click', (e: any) => {
    cartItem = JSON.parse(localStorage.getItem("products_in_cart") ?? '[]')
    const currentDeleteId = Number((e.target as HTMLElement).dataset.id)


    const currentProductId = Number((e.target as HTMLElement).dataset.currentProductId)
    const currentProduct = cartItem.find((product: any) => product.id === currentProductId)

    if (e.target === document.querySelector(".increase") && currentProduct.id) {
        console.log(`increased product with product ID: `, currentProduct);

        // uppdatera följande egenskaper
        cartItem.map((foundProduct: any) => {
            if (foundProduct.id === currentProduct.id) {
                // addera 1 av produkten
                foundProduct.order_items.qty++
                console.log(foundProduct.order_items.qty)
                // minska 1 i lager
                foundProduct.stock_quantity--
                console.log(foundProduct.stock_quantity)

                // OM produkten då tar slut i lager, ändra status
                if (foundProduct.stock_quantity <= 0) {
                    alert("Finns ej tillräckligt i lager")
                    return foundProduct.stock_status = "outofstock"
                }
                // uppdatera totala summan för denna produkt
                foundProduct.order_items.item_total = foundProduct.order_items.qty! * foundProduct.price
                // återkom med den uppdaterade produkten
                return foundProduct
            }
        })

    } else if ((e.target === document.querySelector(".decrease") && currentProduct)) {
        console.log(`decreased product with product ID: `, currentProduct);
        // uppdatera följande egenskaper
        cartItem.map((foundProduct: any) => {

            if (foundProduct.id === currentProduct.id) {
                // subtrahera 1 av produkten
                foundProduct.order_items.qty!--
                console.log(foundProduct.order_items.qty)
                // öka 1 i lager
                foundProduct.stock_quantity++
                console.log(foundProduct.stock_quantity)

                // om 0 varor är i korgen
                if (foundProduct.order_items.qty <= 0) {
                    cartEL!.innerHTML = ` `
                }
                // uppdatera totala summan för denna produkt
                foundProduct.order_items.item_total = foundProduct.order_items.qty! * foundProduct.price
                // återkom med den uppdaterade produkten
                return foundProduct

            }
        })

        totalSum();
    } else if (e.target.classList.contains('deleteBtn') && currentDeleteId) {
        console.log(`u clicked delete for product with id`, currentDeleteId)

        //deleteProductFromCart(currentDeleteId)
    }
})

const increaseEl = Array.from(document.querySelectorAll(".increase"))
console.log(increaseEl)

const decreaseEl = Array.from(document.querySelectorAll(".decrease"))

console.log(decreaseEl);
//delete
/*(wholeCart as HTMLElement).addEventListener('click', (e: any) => {
    const currentDeleteId = Number((e.target as HTMLElement).dataset.id)
    if (e.target.classList.contains('deleteBtn') && currentDeleteId) {
        console.log(`u clicked delete for product with id`, currentDeleteId)

    }
    /*if (e.target.classList.contains('deleteBtn')) {
        e.target.parentElement.remove();
        console.log(`u clicked delete for product with id`, )
    }*/
/*
})*/


/*const currentProductId = Number((e.target as HTMLElement).dataset.currentProductId)*/
//Klistra ev in i samma klickevent som increase/decrease när de fungerar










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
    //cartItem = JSON.parse(localStorage.getItem("products_in_cart") ?? '[]')
    cartMenu!.classList.toggle("active")
    e.preventDefault
    console.log("Du klickade på cart")
})

// hela funktionen

const deleteProductFromCart = (productId: any) => {
    // hitta rätt produkt som ska tas bort
    //const productIndex = cartItem.findIndex((product: any) => product.id === productId);

    const productIndex = cartItem.findIndex((product: any) => product.id === productId);


    cartItem.splice(productIndex, 1);
    console.log(productIndex)
    console.log('deletefromcartfunc')
    // Updatera local storage
    localStorage.setItem('products_in_cart', JSON.stringify(cartItem));

    // Uppdatera cart display
    //updateCartDisplay();
    renderIntoCart()
};

/*const currentProductId = Number((e.target as HTMLElement).dataset.currentProductId)*/
//Klistra ev in i samma klickevent som increase/decrease när de fungerar
/*
const deleteBtn = Array.from(document.querySelectorAll(".deleteBtn"))

deleteBtn.forEach((deleteBtn) => {
    deleteBtn.addEventListener('click', (event) => {

        //const productId = event.target.dataset.id
        //const productId = event.target!.dataset.id
        if ('dataset' in event.target) {
            const productId = event.target.dataset.id
            // ...
            deleteProductFromCart(productId)
            console.log('ifsats')
            console.log(productId)

        }
        //deleteProductFromCart(productId);
        console.log('works?')
        //deleteProductFromCart(productId)
        // updateCartDisplay()

    })*/