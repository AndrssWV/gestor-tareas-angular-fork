import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-detail',
  templateUrl: './detalle-tarea.html',
  styleUrls: ['./detalle-tarea.css']
})
export class DetalleTareaComponent implements OnInit {
  taskId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.taskId = idParam ? +idParam : null;
  }

  goBack(): void {
    this.router.navigate(['/tasks']);
  }
}
