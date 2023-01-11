export { }
import { IProductsExt } from "./interfaces"

/* hämta från localStorage() */
let productsInCart: IProductsExt[] = JSON.parse(localStorage.getItem('products_in_cart') ?? '[]')

const overview = document.querySelector('.product-in-overview')
const total = document.querySelector('.products-total')

/* rendera ut i kassan */
const renderKassa = () => {
  productsInCart = JSON.parse(localStorage.getItem('products_in_cart') ?? '[]')
  // each product
  productsInCart.sort((a: IProductsExt, b: IProductsExt) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }).map(product => {
    console.log(productsInCart);


    /*  // om vi kan få in bilderna, ändra så att product-name får col-5 igen
     // och lägg detta på översta raden:
     <div class="col-1">
         <p class="product-list">
           <img class="img-fluid" id="product-img" src="${product.images.thumbnail}">
         </p>
     </div> */
    (overview as HTMLDivElement)!.innerHTML += `
       
        <div class="col-6">
          <p class="product-list">
            <span id="product-name">${product.name}</span>
          </p>
        </div>
        <div class="col-2">
          <p class="product-list">
            <i>${product.price} kr</i> 
          </p>
        </div>
        <div class="col-2">
          <p class="product-list">
            ${product.order_items.qty} st
          </p>
        </div>
        <div class="col-2">
          <p class="product-list">
            ${product.order_items.item_total} kr
          </p>
        </div>
        `
  });

  const reduceAmount = productsInCart.reduce((sum: any, product: any) => {
    return sum + product.order_items.qty
  }, 0);
  const reduceSum = productsInCart.reduce((sum: any, product: any) => {
    return sum + product.order_items.item_total
  }, 0);
  // total of products
  (total as HTMLDivElement).innerHTML = `
    <div class="col-8">
      <h6>Total</h6>
    </div>
    <div class="col-2">
      <h6>${reduceAmount} st</h6>
    </div>
    <div class="col-2">
      <h6>${reduceSum} kr</h6>
    </div>
    `

}

renderKassa()