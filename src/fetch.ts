//export { };
import { IProducts } from "./interfaces";


//function för att hämta produktinfo från api
//orginal, fungerade dåligt med interface

/*
export const fetchProducts = async () => {
    const res = await fetch('https://bortakvall.se/api/products')
    if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`)
    }
    return await res.json() as IProducts[]

}*/


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

let products = {}
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














