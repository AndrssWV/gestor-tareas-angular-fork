import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaTareasComponent } from './lista-tareas';
import { TareasService } from '../../servicios/tareas';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest'; // Importación correcta para espías en Vitest

describe('ListaTareasComponent', () => {
  let component: ListaTareasComponent;
  let fixture: ComponentFixture<ListaTareasComponent>;
  let tareasService: TareasService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaTareasComponent],
      providers: [
        TareasService,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaTareasComponent);
    component = fixture.componentInstance;
    tareasService = TestBed.inject(TareasService);
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar a cargar() del servicio al inicializarse (ngOnInit)', () => {
    // Usamos vi.spyOn en lugar de window.spyOn
    const spyCargar = vi.spyOn(tareasService, 'cargar');

    fixture.detectChanges(); // Dispara ngOnInit

    expect(spyCargar).toHaveBeenCalled();
  });

  it('debería filtrar las tareas correctamente según el filtro seleccionado', () => {
    vi.spyOn(tareasService, 'cargar').mockImplementation(() => {});

    component.filtroSeleccionado = 'todo';
    expect(component.filtroSeleccionado).toBe('todo');

    component.filtrar('pendiente');
    expect(component.filtroSeleccionado).toBe('pendiente');

    component.filtrar('completada');
    expect(component.filtroSeleccionado).toBe('completada');
  });
});
