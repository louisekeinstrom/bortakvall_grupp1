const shoppingCart = document.querySelector(".cart-product");
const cartNode = document.querySelectorAll(".cart-icon-container"); //lägg till varukorg-ikon

const increaseEl = document.querySelector(".increase");
const decreaseEl = document.querySelector(".decrease");

const cartTest = document.querySelector(".check-out");

const amountEl = document.querySelector(".amount");

let amountOfUnits = 1;

let cartIconEl = Array.prototype.slice.call(cartNode); //gör om nodelist till array

// denna funkar på så sätt att den lägger till ett objekt. Dock är den inte fäst på lägg till-knappen och den har inte rätt info.
cartTest.addEventListener("click", () => {
  console.log("yay you clicked");
  shoppingCart.innerHTML += `<img
                class="cart-image"
                src="https://picsum.photos/150"
                alt="Produkt från Bortakväll"
              />
              <div class="cart-description">
                <h4 class="product-name">Produktnamn</h4>
                <p>Pris</p>
                <div class="show-amount-in-cart">
                  <p class="increase">+</p>
                  <div class="amount"></div>
                  <p class="decrease">-</p>
                </div>
              </div>`;
});

increaseEl.addEventListener("click", () => {
  // if (products.inStock >= amountOfUnits) { <==denna ska läggas till när stock har definierats.
  amountOfUnits++;
  console.log(amountOfUnits);
  amountEl.innerHTML = `<p>${amountOfUnits}</p>`;
  return amountOfUnits;
});
decreaseEl.addEventListener("click", () => {
  if (0 >= amountOfUnits) {
    amountOfUnits--;
    console.log(amountOfUnits);
    amountEl.innerHTML = `<p>${amountOfUnits}</p>`;
    return amountOfUnits;
  } else {
    console.log("can't go so low");
  }
});

// funktion för att öka/minska antal i varukorgen
function productUnits() {
  amountEl.innerHTML = `<p>${amountOfUnits}</p>`;

  //  ökar produkter i varukorg
  increaseEl.addEventListener("click", () => {
    // if (products.inStock >= amountOfUnits) { <==denna ska läggas till när stock har definierats.
    amountOfUnits++;
    console.log(amountOfUnits);
    amountEl.innerHTML = `<p>${amountOfUnits}</p>`;
    return amountOfUnits;
    // }
  });

  decreaseEl.addEventListener("click", () => {
    if (0 >= amountOfUnits) {
      amountOfUnits--;
      console.log(amountOfUnits);
      amountEl.innerHTML = `<p>${amountOfUnits}</p>`;
      return amountOfUnits;
    } else {
      console.log("can't go so low");
    }
  });
}
