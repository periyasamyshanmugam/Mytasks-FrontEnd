import { TestBed } from '@angular/core/testing';

import { MytaskService } from './mytask.service';

describe('MytaskService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MytaskService = TestBed.get(MytaskService);
    expect(service).toBeTruthy();
  });
});
