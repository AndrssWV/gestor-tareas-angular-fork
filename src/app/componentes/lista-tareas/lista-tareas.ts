import { Component, inject } from '@angular/core';
import { TarjetaTareaComponent } from '../tarjeta-tarea/tarjeta-tarea';
import {TareasService} from '../../servicios/tareas';

@Component({
  selector: 'app-lista-tareas',
  standalone: true,
  imports: [TarjetaTareaComponent],
  templateUrl: './lista-tareas.html', 
  styleUrl: './lista-tareas.css' // o .scss
})
export class ListaTareasComponent {
    protected readonly tareasService = inject(TareasService);
}