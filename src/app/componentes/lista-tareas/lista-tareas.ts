import { Component, inject, OnInit, signal } from '@angular/core';
import { TarjetaTareaComponent } from '../tarjeta-tarea/tarjeta-tarea';
import { TareasService } from '../../servicios/tareas';
import { Tarea } from '../../modelos/tarea';

@Component({
  selector: 'app-lista-tareas',
  imports: [TarjetaTareaComponent],
  templateUrl: './lista-tareas.html',
  styleUrl: './lista-tareas.css',
})
export class ListaTareasComponent implements OnInit {
  protected readonly tareasService = inject(TareasService);
  protected readonly errorAccion = signal<string | null>(null);

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

  // Observador reutilizable: limpia el error si sale bien, lo muestra si falla
  private observador(accion: string) {
    return {
      next: () => this.errorAccion.set(null),
      error: () => this.errorAccion.set(`No se pudo ${accion} la tarea`),
    };
  }
}