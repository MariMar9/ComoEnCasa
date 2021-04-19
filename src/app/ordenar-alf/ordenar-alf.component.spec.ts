import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenarAlfComponent } from './ordenar-alf.component';

describe('OrdenarAlfComponent', () => {
  let component: OrdenarAlfComponent;
  let fixture: ComponentFixture<OrdenarAlfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdenarAlfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenarAlfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
