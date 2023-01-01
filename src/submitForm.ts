export { }
import { IOrder } from "./interfaces"
import { postOrder, confirm } from "./post";
//DOM ref till formuläret
export const form = document.querySelector('.customerInfo') as HTMLFormElement;

//console.log(form.children)

//inputfields

const firstName = document.querySelector('#firstName') as HTMLInputElement
const lastName = document.querySelector('#lastName') as HTMLInputElement
const adress = document.querySelector('#adress') as HTMLInputElement
const postcode = document.querySelector('#postcode') as HTMLInputElement
const city = document.querySelector('#city') as HTMLInputElement
const tel = document.querySelector('#tel') as HTMLInputElement
const email = document.querySelector('#email') as HTMLInputElement


//försök med klass andvänds INTE NU
class Customer {
    customer_first_name: string;
    customer_last_name: string;
    customer_address: string;
    customer_postcode: string;
    customer_city: string;
    customer_email: string;

    constructor(f: string, l: string, a: string, p: string, c: string, e: string) {
        this.customer_first_name = f;
        this.customer_last_name = l;
        this.customer_address = a;
        this.customer_postcode = p;
        this.customer_city = c;
        this.customer_email = e;
    }

}



//tom array där kundinfo ska sparas
//let fullOrder: IOrder[] = []


//submit form eventlistener

form?.addEventListener('submit', async (e: Event) => {
    e.preventDefault();

    //kontroll
    /*console.log(
        firstName.value,
        lastName.value,
        adress.value,
        postcode.value,
        city.value,
        tel.value,
        email.value
    )*/
    /*const kund = new Customer(
        firstName.value,
        lastName.value,
        adress.value,
        postcode.value,
        city.value,
        email.value
    )*/
    /*const kund: IOrder = {
        customer_first_name: firstName.value,
        customer_last_name: lastName.value,
        customer_address: adress.value,
        customer_postcode: postcode.value,
        customer_city: city.value,
        customer_email: email.value,
        order_total: 0,
        order_items: [{
            product_id: 6545,
            qty: 3,
            item_price: 8,
            item_total: 24
        }]
    }*/
    const kund = {
        customer_first_name: firstName.value,
        customer_last_name: lastName.value,
        customer_address: adress.value,
        customer_postcode: postcode.value,
        customer_city: city.value,
        customer_email: email.value,
        order_total: 0,

    }
    /*
        const kund  = {
            customer_first_name: firstName.value,
            customer_last_name: lastName.value,
            customer_address: adress.value,
            customer_postcode: postcode.value,
            customer_city: city.value,
            customer_email: email.value,
            order_total: 1,
            order_items: [ {
                product_id: 6545,
                qty: 3,
                item_price: 8,
                item_total: 24
            }]
        }
    */


    const order: IOrder["order_items"] = [
        {
            product_id: 6545,
            qty: 3,
            item_price: 8,
            item_total: 24
        }/*, {
            product_id: 6604,
            qty: 2,
            item_price: 4,
            item_total: 8
        }*/
    ]

    /*const order = [
        {
            product_id: 6545,
            qty: 3,
            item_price: 8,
            item_total: 24
        }
    ]*/
    /*
    const order = [
        {
            product_id: 6545,
            qty: 3,
            item_price: 8,
            item_total: 24
        }

    ]*/

    order.push({
        product_id: 6604,
        qty: 2,
        item_price: 4,
        item_total: 8
    })

    const totalPrice = order.reduce((sum, items) => {
        return sum + items.item_total
    }, 0)
    console.log(totalPrice)

    /*const testOrder: IOrder = { //IOrder 
        customer_first_name: firstName.value,
        customer_last_name: lastName.value,
        customer_address: adress.value,
        customer_postcode: postcode.value,
        customer_city: city.value,
        customer_email: email.value,
        order_total: totalPrice,
        order_items: order
    }*/
    const testOrder: IOrder = {
        customer_first_name: firstName.value,
        customer_last_name: lastName.value,
        customer_address: adress.value,
        customer_postcode: postcode.value,
        customer_city: city.value,
        customer_email: email.value,
        order_total: totalPrice,
        order_items: order //order

    }
    /*order.push({
        product_id: 6604,
        qty: 2,
        item_price: 4,
        item_total: 8
    })*/
    //testOrder.order_items.push(order)

    console.log(testOrder)



    /*
        const fullOrder: IOrder = {
            customer_first_name: firstName.value,
            customer_last_name: lastName.value,
            customer_address: adress.value,
            customer_postcode: postcode.value,
            customer_city: city.value,
            customer_email: email.value,
            order_total: 8,//24 
            order_items: [
                {
                    product_id: 6604,
                    qty: 2,
                    item_price: 4,
                    item_total: 8
                },
            ]
        }
        */
    /*
        const totalPrice = fullOrder.order_items.reduce((sum, items) => {
            return sum + items.item_total * (fullOrder.order_items.length)
        }, 0)*/

    //console.log(totalPrice)


    /*product_id: 6545,
                    qty: 3,//3
                    item_price: 8,
                    item_total: 24*/
    // product_id: 6604, qty: 2, item_price: 4, item_total: 8

    //console.log(fullOrder)
    //console.log(kund, order)



    //await postOrder(fullOrder)
    await postOrder(testOrder)

    //await postOrder(kund, order)




})

