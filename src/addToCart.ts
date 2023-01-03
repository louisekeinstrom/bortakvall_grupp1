export { }
import "./interfaces"
import "./fetch"
import "./popup"

const cartEl = document.querySelector(".shopping-cart-roll-down")

   let cartItem = localStorage.getItem("products_in_cart")
    console.log(cartItem)
    cartEl!.innerHTML += `<div><div> 
    <h2 class="candy-name mt-3">${product.name}</h2>
    <p>Pris <span>${product.price}</span> kr</p>
    <p class="small stock-qty">${stockQtyInner}</p>
  </div>
  <div class="col-xs-12 col-md-6">
    <img src="https://bortakvall.se${product.images.large}" alt="Produkt från Bortakväll" class="img-fluid mh-sm-50 m-3 popup-img" />
  </div>
  </div>
`