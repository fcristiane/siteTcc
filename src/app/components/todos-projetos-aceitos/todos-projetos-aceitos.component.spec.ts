import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosProjetosAceitosComponent } from './todos-projetos-aceitos.component';

describe('TodosProjetosAceitosComponent', () => {
  let component: TodosProjetosAceitosComponent;
  let fixture: ComponentFixture<TodosProjetosAceitosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodosProjetosAceitosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosProjetosAceitosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
