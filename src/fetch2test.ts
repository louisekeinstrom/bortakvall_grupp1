export{}
import { IProducts } from "./interfaces";
// import { fetchProducts } from "./fetch";


const renderCatalog = (products: IProducts[]) => {
    
    products.forEach(product => {
        (document.querySelector('#product-catalog') as HTMLElement).innerHTML = `
        <div
            class="product-container m-3 col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center flex-column"
        >
            <i class="cart-icon-container text-light fa-solid fa-cart-plus"></i>
            <img
              src="${product.images.thumbnail}"
              alt="Produkt från Bortakväll"
              class="product-img img-fluid mx-1"
            />
            <div
              class="product-name-price-container d-flex justify-content-between my-1"
            >
              <span class="candy-name">${product.name}</span>
              <span class="candy-price-container">
                <span class="candy-price">${product.price}</span> kr
              </span>
            </div>
            <p class="description-text">${product.description}
            </p>
            <button class="read-more-btn btn btn-secondary">Läs mer</button>
          </div>

          `
    })
    
}

// skriv om denna till att hämta godiset ✅
// försök sedan att console-logga det. kom ihåg att länka in detta script i html-en ✅
// rendera sedan ut godiset till dom (i render-katalog.ts)
const get= async (url: RequestInfo) => {

    const response = await fetch(url);
    if(!response.ok) {
        throw new Error(`Response was not OK! Status returned was: "${response.status} ${response.statusText}".`);
    }

    return await response.json();
    
}

const getProducts= async () => {
    try{
        const products: IProducts[] = await get('https://bortakvall.se/api/products');
        console.log(products)

        renderCatalog(products)

    } catch (err) {
        console.log("Caught the error: ", err);
    }
    
    
    // setAttribute('src', `https://cataas.com/${cat.url}`); 

}



getProducts();