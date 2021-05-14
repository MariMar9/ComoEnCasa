import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cookies',
  templateUrl: './cookies.component.html',
  styleUrls: ['./cookies.component.css']
})
export class CookiesComponent implements OnInit {

  constructor(private _cookieService: CookieService) { 
    setTimeout(() => {
      if (_cookieService.check("cookies")) {
        document.getElementById("mensajeCookies")!.setAttribute("style", "display: none");
      }
    }, 300);
    
  }

  ngOnInit(): void {
  }

  aceptarCookies(){
    this._cookieService.set('cookies', 'true');
    document.getElementById("mensajeCookies")!.className="ocultar";
  }

  rechazarCookies(){
    this._cookieService.set('cookies', 'false');
    document.getElementById("mensajeCookies")!.className="ocultar";
  }

}
