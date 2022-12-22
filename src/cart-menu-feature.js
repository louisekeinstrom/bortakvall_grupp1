"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var cartBtn = document.querySelector(".shopping-cart-btn");
var cartMenu = document.querySelector(".shopping-cart-roll-down");
var increaseEl = document.querySelector(".increase");
var decreaseEl = document.querySelector(".decrease");
var amountEl = document.querySelector(".amount");
var cartProduct = document.querySelector(".cart-product");
var cartIconEl = document.querySelectorAll(".cart-icon-container");
var amountOfProducts = 1;
console.log(amountOfProducts);
var products = [
    {
        id: 0,
        name: "Marabou"
    },
];
//  visar/döljer shoppingvagnen
cartBtn === null || cartBtn === void 0 ? void 0 : cartBtn.addEventListener("click", function (e) {
    cartMenu === null || cartMenu === void 0 ? void 0 : cartMenu.classList.toggle("active");
    e.preventDefault;
});
//  ökar produkter i varukorg
function increaseUnits() {
    increaseEl === null || increaseEl === void 0 ? void 0 : increaseEl.addEventListener("click", function () {
        amountOfProducts++;
        console.log(amountOfProducts);
        amountEl === null || amountEl === void 0 ? void 0 : amountEl.value = "".concat(amountOfProducts);
        return amountOfProducts;
    });
}
;
// minskar produkter i varukorg
function decreaseUnits() {
    decreaseEl === null || decreaseEl === void 0 ? void 0 : decreaseEl.addEventListener("click", function () {
        amountOfProducts--;
        console.log(amountOfProducts);
        amountEl.value = "".concat(amountOfProducts);
        return amountOfProducts;
    });
}
// cart array
var cart = [];
function addToCart(id) {
    // kontrollerar om produkten finns i varukorgen
    if (cart.some(function (item) { return item.id === id; })) {
        var item = products.find(function (product) { return product.id === id; });
        cart.push(__assign(__assign({}, item), { amountOfProducts: 1 }));
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
    cart.forEach(function () {
        cartProduct.innerHTML += "\n        <img\n              class=\"cart-image\"\n              src=\"".concat(products.image, "\"\n              alt=\"Produkt fr\u00E5n Bortakv\u00E4ll\"\n            />\n            <div class=\"cart-description\">\n              <h4 class=\"product-name\">").concat(products.name, "</h4>\n              <div class=\"show-amount-in-cart\">\n                <p class=\"increase\" onclick=\"increaseUnits()\">+</p>\n                <div class=\"amount\" >").concat(products.amountOfProducts, "</div>\n                <p class=\"decrease\" onclick=\"decreaseUnits()\">-</p>\n              </div>\n            </div>");
    });
}
/*
catalogen : för varje obj i katalogen skapas ett kort som visar properties.
Finns även en lägg till i varukorgen-knapp som filtrerar ut varje objekt som klickats på i en enskild array.

I varukorgen visas de objekt som filtrerats ut i bild, namn, pris och under finns en amount of products som ändras med en +/- knapp.
om summan blir 0 tas produkten bort
*/
