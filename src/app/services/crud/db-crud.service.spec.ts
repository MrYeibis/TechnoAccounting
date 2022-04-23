import { TestBed } from '@angular/core/testing';

import { DbCrudService } from './db-crud.service';

describe('DbCrudService', () => {
  let service: DbCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
