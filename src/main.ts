export { };
import { IProducts } from "./interfaces";
import { renderProducts } from "./fetch";
import { fetchProducts } from "./fetchWithInterface";

//fetchProducts()
//getProducts()
let interProducts: IProducts[] = []


const getTodos = async () => {
    // Fetch todos from server and update local copy
    interProducts = await fetchProducts()

    // Render todos
    renderTodos()
}
renderProducts()






























