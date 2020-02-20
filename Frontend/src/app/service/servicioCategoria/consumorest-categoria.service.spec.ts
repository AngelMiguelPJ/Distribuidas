import { TestBed } from '@angular/core/testing';

import { ConsumorestCategoriaService } from './consumorest-categoria.service';

describe('ConsumorestCategoriaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsumorestCategoriaService = TestBed.get(ConsumorestCategoriaService);
    expect(service).toBeTruthy();
  });
});
