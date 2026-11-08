import { Component, input, Input } from '@angular/core';
import { Tarea } from '../../modelos/tarea';

@Component({
  selector: 'app-tarjeta-tarea',
  standalone: true,
  templateUrl: './tarjeta-tarea.html', 
  styleUrl: './tarjeta-tarea.css' // o .scss
})
export class TarjetaTareaComponent {

  tarea = input.required<Tarea>();
}