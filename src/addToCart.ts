export { }
import "./interfaces"
import "./fetch"
import "./popup"
import { fetchProducts } from "./fetchWithInterface"
import { IProductsExt } from "./interfaces";

const cartEL = document.querySelector(".cart-product")
const cartIconEl = Array.from(document.querySelectorAll(".cart-icon-container"))
let cartItem = JSON.parse(localStorage.getItem("products_in_cart")?? '[]')

const cartBtn = document.querySelector(".shopping-cart-btn"); //knapp för cart
const cartMenu = document.querySelector(".cart-product"); //cart

//  visar/döljer shoppingvagnen
cartBtn!.addEventListener("click", (e) => {
    cartMenu!.classList.toggle("active");
   // e.preventDefault;
  });

console.log(cartItem)

// array för mängd produkter i cart
let amountOfProductsInCart = cartItem.map((product:number) => {
    return product.order_items.qty
})

// array för priserna
let totalPrice = cartItem.map((product:any) => {
    return product.price
})

//räknar ihop priset på varorna
let sum = 0

for (let i = 0; i < totalPrice.length; i++) {
    sum += totalPrice[i] * amountOfProductsInCart[i];
}

// funktion för att synligt rendera ut produkten i varukorgen   
    cartItem.forEach((product:any) => {
    cartEL!.innerHTML += `
    <div>
    <i class="fa-solid fa-xmark deleteBtn" dataset-id="${product.id}"></i>
        <img src="https://bortakvall.se${product.images.large}" alt="Produkt från Bortakväll" class="img-fluid mh-sm-50 m-3 popup-img" />
            <h2 class="candy-name mt-3">${product.name}</h2>
				<p>Pris <span>${product.price}</span> kr</p>
                    <div>
                        <p class ="increase">+</p>
                        <p class ="showAmount">${product.order_items.qty}</p>
                        <p class ="decrease">-</p>
					</div>
    </div>
    `   
    const deleteBtn = Array.from(document.querySelectorAll(".deleteBtn"))
    deleteBtn.forEach((deleteBtn) => {
        deleteBtn.addEventListener('click', (event) => {
            //const productId = event.target.dataset.productId!;
            //deleteProductFromCart(productId);
            console.log('works?')
            deleteProductFromCart(product.id)
            //updateCartDisplay()
    
    
        });
    })

   });

  // document.querySelector(".total-amount").innerHTML += `Totalt: ${sum} kr`

   const increaseEl = Array.from(document.querySelectorAll(".increase"))
   console.log(increaseEl)

   const decreaseEl = Array.from(document.querySelectorAll(".decrease"))

   console.log(decreaseEl)


   let amountOfProducts = cartItem.map((product:number) => {
    return product.order_items.qty
   })
   console.log(amountOfProducts)

//    för att öka produkter i varukorg 
/*
increaseEl.forEach(()=> {
    addEventListener("click", (product) => {
    console.log("yay u increased")
   // product.order_items.qty[i]++
   // console.log(product.order_items.qty)
    })
})
   //    för att minska produkter i varukorg
   decreaseEl!.forEach((e) => {
    e.addEventListener("click", () => {
    console.log("yay u decreased")
    })
   })*/


/*
   const deleteProductFromCart = (productId: string) => {
    // hitta rätt produkt som ska tas bort
    const productIndex = cartItem.findIndex((product) => product.id === productId);
  
    // ta bort från cart(synns inte ännu , men i console)
    cartItem.splice(productIndex, 1);
  
    // Updatera local storage
    localStorage.setItem('products_in_cart', JSON.stringify(cartItem));
    console.log('deletefromcart')
  }*/
  /*
  const deleteProductFromCart = (productId: number) => {
    // hitta rätt produkt(funkar inte, raderar bara sista)
    const productIndex = cartItem.findIndex((product: { id: number }) => product.id === productId);
    
    // Delete the product from the cartItem array
    cartItem.pop(productIndex);
    
    // Update the localStorage with the updated cartItem array
    localStorage.setItem("products_in_cart", JSON.stringify(cartItem));
  }*/
  
  const deleteProductFromCart = (productId: IProductsExt) => {
    // hitta rätt produkt som ska tas bort
    const productIndex:IProductsExt = cartItem.findIndex((product: IProductsExt) => productId.id === productId.id)//product.id === productId);
    console.log(productIndex)
  
    // ta bort från cart(synns inte ännu , men i console)
    cartItem.splice(productIndex, 1);
    localStorage.setItem("products_in_cart", JSON.stringify(cartItem));
  
    // uppdatera cart display
    updateCartDisplay();
  };

