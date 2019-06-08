import { TestBed } from '@angular/core/testing';

import { RegistratonService } from './registraton.service';

describe('RegistratonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegistratonService = TestBed.get(RegistratonService);
    expect(service).toBeTruthy();
  });
});
