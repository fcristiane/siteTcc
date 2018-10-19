import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosProjetosReprovadosComponent } from './todos-projetos-reprovados.component';

describe('TodosProjetosReprovadosComponent', () => {
  let component: TodosProjetosReprovadosComponent;
  let fixture: ComponentFixture<TodosProjetosReprovadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodosProjetosReprovadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosProjetosReprovadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
