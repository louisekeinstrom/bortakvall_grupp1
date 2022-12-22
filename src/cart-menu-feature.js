const request = new XMLHttpRequest();

const getProducts = (callback) => {
  request.addEventListener("readystatechange", () => {
    //   console.log(request, request.readyState);
    if (request.readyState === 4 && request.status === 200) {
      const data = JSON.parse(request.responseText);
      callback(undefined, data);
    } else if (request.readyState === 4) {
      console.log("could not fetch");
    }
  });
};

request.open("GET", "https://www.bortakvall.se/api/products");
request.send();

getProducts((err, data) => {
  console.log("callback fired");
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});

console.log(object.name[0]);

const cartBtn = document.querySelector(".shopping-cart-btn");
const cartMenu = document.querySelector(".shopping-cart-roll-down");

const increaseEl = document.querySelector(".increase");
const decreaseEl = document.querySelector(".decrease");

const amountEl = document.querySelector(".amount");

const cartProduct = document.querySelector(".cart-product");

const cartIconEl = document.querySelectorAll(".cart-icon-container");

let amountOfProducts = 1;

console.log(amountOfProducts);

//  visar/döljer shoppingvagnen
cartBtn.addEventListener("click", (e) => {
  cartMenu.classList.toggle("active");
  e.preventDefault;
});

//  ökar produkter i varukorg
function increaseUnits() {
  increaseEl.addEventListener("click", () => {
    amountOfProducts++;
    console.log(amountOfProducts);
    amountEl.innerHTML = `${amountOfProducts}`;
    return amountOfProducts;
  });
}

// minskar produkter i varukorg
function decreaseUnits() {
  decreaseEl.addEventListener("click", () => {
    amountOfProducts--;
    console.log(amountOfProducts);
    amountEl.innerHTML = `${amountOfProducts}`;
    return amountOfProducts;
  });
}
// cart array

let cart = [];

function addToCart(id) {
  // kontrollerar om produkten finns i varukorgen
  if (cart.some((item) => item.id === id)) {
    const item = object.find((product) => product.id === id);
    cart.push({
      ...item,
      amountOfProducts: 1,
    });
    console.log(item);
  }
  updateCart();
}

function updateCart() {
  renderCartItems();
  // renderSubtotal()
}

function renderCartItems() {
  cartProduct.innerHTML += ""; //detta gör cart-elementet "clear"
  cart.forEach(() => {
    cartProduct.innerHTML += `
        <img
              class="cart-image"
              src="${object.image}"
              alt="Produkt från Bortakväll"
            />
            <div class="cart-description">
              <h4 class="product-name">${object.name}</h4>
              <div class="show-amount-in-cart">
                <p class="increase" onclick="increaseUnits()">+</p>
                <div class="amount" >${object.amountOfProducts}</div>
                <p class="decrease" onclick="decreaseUnits()">-</p>
              </div>
            </div>`;
  });
}

// /*
// catalogen : för varje obj i katalogen skapas ett kort som visar properties.
// Finns även en lägg till i varukorgen-knapp som filtrerar ut varje objekt som klickats på i en enskild array.

// I varukorgen visas de objekt som filtrerats ut i bild, namn, pris och under finns en amount of products som ändras med en +/- knapp.
// om summan blir 0 tas produkten bort
// */
