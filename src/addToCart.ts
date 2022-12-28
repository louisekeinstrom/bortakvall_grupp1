export { }
import "./interfaces"
import "./fetch"
import "./popup"
import { IProducts } from "./interfaces";
import { IOrder } from "./interfaces";

const cartMenu = document.querySelector(".cart-product")

document.addEventListener('click', (e) => {
	if( (e.target as HTMLButtonElement).tagName === "I" && (e.target as HTMLButtonElement).dataset.productId)
console.log("du har klickat på I-elementet")

const addedProducts: [] = []
console.log(product : IProducts)
console.log(addedProducts)
cartMenu?.innerHTML += `<div class="cart-product">
<img
src="https://bortakvall.se${product.images.thumbnail}"
alt="Produkt från Bortakväll"
class="product-img img-fluid mx-1"
data-product-id="${product.id}">
<span class="candy-name">${product.name}</span>
                    <span class="candy-price-container">
                      <span class="candy-price">${product.price}</span> kr
                    </span>
</div> `
return addedProducts
});