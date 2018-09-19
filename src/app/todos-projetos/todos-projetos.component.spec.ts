import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosProjetosComponent } from './todos-projetos.component';

describe('TodosProjetosComponent', () => {
  let component: TodosProjetosComponent;
  let fixture: ComponentFixture<TodosProjetosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodosProjetosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosProjetosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
