export { }
import { IOrder } from "./interfaces"

export const postOrder = async (fullOrder: IOrder) => {
    const res = await fetch('https://bortakvall.se/api/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(fullOrder),
    })

    if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`)
    } else { console.log(`status ${res.status}`) }

    return await res.json() as IOrder
}