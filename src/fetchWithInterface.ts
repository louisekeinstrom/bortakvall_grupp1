import { IProducts } from "./interfaces";


/*
export function fetchUsers(): Promise<void> {
    return fetch('https://bortakvall.se/api/products')
        .then(response => response.json())
        .then(data => {
            interProducts = data as IProducts[];
            //console.log(interProducts)
        });
}
*/


export const fetchProducts = async () => {
    const res = await fetch('https://bortakvall.se/api/products')
    if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`)
    }
    //return await res.json() as IProducts
    await res.json() as IProducts["data"]
}



