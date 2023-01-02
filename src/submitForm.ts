export { }
import { IOrder } from "./interfaces"
import { postOrder } from "./post";


//DOM ref till formuläret
export const form = document.querySelector('.customerInfo') as HTMLFormElement;



//inputfields från kundformuläret

const firstName = document.querySelector('#firstName') as HTMLInputElement
const lastName = document.querySelector('#lastName') as HTMLInputElement
const adress = document.querySelector('#adress') as HTMLInputElement
const postcode = document.querySelector('#postcode') as HTMLInputElement
const city = document.querySelector('#city') as HTMLInputElement
const tel = document.querySelector('#tel') as HTMLInputElement
const email = document.querySelector('#email') as HTMLInputElement




//hämtar productinfo från localStorage
const productsArray = JSON.parse(localStorage.getItem('products_in_cart') ?? '[]');
//array med bara order_items och inte överflödig info
const orderItems = productsArray.map((product: { order_items: any; }) => product.order_items);

//räknar ut order_total
const totalPrice = orderItems.reduce((sum: number, items: { item_total: number; }) => {
    return sum + items.item_total
}, 0)




//submit form eventlistener

form?.addEventListener('submit', async (e: Event) => {
    e.preventDefault();

    console.log(orderItems)

    console.log(totalPrice)


    const fullOrder: IOrder = {
        customer_first_name: firstName.value,
        customer_last_name: lastName.value,
        customer_address: adress.value,
        customer_postcode: postcode.value,
        customer_city: city.value,
        customer_email: email.value,
        order_total: totalPrice,
        order_items: orderItems

    }


    console.log(fullOrder)

    //await postOrder(fullOrder)
    await postOrder(fullOrder)

})

