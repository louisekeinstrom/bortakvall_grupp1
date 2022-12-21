//export { };
import { IProducts } from "./interfaces";

//const test = console.log('test')

//function för att hämta produktinfo från api
export const fetchProducts = async () => {
    const res = await fetch('https://bortakvall.se/api/products')
    if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`)
    }

    return await res.json() as IProducts[]

}

//en lokal variabel som håller infon vi hämtar från api med produkter
let products: IProducts[] = []

export const testFetch = async () => {
    products = await fetchProducts()
    //console för att testa att det fungerar
    console.log(products)
}







