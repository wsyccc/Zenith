import { TestBed, inject } from '@angular/core/testing';

import { TokenAuthService } from './token-auth.service';

describe('TokenAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenAuthService]
    });
  });

  it('should ...', inject([TokenAuthService], (service: TokenAuthService) => {
    expect(service).toBeTruthy();
  }));
});
