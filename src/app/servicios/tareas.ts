import { Injectable, signal , computed} from '@angular/core';
import { Tarea } from '../modelos/tarea';

@Injectable({providedIn : 'root'})
export class TareasService {
    private readonly _tareas = signal<Tarea[]>([
        { id: 1, titulo: 'Aprender Angular', estado: false },
        { id: 2, titulo: 'Hacer el commit', estado: true },
        { id: 3, titulo: 'Escribir informe', estado: false },
    ])
    readonly tareas = this._tareas.asReadonly();

    readonly total = computed(() => this._tareas().length);
    readonly completadas = computed(() => this._tareas().filter(t => t.estado).length);
    readonly pendientes = computed(() => this.total() - this.completadas());

}