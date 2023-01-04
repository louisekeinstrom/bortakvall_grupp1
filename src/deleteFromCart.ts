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

/*
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

*/












/*
const deleteBtns = document.querySelectorAll('.fa-solid.fa-xmark[data-product-id]');

deleteBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener('click', (event) => {
        //const productId = event.target.dataset.productId!;
        //deleteProductFromCart(productId);
        console.log('works?')


    });
});*/




