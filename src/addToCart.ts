export { }
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

//  visar/döljer shoppingvagnen
cartBtn!.addEventListener("click", (e) => {
    cartMenu!.classList.toggle("active");
    // e.preventDefault;
});

console.log(cartItem)

// array för mängd produkter i cart
let amountOfProductsInCart = cartItem.map((product: number) => {
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
cartItem.forEach((product: any) => {
    cartEL!.innerHTML += `
    <div>
    <i class="fa-solid fa-xmark deleteBtn" dataset-id=${product.id}></i>
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

const deleteBtn = Array.from(document.querySelectorAll(".deleteBtn"))

deleteBtn.forEach((deleteBtn) => {
    deleteBtn.addEventListener('click', (event) => {
        const productId = event.target.dataset.id
        //deleteProductFromCart(productId);
        console.log('works?')
        deleteProductFromCart(productId)
        // updateCartDisplay()

    });
})

// document.querySelector(".total-amount").innerHTML += `Totalt: ${sum} kr`

const increaseEl = Array.from(document.querySelectorAll(".increase"))
console.log(increaseEl)

const decreaseEl = Array.from(document.querySelectorAll(".decrease"))

console.log(decreaseEl)


let amountOfProducts = cartItem.map((product: number) => {
    return product.order_items.qty
})
console.log(amountOfProducts)


/*

const deleteProductFromCart = (product: IProductsExt) => {
    // hitta rätt produkt som ska tas bort
    const productIndex = cartItem.findIndex((product: IProductsExt) => product.id === product.id);

    // ta bort från cart(synns inte ännu , men i console)
    cartItem.splice(productIndex, 1);
    console.log(productIndex)
    // Updatera local storage
    localStorage.setItem('products_in_cart', JSON.stringify(cartItem));
    console.log('deletefromcart')
    updateCartDisplay()
}
*/
const deleteProductFromCart = (productId: any) => {
    // hitta rätt produkt som ska tas bort
    const productIndex = cartItem.findIndex((product: any) => product.id === productId);

    cartItem.splice(productIndex);
    console.log(productIndex)
    // Updatera local storage
    localStorage.setItem('products_in_cart', JSON.stringify(cartItem));

    // Uppdatera cart display
    updateCartDisplay();
};


/*
const deleteProductFromCart = (productId: number) => {
    // hitta rätt produkt som ska tas bort
    //const productIndex: IProductsExt = cartItem.findIndex((product: IProductsExt) => product.id === productId)//product.id === productId);
    const productIndex = cartItem.findIndex((product: IProductsExt) => product.id === productId);
    console.log(productIndex)

    // ta bort från cart(synns inte ännu , men i console)
    cartItem.splice(productIndex, 1);
    localStorage.setItem("products_in_cart", JSON.stringify(cartItem));

    // uppdatera cart display
    updateCartDisplay();
};*/

/*
const updateCartDisplay = () => {
    // Clear the cart display
    while (cartEL!.firstChild) {
        cartEL!.removeChild(cartEL!.firstChild);
    }

    // Re-render the cart items
    cartItem.forEach((product: any) => {
        const productEl = document.createElement('div');
        productEl.innerHTML = `
        <i class="fa-solid fa-xmark deleteBtn" dataset-id="${product.id}"></i>
        <img src="https://bortakvall.se${product.images.large}" alt="Produkt från Bortakväll" class="img-fluid mh-sm-50 m-3 popup-img" />
        <h2 class="candy-name mt-3">${product.name}</h2>
        <p>Pris <span>${product.price}</span> kr</p>
        <div>
          <p class="increase">+</p>
          <p class="showAmount">${product.order_items.qty}</p>
          <p class="decrease">-</p>
        </div>
      `
        cartEL!.appendChild(productEl);
    });
}
*/
const updateCartDisplay = () => {
    // clear the cart display
    cartEL.innerHTML = '';

    // render the updated cart items
    cartItem.forEach((product: any) => {
        cartEL.innerHTML += `
        <div>
          <i class="fa-solid fa-xmark deleteBtn" dataset-id=${product.id}></i>
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
}

