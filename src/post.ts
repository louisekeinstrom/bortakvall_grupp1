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

    const response = await res.json() as IResponse

    confirm.innerHTML = `<div>
<h2>Tack ${response.data.customer_first_name}!:)</h2>
<p>
  Din order med ordernr ${response.data.id} har gått igenom. Leverans inom 2
  vardagar
</p>
</div>`
    //return await res.json() //as IResponse


    //console.log(response.data)
    console.log(`id${response.data.id}, namn ${response.data.customer_first_name} ${response.data.customer_last_name}`)



}