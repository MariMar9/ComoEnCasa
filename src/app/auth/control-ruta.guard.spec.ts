import { TestBed } from '@angular/core/testing';

import { ControlRutaGuard } from './control-ruta.guard';

describe('ControlRutaGuard', () => {
  let guard: ControlRutaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ControlRutaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
