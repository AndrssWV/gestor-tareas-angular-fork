import { Component, inject, OnInit, signal } from '@angular/core';
import { TarjetaTareaComponent } from '../tarjeta-tarea/tarjeta-tarea';
import { TareasService } from '../../servicios/tareas';
import { Tarea } from '../../modelos/tarea';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lista-tareas',
  imports: [TarjetaTareaComponent, CommonModule, FormsModule, RouterLink],
  templateUrl: './lista-tareas.html',
  styleUrl: './lista-tareas.css',
})
export class ListaTareasComponent implements OnInit {
  protected readonly tareasService = inject(TareasService);
  protected readonly errorAccion = signal<string | null>(null);

  filtroSeleccionado: 'todo' | 'pendiente' | 'completada' = 'todo';

  get tareasFiltradas(): Tarea[] {
    if (this.filtroSeleccionado === 'pendiente') {
      return this.tareasService.tareas().filter(tarea => !tarea.estado);
    }
    if (this.filtroSeleccionado === 'completada') {
      return this.tareasService.tareas().filter(tarea => tarea.estado);
    }
    return this.tareasService.tareas();
  }

  filtrar(filter: 'todo' | 'pendiente' | 'completada'): void {
    this.filtroSeleccionado = filter;
  }

  ngOnInit(): void {
    this.tareasService.cargar();
  }

  protected agregar(titulo: string): void {
    const limpio = titulo.trim();
    if (!limpio) return;
    this.tareasService.agregar(limpio).subscribe(this.observador('crear'));
  }

  protected alternar(tarea: Tarea): void {
    this.tareasService.alternarCompletada(tarea).subscribe(this.observador('actualizar'));
  }

  protected editar(evento: { tarea: Tarea; titulo: string }): void {
    this.tareasService.editarTitulo(evento.tarea, evento.titulo).subscribe(this.observador('editar'));
  }

  protected eliminar(id: number): void {
    this.tareasService.eliminar(id).subscribe(this.observador('eliminar'));
  }

  private observador(accion: string) {
    return {
      next: () => this.errorAccion.set(null),
      error: () => this.errorAccion.set(`No se pudo ${accion} la tarea`),
    };
  }
}
