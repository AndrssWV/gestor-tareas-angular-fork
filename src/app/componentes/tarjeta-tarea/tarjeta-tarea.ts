import { Component, input, output, signal } from '@angular/core';
import { Tarea } from '../../modelos/tarea';

@Component({
  selector: 'app-tarjeta-tarea',
  standalone: true,
  templateUrl: './tarjeta-tarea.html',
  styleUrl: './tarjeta-tarea.css'
})
export class TarjetaTareaComponent {

  tarea = input.required<Tarea>();

  alternar = output<Tarea>();
  eliminar = output<number>();
  guardar = output<{tarea: Tarea, titulo: string}>();

  protected readonly editando = signal(false);

  protected guardarEdicion(titulo : string): void{
    const limpio = titulo.trim();
    if (limpio && limpio !== this.tarea().titulo) {
      this.guardar.emit({ tarea: this.tarea(), titulo: limpio });
    }
    this.editando.set(false);
  }
}
