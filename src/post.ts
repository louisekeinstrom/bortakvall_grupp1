export { }
import { IResponse, IOrder } from "./interfaces"

/*
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
}*/
export const confirm = document.querySelector('#confirmation')!
export const contact = document.querySelector('.contact')!

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
    }
    if (res.ok) {
        contact.classList.add('hide');
        confirm.classList.remove('hide');
        console.log(`${fullOrder.customer_first_name}`)

    }

    //const response = await res.json() as IResponse
    return await res.json() //as IResponse

        .then(data => {
            console.log(data.data)

            data.data.map((order: { id: number }) => {

                console.log('id', order.id)
            })
        })
    //.data.id)


}