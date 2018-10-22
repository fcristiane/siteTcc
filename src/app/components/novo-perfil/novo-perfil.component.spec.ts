import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoPerfilComponent } from './novo-perfil.component';

describe('NovoPerfilComponent', () => {
  let component: NovoPerfilComponent;
  let fixture: ComponentFixture<NovoPerfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovoPerfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
