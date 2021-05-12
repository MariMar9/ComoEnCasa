import { TestBed } from '@angular/core/testing';

import { GuardarUsuarioService } from './guardar-usuario.service';

describe('GuardarUsuarioService', () => {
  let service: GuardarUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuardarUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
