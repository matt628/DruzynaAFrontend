import { TestBed } from '@angular/core/testing';

import { DatabaseBotsService } from './database-bots.service';

describe('DatabaseBotsService', () => {
  let service: DatabaseBotsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatabaseBotsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
