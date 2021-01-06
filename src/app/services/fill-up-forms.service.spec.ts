import { TestBed } from '@angular/core/testing';

import { FillUpFormsService } from './fill-up-forms.service';

describe('FillUpFormsService', () => {
  let service: FillUpFormsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FillUpFormsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
