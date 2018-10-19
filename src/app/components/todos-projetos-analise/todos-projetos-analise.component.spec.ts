import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosProjetosAnaliseComponent } from './todos-projetos-analise.component';

describe('TodosProjetosAnaliseComponent', () => {
  let component: TodosProjetosAnaliseComponent;
  let fixture: ComponentFixture<TodosProjetosAnaliseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodosProjetosAnaliseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosProjetosAnaliseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
