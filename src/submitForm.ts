export { }
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
    /*
        format() {
            return `förnamn ${this.customer_first_name}
            efternamn ${this.customer_last_name}
            adress ${this.customer_address}
            postnr ${this.customer_postcode}
            stad ${this.customer_city}
            email ${this.customer_email}`
        }*/
}


//submit form eventlistener

form.addEventListener('submit', (e: Event) => {
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
    const kund = new Customer(
        firstName.value,
        lastName.value,
        adress.value,
        postcode.value,
        city.value,
        email.value
    )
    console.log(kund)

})