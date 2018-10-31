import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoProjetoEditandoAuxComponent } from './novo-projeto-editando-aux.component';

describe('NovoProjetoEditandoAuxComponent', () => {
  let component: NovoProjetoEditandoAuxComponent;
  let fixture: ComponentFixture<NovoProjetoEditandoAuxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovoProjetoEditandoAuxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoProjetoEditandoAuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
