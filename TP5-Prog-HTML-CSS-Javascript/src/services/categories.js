import { categoriaActiva } from "../../main";
import { handleGetProductLocalStorage } from "../persistence/localStorage";
import { handleRenderList } from "../views/store";

/* ===CATEGORIA=== */
const handleFilterProductsByCategory = (categoryIn) =>{
    const products = handleGetProductLocalStorage();
    switch (categoryIn) {
        case categoriaActiva:
            handleRenderList(products);
            break;
        case "Todo":
            handleRenderList(products);
            break;
        case "Hamburguesas":
        case "Papas":
        case "Gaseosas":
            const result = products.filter((el)=> el.categories === categoryIn);
            handleRenderList(result);
        default:
            break;
        case "mayorPrecio":
            const resultPrecioMayor = products.sort((a,b)=> b.precio - a-precio);
            handleRenderList(resultPrecioMayor);
            break;
        case "mayorPrecio":
            const resultPrecioMenor = products.sort((a,b)=> a.precio - b-precio);
            handleRenderList(resultPrecioMenor);
            break;
    }
}


// render de la vista categorias
export const renderCategories = () =>{
    // Tomamos elementos de la lista
    const ulList = document.getElementById("listFilter");
    // Creamos esos elementos dentro de la lista
    ulList.innerHTML = `
    <li class="" id="Todo">Todos los productos</li>
    <li class="" id="Hamburguesas">Hamburguesas</li>
    <li class="" id="Papas">Papas</li>
    <li class="" id="Gaseosas">Gaseosas</li>
    <li class="" id="mayorPrecio">Mayor precio</li>
    <li class="" id="menorPrecio">Menor precio</li>`;
    // Añadimos dinamicamente el evento click
    const liElements = ulList.querySelectorAll("li");
    liElements.forEach((liElement)=>{
        liElement.addEventListener("click", ()=>{
            handleClick(liElement);
        });
    });
    // Verificamos y manejamos el estilo del elemento activo
    const handleClick = (elemento)=>{
        handleFilterProductsByCategory(elemento.id);
        liElements.forEach((el)=>{
            if (el.classList.contains("liActive")) {
                el.classList.remove("liActive");
            }else if(elemento === el){
                el.classList.add("liActive");
            }
        });
    }
}