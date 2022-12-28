export { }
import "./interfaces"
import "./fetch"
import "./popup"
import { IProducts } from "./interfaces";
import "./main"
import { fetchProducts } from "./fetchWithInterface";
// import { IOrder } from "./interfaces";


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
    // if( (e.target as HTMLButtonElement).dataset.productId ){
    // }
    // 1. filtrera/map ut den som klickas på
    // const addToCartProduct = 
            console.log(data.data)
     const addNewProduct  = data.data.find((product: IProducts) => {
        return product.id === productId 
    }) 
    console.log(addNewProduct)
    
    localStorage.setItem('products_in_cart', JSON.stringify(addNewProduct))
    }
)}
    })

