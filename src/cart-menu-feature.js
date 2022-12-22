const cartBtn = document.querySelector(".shopping-cart-btn");
const cartMenu = document.querySelector(".shopping-cart-roll-down");

const increaseEl = document.querySelector(".increase");
const decreaseEl = document.querySelector(".decrease");

// const amountEl = document.querySelector(".amount");

const cartProduct = document.querySelector(".cart-product");

const cartIconEl = document.querySelectorAll(".cart-icon-container");

let amountOfProducts = 1;

console.log(amountOfProducts);

//  visar/döljer shoppingvagnen
cartBtn?.addEventListener("click", (e) => {
  cartMenu?.classList.toggle("active");
  e.preventDefault;
});

//  ökar produkter i varukorg
increaseEl?.addEventListener("click", () => {
  amountOfProducts++;
  console.log(amountOfProducts);
  amountEl.value = `${amountOfProducts}`;
  return amountOfProducts;
});

// minskar produkter i varukorg
decreaseEl?.addEventListener("click", () => {
  amountOfProducts--;
  console.log(amountOfProducts);
  amountEl.value = `${amountOfProducts}`;
  return amountOfProducts;
});

/*
catalogen : för varje obj i katalogen skapas ett kort som visar properties. 
Finns även en lägg till i varukorgen-knapp som filtrerar ut varje objekt som klickats på i en enskild array.

I varukorgen visas de objekt som filtrerats ut i bild, namn, pris och under finns en amount of products som ändras med en +/- knapp.
om summan blir 0 tas produkten bort 
*/
