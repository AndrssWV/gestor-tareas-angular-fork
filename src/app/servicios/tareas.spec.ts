import { TestBed } from '@angular/core/testing';
 // O '@angular/common/http/testing' dependiendo de tu versión de Angular
import { provideHttpClient } from '@angular/common/http';
import { TareasService } from './tareas';
import { Tarea } from '../modelos/tarea';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('TareasService', () => {
  let service: TareasService;
  let httpMock: HttpTestingController;

  const urlApi = 'http://localhost:3000/tareas';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TareasService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(TareasService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debería cargar las tareas mediante GET y actualizar los signals', () => {
    const tareasMock: Tarea[] = [
      { id: 1, titulo: 'Estudiar Angular', estado: false },
      { id: 2, titulo: 'Hacer pruebas', estado: true }
    ];

    service.cargar();

    expect(service.cargando()).toBe(true);

    const req = httpMock.expectOne(urlApi);
    expect(req.request.method).toBe('GET');
    req.flush(tareasMock);

    expect(service.cargando()).toBe(false);
    expect(service.tareas()).toEqual(tareasMock);
    expect(service.total()).toBe(2);
    expect(service.completadas()).toBe(1);
    expect(service.pendientes()).toBe(1);
  });

  it('debería manejar el error si falla la carga de tareas', () => {
    service.cargar();

    const req = httpMock.expectOne(urlApi);
    req.error(new ProgressEvent('error'));

    expect(service.cargando()).toBe(false);
    expect(service.error()).toBe('No se pudieron cargar las tareas');
  });

  it('debería agregar una nueva tarea y actualizar la lista', () => {
    const nuevaTarea: Tarea = { id: 3, titulo: 'Nueva tarea', estado: false };

    service.agregar('Nueva tarea').subscribe(tarea => {
      expect(tarea).toEqual(nuevaTarea);
    });

    const req = httpMock.expectOne(urlApi);
    expect(req.request.method).toBe('POST');
    req.flush(nuevaTarea);

    expect(service.total()).toBe(1);
    expect(service.tareas()).toContain(nuevaTarea);
  });

  it('debería eliminar una tarea por su id', () => {
    // Primero simulamos que ya hay una tarea cargada en el signal
    // (Podemos poblarla ejecutando un cargar simulado)
    service.cargar();
    httpMock.expectOne(urlApi).flush([{ id: 1, titulo: 'Borrar', estado: false }]);

    expect(service.total()).toBe(1);

    service.eliminar(1).subscribe();

    const req = httpMock.expectOne(`${urlApi}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});

    expect(service.total()).toBe(0);
  });
});
