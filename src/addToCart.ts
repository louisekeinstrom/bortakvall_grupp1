export { }
import "./interfaces"
import "./fetch"
import "./popup"
import { IProducts } from "./interfaces";
import "./main"
import { fetchProducts } from "./fetchWithInterface";
// import { IOrder } from "./interfaces";

const showCart = document.querySelector(".added-to-cart")

let cart: [] = []

function addToCart(product: {
    id: number,
    order_date: string,
    customer_first_name: string,
    customer_last_name: string,
    customer_address: string,
    customer_postcode: string,
    customer_city: string,
    customer_email: string,
    customer_phone: null,
    order_total: number,
    created_at: string,
    updated_at: string,
    numberOfUnits: number,
}){
    if(cart.some((product) => product === product)){
        alert("already in cart")
    }else{

    cart.push({...product, numberOfUnits: 1,})

    showCart!.innerHTML += `
    <div class="cart-product">
    <div class="col-xs-12 col-md-6">
							<img src="https://bortakvall.se${product.images.large}" alt="Produkt från Bortakväll" class="img-fluid mh-sm-50 m-3 popup-img" />
						  </div>
    <h4 class="candy-name mt-3">${product.name}</h4></div>
							<div>
                            <p>Pris <span>${product.price}</span> kr</p>
                            <p>Antal <span>${product.numberOfUnits}</span></p>
						  </div>

          </div>
    `
    }
}

document.addEventListener('click', (e) => {
	if( (e.target as HTMLButtonElement).tagName === "I" && (e.target as HTMLButtonElement).dataset.productId){
        fetch('https://bortakvall.se/api/products')
        .then(res => {
            if (!res.ok) {
                throw new Error(`${res.status} ${res.statusText}`)
            }
            return res.json()
        })
        .then(data => {
        console.log("du har klickat på I-elementet")
    const productId = Number((e.target as HTMLButtonElement).dataset.productId)
    console.log('You clicked add to cart with ', productId)

            console.log(data.data)
     const addNewProduct  = data.data.find((product: IProducts) => {
        return product.id === productId 
    }) 
    console.log(addNewProduct)
    addToCart(addNewProduct)
    console.log(cart)
    localStorage.setItem('products_in_cart', JSON.stringify(addNewProduct))
    }
)}
    })
