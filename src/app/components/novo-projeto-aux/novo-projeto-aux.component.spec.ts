import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoProjetoAuxComponent } from './novo-projeto-aux.component';

describe('NovoProjetoAuxComponent', () => {
  let component: NovoProjetoAuxComponent;
  let fixture: ComponentFixture<NovoProjetoAuxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovoProjetoAuxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoProjetoAuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