/*
  const updateCartDisplay =()=> {
    // Clear the cart display
    cartEL!.innerHTML = '';
  
    // Re-render the cart items
    cartItem.forEach((product: any) => {
      cartEL!.innerHTML += `
        <div>
          <i class="fa-solid fa-xmark deleteBtn" data-product-id="${product.id}"></i>
          <img src="https://bortakvall.se${product.images.large}" alt="Produkt från Bortakväll" class="img-fluid mh-sm-50 m-3 popup-img" />
          <h2 class="candy-name mt-3">${product.name}</h2>
          <p>Pris <span>${product.price}</span> kr</p>
          <div>
            <p class="increase">+</p>
            <p class="showAmount">${product.order_items.qty}</p>
            <p class="decrease">-</p>
          </div>
        </div>
      `
    })
  }
  */
  const updateCartDisplay = () => {
    // Clear the cart display
    while (cartEL!.firstChild) {
      cartEL!.removeChild(cartEL!.firstChild);
    }
  
    // Re-render the cart items
    cartItem.forEach((product: any) => {
      const productEl = document.createElement('div');
      productEl.innerHTML = `
        <i class="fa-solid fa-xmark deleteBtn" data-product-id="${product.id}"></i>
        <img src="https://bortakvall.se${product.images.large}" alt="Produkt från Bortakväll" class="img-fluid mh-sm-50 m-3 popup-img" />
        <h2 class="candy-name mt-3">${product.name}</h2>
        <p>Pris <span>${product.price}</span> kr</p>
        <div>
          <p class="increase">+</p>
          <p class="showAmount">${product.order_items.qty}</p>
          <p class="decrease">-</p>
        </div>
      `
      cartEL!.appendChild(productEl);
    });
  }
  
  /*const attachDeleteEventListeners = () => {
    const deleteBtns = Array.from(document.querySelectorAll(".deleteBtn"))
  
    deleteBtns.forEach((btn) => {
      btn.addEventListener("click", (event) => {
        console.log('second function')
        /*const productId = event.target.dataset.productId
        console.log(productId) 
        console.log('deletebtn')
        deleteProductFromCart(productId)
        updateCartDisplay()*/
    /*    if (event.target.dataset) {
            const productId = event.target.dataset.productId;
            deleteProductFromCart(productId);
        console.log(productId) 

            updateCartDisplay();
            }
            //deleteProductFromCart('p')
            updateCartDisplay()
      });
    });
  }
  
  attachDeleteEventListeners();
*/

//const deleteBtn = Array.from(document.querySelectorAll(".deleteBtn"))
/*
deleteBtn.forEach((button) => {
  button.addEventListener("click", (event) => {
    if (event.target.dataset) {
      const productId = event.target.dataset.productId;
      deleteProductFromCart(productId);
      updateCartDisplay();
    }
  });
});*/




   //const deleteBtns = document.querySelectorAll('.fa-solid.fa-xmark[data-product-id]');
   /*const deleteBtns = Array.from(document.querySelectorAll(".deleteBtn"))
   
   deleteBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
        console.log('second function')
      const productId = event.target.dataset.productId
      deleteProductFromCart(productId)
      updateCartDisplay()

    });
  });*/
   /*
   deleteBtns.forEach((deleteBtn) => {
       deleteBtn.addEventListener('click', (event) => {
           //const productId = event.target.dataset.productId!;
           //deleteProductFromCart(productId);
           console.log('works?')
           deleteProductFromCart('p')
           updateCartDisplay()
   
   
       });
   });*/
//    productsInCart.map(productInCart => {

//     // rendering OM produkten är slut i stock
//     if(product.id === productInCart.id && productInCart.stock_status === "outofstock"){
//         increaseEl = 'disabled'
//         alert("Finns ej fler i lager") 

//         return increaseEl

//         // rendering om produkten finns i lager och redan är i varukorgen
//     }else if(){

//     }else(product.id === productInCart.id){
        
//     }

// })