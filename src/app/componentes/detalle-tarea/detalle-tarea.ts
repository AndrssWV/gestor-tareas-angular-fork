import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalle-tarea',
  templateUrl: './detalle-tarea.html',
  styleUrls: ['./detalle-tarea.css']
})
export class DetalleTareaComponent implements OnInit {
  tareaId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.tareaId = idParam ? +idParam : null;
  }

  regresar(): void {
    this.router.navigate(['/tareas']);
  }
}
