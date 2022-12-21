//export { };
import { IProducts } from "./interfaces";

//const test = console.log('test')

//function för att hämta produktinfo från api
//orginal
/*
export const fetchProducts = async () => {
    const res = await fetch('https://bortakvall.se/api/products')
    if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`)
    }

    return await res.json() as IProducts[]

} */

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
            const test = data.data.map((product: { name: string; }) => {
                return `name" + ${product.name}`
            })
            console.log(test)
        }).catch(err => {
            console.log(err)
        })
}







