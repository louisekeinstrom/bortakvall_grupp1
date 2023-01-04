export { }
import "./kassa"
import "./interfaces"
import "./fetch"
import "./popup"
import { fetchProducts } from "./fetchWithInterface"
import { IProductsExt } from "./interfaces";

const cartEL = document.querySelector(".cart-product")
const cartIconEl = Array.from(document.querySelectorAll(".cart-icon-container"))
let cartItem = JSON.parse(localStorage.getItem("products_in_cart") ?? '[]')

const cartBtn = document.querySelector(".shopping-cart-btn"); //knapp för cart
const cartMenu = document.querySelector(".cart-product"); //cart

//const deleteBtn = document.querySelector('.deleteBtn')
//const deleteBtn = document.querySelector('.fa-solid.fa-xmark[data-product-id]');


//  visar/döljer shoppingvagnen
cartBtn!.addEventListener("click", (e) => {
    cartMenu!.classList.toggle("active");
    e.preventDefault;
});

console.log(cartItem)

// array för mängd produkter i cart
let amountOfProductsInCart = cartItem.map((product: IProductsExt) => {
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

// funktion för att synligt rendera ut produkten i varukorgen   
cartItem.forEach((product: IProductsExt) => {
    cartEL!.innerHTML += `
    <div>
		<i class="fa-solid fa-xmark deleteBtn" data-product-id="${product.id}"></i>
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

document.querySelector(".total-amount")!.innerHTML += `Totalt: ${sum} kr`

const increaseEl = Array.from(document.querySelectorAll(".increase"))
console.log(increaseEl)

const decreaseEl = Array.from(document.querySelectorAll(".decrease"))

console.log(decreaseEl)


let amountOfProducts = cartItem.map((product: IProductsExt) => {
    return product.order_items.qty
})
console.log(amountOfProducts)

//    för att öka produkter i varukorg
/*increaseEl.forEach(() => {
    addEventListener("click", (product: any) => {
        console.log("yay u increased")
        product.order_items.qty[i]++
        console.log(product.order_items.qty)
    })
})*/
//    för att minska produkter i varukorg
decreaseEl!.forEach((e) => {
    e.addEventListener("click", () => {
        console.log("yay u decreased")
    })
})

const deleteProductFromCart = (productId: number) => {
    // Filter out the product with the given productId
    const newCart = cartItem.filter((product: { id: number }) => product.id !== productId);

    // Update the cartItem variable with the new array
    cartItem = newCart;

    // Update the products_in_cart item in local storage with the new cartItem array
    localStorage.setItem("products_in_cart", JSON.stringify(cartItem));
}
function updateCartDisplay() {
    // Clear the cart display
    cartEL!.innerHTML = "";

    // Calculate the new total price
    let sum = 0;
    for (let i = 0; i < totalPrice.length; i++) {
        sum += totalPrice[i] * amountOfProductsInCart[i];
    }

    // Re-render the products in the cart
    cartItem.forEach((product: any) => {
        cartEL!.innerHTML += `
        <div>
          <i class="fa-solid fa-xmark deleteBtn" data-product-id="${product.id}"></i>
          <img src="https://bortakvall.se${product.images.large}" alt="Produkt från Bortakväll" class="img-fluid mh-sm-50 m-3 popup-img" />
            <h2 class="candy-name mt-3">${product.name}</h2>
            <p>Pris <span>${product.price}</span> kr</p>
              <div>
                <p class="increase">+</p>
                <p class="showAmount">${product.order_items.qty}</p>
                <p class="decrease">-</p>
              </div>
        </div>
      `
    });

    // Update the total price display
    document.querySelector(".total-amount")!.innerHTML = `Totalt: ${sum} kr`;

    // Update the cart count display
    document.querySelector(".cart-count")!.innerHTML = `${cartItem.length}`;
}

/*
deleteBtn!.addEventListener("click", (e) => {
    e.stopPropagation();

    // Get the product id of the product to be deleted
    //const productId = // Get the product id here
    console.log('works?')

    // Delete the product from the cart
    deleteProductFromCart(cartItem.product_id);
    console.log(cartItem)

    // Update the cart display to reflect the changes
    updateCartDisplay();
});*/
/*deleteBtn.addEventListener('click', (e) => {
    if (e.target) {
        console.log('works?')
    }

}); */
const deleteBtns = document.querySelectorAll('.fa-solid.fa-xmark[data-product-id]');

deleteBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener('click', (event) => {
        //const productId = event.target.dataset.productId!;
        //deleteProductFromCart(productId);
        console.log('works?')


    });
});




