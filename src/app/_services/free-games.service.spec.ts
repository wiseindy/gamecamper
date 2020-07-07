import { TestBed } from '@angular/core/testing';

import { FreeGamesService } from './free-games.service';

describe('FreeGamesService', () => {
  let service: FreeGamesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FreeGamesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
