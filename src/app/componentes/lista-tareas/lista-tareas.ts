import { Component } from '@angular/core';
import { TarjetaTareaComponent } from '../tarjeta-tarea/tarjeta-tarea';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-tareas',
  standalone: true,
  imports: [TarjetaTareaComponent, CommonModule],
  templateUrl: './lista-tareas.html', 
  styleUrl: './lista-tareas.css' // o .scss
})
export class ListaTareasComponent {
  misTareas = [
    { titulo: 'Aprender Angular', estado: 'Pendiente' },
    { titulo: 'Hacer el commit', estado: 'Hecha' },
    { titulo: 'Escribir informe', estado: 'Pendiente' }
  ];
}