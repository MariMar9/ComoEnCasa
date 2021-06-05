import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cookies',
  templateUrl: './cookies.component.html',
  styleUrls: ['./cookies.component.css'],
})
export class CookiesComponent implements OnInit {
  /**
   *
   * @param _cookieService: service cookie
   */
  constructor(private _cookieService: CookieService) {
    setTimeout(() => {
      //verifica si exinten cookies, si no existen y no se ha aceptado o rechazado las muestra
      if (!_cookieService.check('cookies')) {
        document
          .getElementById('contenedorCookie')!
          .setAttribute('style', 'display: block');
      }
    }, 1000);
  }

  ngOnInit(): void {}
  /**
   * @description crea la cookie y la oculta en caso de pulsar aceptar 
   */
  aceptarCookies() {
    this._cookieService.set('cookies', 'true', 365);
    document.getElementById('contenedorCookie')!.className =
      'container-fluid ocultar';
    setTimeout(() => {
      document
        .getElementById('contenedorCookie')!
        .setAttribute('style', 'display: none');
    }, 1900);
  }

  /**
   * @description no crea la cookie y la oculta en caso de pulsar rechazar 
   */
  rechazarCookies() {
    this._cookieService.set('cookies', 'false');
    document.getElementById('contenedorCookie')!.className =
      'container-fluid ocultar';
    setTimeout(() => {
      document
        .getElementById('contenedorCookie')!
        .setAttribute('style', 'display: none');
    }, 1900);
  }
}
