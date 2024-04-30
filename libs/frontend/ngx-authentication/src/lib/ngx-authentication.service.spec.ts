import { TestBed } from '@angular/core/testing';

import { NgxAuthenticationService } from './ngx-authentication.service';

describe('NgxAuthenticationService', () => {
    let service: NgxAuthenticationService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(NgxAuthenticationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
