import { TestBed } from '@angular/core/testing';

import { DatabaseGamesService } from './database-games.service';

describe('DatabaseGamesService', () => {
  let service: DatabaseGamesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatabaseGamesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
