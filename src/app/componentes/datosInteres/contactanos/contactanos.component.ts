import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrls: ['./contactanos.component.css'],
})
export class ContactanosComponent implements OnInit {
  /* variables para el formulario reactivo*/
  form: FormGroup;
  name: FormControl = new FormControl('', Validators.required);
  email: FormControl = new FormControl('',Validators.compose([Validators.email, Validators.required])
  );
  message: FormControl = new FormControl('',Validators.compose([Validators.required, Validators.maxLength(256)])
  );
  honeypot: FormControl = new FormControl(''); //previene el span (pulsar varias veces)
  submitted: boolean = false; // muestra y oculta el mensaje de la peticióm
  isLoading: boolean = false;
  responseMessage: string = ''; // muestra el contenido del mensaje al usuario
 
  /**
   * @description Contructor de contactanos
   * @param formBuilder: recibe los datos del formulario para crear el objeto del formulario reactivo 
   * @param http: recibe la ruta de la api de google mail   
   */
  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    /**creamos el objeto de nuestro formulario con los datos del usuario */
    this.form = this.formBuilder.group({
      name: this.name,
      email: this.email,
      message: this.message,
      honeypot: this.honeypot,
    });
    
  }
  ngOnInit(): void {}
  
  /**
   * @description manda la información a la api de google mail y valida los datos introducidos
   */
  onSubmit() {
    /**validamos primero los datos del usuario*/
    if (this.form.status == 'VALID' && this.honeypot.value == '') {
      this.form.disable(); //deshabilita el botón para evitar que pulsen varias veces
      var formData: any = new FormData();
      formData.append('name', this.form.get('name')!.value);
      formData.append('email', this.form.get('email')!.value);
      formData.append('message', this.form.get('message')!.value);
      this.isLoading = true; //manda la petición asíncrona
      this.submitted = false; // evita que puedan pulsar el botón varias veces
      /**deshabilita el botón del submit mientras procesa la petición*/
      if(this.isLoading=true){
        let boton = <HTMLButtonElement>document.querySelector('.btn-estilos');
        boton.removeAttribute('style')
      }
      /*hacemos al cliente de la api google mail */
      this.http
        .post(
          'https://script.google.com/macros/s/AKfycbz4cufdhAdAdUrX9zR5baQnLGZmDdtC-oONCI8h/exec',
          formData
        )
        /*con el método suscribe enviamos la información*/
        .subscribe(
          /**si todo es correcto */
          (response) => {
            var exito = Object.values(response)[0];
            if (exito == 'success') {
              this.responseMessage = '¡Gracias por el mensaje!';
            } else {
              this.responseMessage = 'Ups! ha ocurrido un error...';
            }
            this.form.enable(); // si tiene éxito habilita el formulario
            this.submitted = true; // muestra el mensaja de éxito
            this.isLoading = false; //habilita el botón
          },
          /**si ha habido algún erro en la validación o al procesar la petición*/
          (error) => {
            this.responseMessage = 'Ups! ha ocurrido un error...';
            this.form.enable(); //si no tiene éxito habilita el formulario
            this.submitted = true; // muestra el mensaja de error
            this.isLoading = false; // habilita el botón
          }
        );
    }
  }
}