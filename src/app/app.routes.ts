import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleTareaComponent } from './componentes/detalle-tarea/detalle-tarea';
import { ListaTareasComponent } from './componentes/lista-tareas/lista-tareas';

const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: 'tareas', component: ListaTareasComponent },
  { path: 'tareas/:id', component: DetalleTareaComponent },
  { path: '**', redirectTo: '/tasks' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
