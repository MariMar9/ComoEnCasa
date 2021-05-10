/*var url = window.location.pathname;*/
function input() {
    console.log( $(".custom-file-input"))
    $(".custom-file-input").on("change", function () {
        var nombre = $(this).val().split("\\").pop();
        $(this).siblings(".custom-file-label").addClass("selected").html(nombre);
    });  
}

input();
