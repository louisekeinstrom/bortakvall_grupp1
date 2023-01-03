export { };

import { IProducts } from "./interfaces";
import { getAllProducts } from "./externalFetch";

/* allt här är kopierat och modifierat från fetch men fetchar via externalFetch ist */

const renderCatalouge = (data: any) => {

        console.log(data.data)

        // visa antal produkter som renderas varav hur många i lager.
        // behöver även uppdateras när man tar slut på produkter
        // kan man göra det genom att mappa över productsInCart och uppdatera status på allproducts?
        // gör detta i klick-eventen när man lägger till/tar bort från cart.
        // kanske i en funktion som kan exporteras och återanvändas?
        let arrayLength: number = data.data.length
        let inStock: number = data.data.filter((product: any) => product.stock_status === "instock").length
        // console.log(inStock)

        document.querySelector('.render-stock-status')!.innerHTML = `Visar ${arrayLength} produkter varav ${inStock} är i lager`

        /* ändra ursprunglig array? eler gör en if sats vad som ska renderas om product in stock status ändras medan man klickar? */
        document.querySelector('.rendering')!.innerHTML = data.data.map((product: IProducts) => {
            return `
            <div class="product-container m-3 col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center flex-column">
              <i class="cart-icon-container text-light fa-solid fa-cart-plus" data-product-id="${product.id}"></i>
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
              <p class="description-text">description</p>
              <button class="read-more-btn btn btn-secondary" data-product-id="${product.id}">Läs mer</button>
            </div>   
           `
        }).join('')

}

const fetchProducts = async () => {

    try {
        const data = await getAllProducts()
    
        // console.log("Found all products from API: ", data.data)
    
        // add clicked product to cart-function
        renderCatalouge(data)
    
    } catch (e) {
       console.log("Something went wrong: ", e)
    }
}

fetchProducts()
