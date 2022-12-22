export{}
const cartBtn = document.querySelector(".shopping-cart-btn")
const cartMenu = document.querySelector(".shopping-cart-roll-down")

const increaseEl = document.querySelector(".increase")



let amountOfProducts = 1

console.log(amountOfProducts)

cartBtn?.addEventListener("click", () => {
    cartMenu?.classList.toggle("active")
})

increaseEl?.addEventListener("click", () => {
    amountOfProducts++
})

console.log(amountOfProducts)