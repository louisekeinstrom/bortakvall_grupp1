export { };
import { IProductsExt } from "./interfaces";
import { IProducts } from "./interfaces";
import { getAllProducts } from "./externalFetch";

let productsInCart: IProductsExt[] = JSON.parse(localStorage.getItem('products_in_cart') ?? '[]') 
let foundProductInCart: any
let allProductsArr: IProductsExt[] = []
/* allt här är kopierat och modifierat från fetch men fetchar via externalFetch ist */

export const renderStockStatus = (allProductsArr: IProductsExt[], data: any) => { 
  
  // visa antal produkter som renderas varav hur många i lager.
  // behöver även uppdateras när man tar slut på produkter

  // kan man göra det genom att mappa över productsInCart och uppdatera status på allproducts?
  // gör detta i klick-eventen när man lägger till/tar bort från cart.
  // kanske i en funktion som kan exporteras och återanvändas?

    /*//------ Kod som funkar för initial update:
  let arrayLength: number = data.data.length
  let inStock: number = data.data.filter((product: any) => product.stock_status === "instock").length
  document.querySelector('.render-stock-status')!.innerHTML = `Visar ${arrayLength} produkter varav ${inStock} är i lager` 
  */


  // OM produkten finns i productsincart, överför stock_status därifrån till allProductsArr
  // ANNARS OM produkten inte finns i productsincart, ta stock_status från data.data
  

 /*  // Denna kod borde funka men gör det inte. antagligen för att jag inte översatt IProducts till IProductsExt
  allProductsArr = data.data.map((product: IProductsExt) => {
    console.log('allProductsArr', allProductsArr)

    // is product in cart?
    foundProductInCart = productsInCart.find((foundProductInCart: any) => {
      if(product.id === foundProductInCart.id){
        return foundProductInCart
      }
    })
    
    // console.log('foundProductInCart', foundProductInCart)

    // if product is in cart, use its stock_status. if not use original
    console.log(product.stock_status = foundProductInCart ? foundProductInCart.stock_status : product.stock_status)

    return product.stock_status = foundProductInCart ? foundProductInCart.stock_status : product.stock_status
     
  }) */

  //------ Kod som funkar för initial update:
  let arrayLength: number = allProductsArr.length
  let inStock: number = allProductsArr.filter((product: any) => product.stock_status === "instock").length

  // console.log(inStock)

  document.querySelector('.render-stock-status')!.innerHTML = `Visar ${arrayLength} produkter varav ${inStock} är i lager`

}

const renderCatalouge = (data: any) => {
  allProductsArr = data.data.map((product: IProductsExt) => {

		// is product in cart?
		foundProductInCart = productsInCart.find((foundProductInCart: any) => {
			if(product.id === foundProductInCart.id){
				return foundProductInCart
			}
		})
		
		// if product is in cart, use its qty, item total, stock_quantity and stock_status. if not use original
		return {
			id: product.id,
			name: product.name,
			description: product.description,
			price: product.price,
			on_sale: product.on_sale,
			images: {
				thumbnail: product.images.thumbnail,
				large: product.images.large
			},
			stock_status: foundProductInCart ? foundProductInCart.stock_status : product.stock_status, 
			stock_quantity: foundProductInCart ? foundProductInCart.stock_quantity : product.stock_quantity, 
			order_items: 
			{
				product_id: product.id,
				qty: foundProductInCart ? foundProductInCart.order_items.qty : 0, 
				item_price: product.price,
				item_total: foundProductInCart ? foundProductInCart.order_items.item_total : 0, 
			},	
		}
	})

  // console.log(data.data)

  // sort the products alphabetically
  allProductsArr.sort((a: IProductsExt, b: IProductsExt) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  })

  renderStockStatus(allProductsArr, data)


  /* ändra ursprunglig array? eler gör en if sats vad som ska renderas om product in stock status ändras medan man klickar? */

  document.querySelector('.rendering')!.innerHTML = allProductsArr.map((product: IProductsExt) => {
    

    // rendera ut rosa knapp endast om varan är instock
    let pinkBtn = `<i class="cart-icon-container text-light fa-solid fa-cart-plus" data-product-id="${product.id}"></i>`
    
    // if(product.stock_status === "outofstock"  /* && product.stock_quantity <= 0 */){
    //   console.log('returning if-sats')
    //   return pinkBtn = `<i class="cart-icon-hide text-light fa-solid fa-cart-plus"></i>`
      
    // } 

    return `
            <div class="product-container m-3 col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center flex-column">
              ${pinkBtn}
              <img
                src="https://bortakvall.se${product.images.thumbnail}"
                alt="Produkt från Bortakväll"
                class="product-img img-fluid mx-1"
                data-product-id="${product.id}"
              />
              <div
                class="product-name-price-container d-flex justify-content-between my-1"
              >
                <span class="candy-name">${product.name}</span>
                <span class="candy-price-container">
                  <span class="candy-price">${product.price}</span> kr
                </span>
              </div>
              <!--<p class="description-text">${product.description.slice(0,30)}...</p>-->
              <button class="read-more-btn btn btn-secondary" data-product-id="${product.id}">Läs mer</button>
            </div>   
           `
  }).join('')

}

const fetchProducts = async () => {

  try {
    const data: IProducts = await getAllProducts()

    // console.log("Found all products from API: ", data.data)

    // add clicked product to cart-function
    renderCatalouge(data)

  } catch (e) {
    console.log("Something went wrong: ", e)
  }
}

fetchProducts()
