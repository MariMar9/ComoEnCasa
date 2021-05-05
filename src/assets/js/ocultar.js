 var url = window.location.pathname;
   let appFooter = document.querySelector("app-footer");
   let appCabecera = document.querySelector("app-cabecera");

function ocultarCabeceraYfooter(){
   if(url=="/iniciarSesion" || url=="/registro"){
    appFooter.setAttribute("style","display:none");
    appCabecera.setAttribute("style","display:none");
}else{
    appFooter.setAttribute("style","display:''");
    appCabecera.setAttribute("style","display:''");
}
}

ocultarCabeceraYfooter();
