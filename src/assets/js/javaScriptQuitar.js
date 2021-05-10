/*for (let i = 0; i < document.querySelectorAll("quitarIngredienteCantidad").length; i++) {

    document.querySelectorAll(".quitarIngredienteCantidad")[i].addEventListener("click",'quitarIngredienteCantidad')
}*/
var quita = document.querySelectorAll(".quitarIngredienteCantidad")

for (let i = 0; i < quita.length; i++) {
    quita[i].addEventListener("click", quitarIngredienteCantidad);
}

function quitarIngredienteCantidad(e) {
    for (let i = 0; i < quita.length; i++) {
        if (e.target.className == "btn btn-secondary quitarIngredienteCantidad") {
            (e.target).parentElement.remove()
        } else if (e.target.className == "fas fa-times") {
            ((e.target).parentElement).parentElement.remove()
        }
    }

}

