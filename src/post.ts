export { }
import { IResponse, IOrder, IError } from "./interfaces"

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
const wrong = document.querySelector('#wrong')!


/*

export const postOrder = async (fullOrder: IOrder) => {
    const res = await fetch('https://bortakvall.se/api/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(fullOrder),

    })
    const response = await res.json() as IResponse


    if (!res.ok) {

        throw new Error(`${res.status} ${res.statusText}`)


    }
    if (response.status === 'fail') {
        console.log('error')
        //const error = await res.json() as IError

        contact.classList.add('hide');
        wrong.classList.remove('hide');
        console.log('WRONG')
        //const error = await res.json() as IError
        wrong.innerHTML = `<div>
         <h2>Något gick fel! :(</h2>
         <p>${res.status} ${response.message}</p>
         <p>Vänligen kontrollera din order och dina uppgifter</p>
 
         <!--click-event som backar till kunduppgiftena-->
         <button class="back btn btn-secondary">Tillbaka</button>
         </div>`

    }
    else {

        contact.classList.add('hide');
        confirm.classList.remove('hide');
        confirm.innerHTML = `<div>
        <h2>Tack ${response.data.customer_first_name}!:)</h2>
        <p>
          Din order med ordernr ${response.data.id} har gått igenom. Leverans inom 2
          vardagar
        </p>
        </div>`

    }

}*/

export const postOrder = async (testOrder: IOrder) => {
    const res = await fetch('https://bortakvall.se/api/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(testOrder),

    })
    const response = await res.json() as IResponse


    if (!res.ok) {

        throw new Error(`${res.status} ${res.statusText}`)


    }
    if (response.status === 'fail') {
        console.log('error')
        //const error = await res.json() as IError

        contact.classList.add('hide');
        wrong.classList.remove('hide');
        console.log('WRONG')
        //const error = await res.json() as IError
        wrong.innerHTML = `<div>
         <h2>Något gick fel! :(</h2>
         <p>${res.status} ${response.message}</p>
         <p>Vänligen kontrollera din order och dina uppgifter</p>
 
         <!--click-event som backar till kunduppgiftena-->
         <button class="back btn btn-secondary">Tillbaka</button>
         </div>`

    }
    else {

        contact.classList.add('hide');
        confirm.classList.remove('hide');
        confirm.innerHTML = `<div>
        <h2>Tack ${response.data.customer_first_name}!:)</h2>
        <p>
          Din order med ordernr ${response.data.id} har gått igenom. Leverans inom 2
          vardagar
        </p>
        </div>`
        console.log('WORKS??')

    }

}






