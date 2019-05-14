import { TestBed } from '@angular/core/testing';

import { TokenEventService } from './token-event.service';

describe('TokenEventService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TokenEventService = TestBed.get(TokenEventService);
    expect(service).toBeTruthy();
  });
});
