import { TestBed } from '@angular/core/testing';

import { StorefrontService } from './storefront.service';

describe('StorefrontService', () => {
  let service: StorefrontService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorefrontService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
