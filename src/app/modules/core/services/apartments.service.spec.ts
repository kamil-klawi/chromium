import { TestBed } from '@angular/core/testing';

import { ApartamentsService } from './apartments.service';

describe('ApartamentsService', () => {
  let service: ApartamentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApartamentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
