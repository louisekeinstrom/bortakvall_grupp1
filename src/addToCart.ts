export { }
import { fetchProducts } from "./katalog";

const cartEL = document.querySelector(".cart-product")
let cartItem = JSON.parse(localStorage.getItem("products_in_cart") ?? '[]')

const wholeCart = document.querySelector('.shopping-cart-roll-down')

const cartBtn = document.querySelector(".shopping-cart-btn"); //knapp för cart
const cartMenu = document.querySelector(".cart-product"); //cart

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



(wholeCart as HTMLElement)!.addEventListener('click', (e: any) => {
    e.stopPropagation();

    cartItem = JSON.parse(localStorage.getItem("products_in_cart") ?? '[]')
    const currentDeleteId = Number((e.target as HTMLElement).dataset.id)


    const currentProductId = Number((e.target as HTMLElement).dataset.currentProductId)
    const currentProduct = cartItem.find((product: any) => product.id === currentProductId)

    if (e.target.classList.contains('increase') && currentProduct.id) {
        e.stopImmediatePropagation();
        fetchProducts()
        // uppdatera följande egenskaper
        cartItem.map((foundProduct: any) => {
            if (foundProduct.id === currentProduct.id) {
                // addera 1 av produkten
                foundProduct.order_items.qty++
                // minska 1 i lager
                foundProduct.stock_quantity--

                // OM produkten då tar slut i lager, ändra status
                if (foundProduct.stock_quantity <= 0) {
                    e.target.setAttribute("style", "display:none")
                    return foundProduct.stock_status = "outofstock"
                }
                // uppdatera totala summan för denna produkt
                foundProduct.order_items.item_total = foundProduct.order_items.qty! * foundProduct.price
                // återkom med den uppdaterade produkten
                return foundProduct
            }
            fetchProducts()
        })
        localStorage.setItem('products_in_cart', JSON.stringify(cartItem))
        renderIntoCart();
        totalSum();

    } else if (e.target.classList.contains('decrease') && currentProduct.id) {
        e.stopImmediatePropagation();
        fetchProducts()
        // uppdatera följande egenskaper
        cartItem.map((foundProduct: any) => {

            if (foundProduct.id === currentProduct.id) {
                // subtrahera 1 av produkten
                foundProduct.order_items.qty!--
                // öka 1 i lager
                foundProduct.stock_quantity++
                

                // om 0 varor är i korgen
                if (foundProduct.order_items.qty <= 0) {
                    localStorage.setItem('products_in_cart', JSON.stringify(cartItem))
                    deleteProductFromCart(foundProduct.id);
                    renderIntoCart();
                    totalSum();
                }
                // uppdatera totala summan för denna produkt
                foundProduct.order_items.item_total = foundProduct.order_items.qty! * foundProduct.price
                // återkom med den uppdaterade produkten
                return foundProduct

            }
            fetchProducts()
        })
        localStorage.setItem('products_in_cart', JSON.stringify(cartItem))
        renderIntoCart();
        totalSum();

    } else if (e.target.classList.contains('deleteBtn') && currentDeleteId) {
        fetchProducts()

        deleteProductFromCart(currentDeleteId)

        e.stopImmediatePropagation()

    }

});

//  visar/döljer shoppingvagnen
cartBtn!.addEventListener("click", (e) => {
    cartMenu!.classList.toggle("active")
    e.preventDefault
})

// hela funktionen

const deleteProductFromCart = (productId: any) => {
    // hitta rätt produkt som ska tas bort
    const productIndex = cartItem.findIndex((product: any) => product.id === productId);

    cartItem.splice(productIndex, 1);

    // Updatera local storage
    localStorage.setItem('products_in_cart', JSON.stringify(cartItem));

    // Uppdatera cart display
    renderIntoCart()
};

