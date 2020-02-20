import { TestBed } from '@angular/core/testing';

import { ConsumorestProductoService } from './consumorest-producto.service';

describe('ConsumorestProductoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsumorestProductoService = TestBed.get(ConsumorestProductoService);
    expect(service).toBeTruthy();
  });
});
