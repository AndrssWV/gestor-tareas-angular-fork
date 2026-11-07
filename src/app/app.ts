import { Component } from '@angular/core';
import { ListaTareasComponent } from './componentes/lista-tareas/lista-tareas'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ListaTareasComponent], 
  templateUrl: './app.html',
  styleUrl: './app.css' 
})
export class App { 
  title = 'gestor-tareas';
}