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


//submit form eventlistener

form.addEventListener('submit', (e: Event) => {
    e.preventDefault();

    //kontroll
    console.log(
        firstName.value,
        lastName.value,
        adress.value,
        postcode.valueAsNumber,
        city.value,
        tel.value,
        email.value
    )
})