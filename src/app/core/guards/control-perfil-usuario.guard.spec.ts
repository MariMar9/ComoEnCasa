import { TestBed } from '@angular/core/testing';

import { ControlPerfilUsuarioGuard } from './control-perfil-usuario.guard';

describe('ControlPerfilUsuarioGuard', () => {
  let guard: ControlPerfilUsuarioGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ControlPerfilUsuarioGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
