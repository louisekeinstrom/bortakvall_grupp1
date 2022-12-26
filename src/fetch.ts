//export { };
import { IProducts } from "./interfaces";
import { eventListeners } from "./popup";


//fungerar bra
/*
export const fetchProducts = () => {
    fetch('https://bortakvall.se/api/products')
        .then(res => {
            if (!res.ok) {
                throw new Error(`${res.status} ${res.statusText}`)
            }
            return res.json()
        })//'data i arrow-funktionen är bara ett namn, den andra i data.data är den viktiga'
        .then(data => {
            console.log(data.data)
            //nu är en del av render här, ska försöka dela upp det
            const test = data.data.map((product: { name: string; }) => {
                return `name" + ${product.name}`
            })
            console.log(test)
        }).catch(err => {
            console.log(err)
        })
} */
/*
let products = {}

//funktion för att få infon i console
export const fetchProducts = () => {
    fetch('https://bortakvall.se/api/products')
        .then(res => {
            if (!res.ok) {
                throw new Error(`${res.status} ${res.statusText}`)
            }
            return res.json()
        })//'data i arrow-funktionen är bara ett namn, den andra i data.data är den viktiga'
        .then(data => {
            console.log(data.data)

            products = data.data.map((product: any) => {
                return `id: ${product.id} 
                name:${product.name} 
                description: ${product.description}
                price:${product.price}
                on_sale: ${product.on_sale}
                images:${product.images.thumbnail},
                ${product.images.large} 
                stock_status:${product.stock_status}
                stock_quantity:${product.stock_quantity} `
            })

            console.log(products)
        })
        .catch(err => {
            console.log(err)
        })
}
*/


let products = {}

//queryselectorn är inne i funktionen
export const renderProducts = () => {
    fetch('https://bortakvall.se/api/products')
        .then(res => {
            if (!res.ok) {
                throw new Error(`${res.status} ${res.statusText}`)
            }
            return res.json()
        })
        .then(data => {
            console.log(data.data)

            document.querySelector('.rendering')!.innerHTML = data.data.map((product: any) => {
                return `
                <div class="product-container m-3 col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center flex-column">
                  <i class="cart-icon-container text-light fa-solid fa-cart-plus" data-product-id="${product.id}"></i>
                  <img
                    src="https://bortakvall.se${product.images.thumbnail}"
                    alt="Produkt från Bortakväll"
                    class="product-img img-fluid mx-1"
                    data-product-id="${product.id}"
                  />
                  <div
                    class="product-name-price-container d-flex justify-content-between my-1"
                  >
                    <span class="candy-name">${product.name}</span>
                    <span class="candy-price-container">
                      <span class="candy-price">${product.price}</span> kr
                    </span>
                  </div>
                  <p class="description-text">description</p>
                  <button class="read-more-btn btn btn-secondary" data-product-id="${product.id}">Läs mer</button>
                </div>
                  
               `
            }).join('')

            console.log(products)
            
        })
        .catch(err => {
            console.log(err)
        })
}
