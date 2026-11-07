import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tarjeta-tarea',
  standalone: true,
  templateUrl: './tarjeta-tarea.html', 
  styleUrl: './tarjeta-tarea.css' // o .scss
})
export class TarjetaTareaComponent {

  @Input() tarea: any; 
}