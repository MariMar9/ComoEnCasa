var url = window.location.pathname;
let appFooter = document.querySelector("app-footer");
let appCabecera = document.querySelector("app-cabecera");

function input() {
    $(".custom-file-input").on("change", function () {
        var nombre = $(this).val().split("\\").pop();
        $(this).siblings(".custom-file-label").addClass("selected").html(nombre);
          
    });  
}

input();
