import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualDoUsuarioComponent } from './manual-do-usuario.component';

describe('ManualDoUsuarioComponent', () => {
  let component: ManualDoUsuarioComponent;
  let fixture: ComponentFixture<ManualDoUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualDoUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualDoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
