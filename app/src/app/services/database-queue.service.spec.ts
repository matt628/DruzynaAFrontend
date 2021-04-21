import { TestBed } from '@angular/core/testing';

import { DatabaseQueueService } from './database-queue.service';

describe('DatabaseQueueService', () => {
  let service: DatabaseQueueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatabaseQueueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
