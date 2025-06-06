import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
  nombre: string = '';
  correo: string = '';
  telefono: string = '';
  metodoPago: string = '';

  enviarFormulario() {
    console.log('Formulario enviado:', {
      nombre: this.nombre,
      correo: this.correo,
      telefono: this.telefono,
      metodoPago: this.metodoPago
    });
  }

}