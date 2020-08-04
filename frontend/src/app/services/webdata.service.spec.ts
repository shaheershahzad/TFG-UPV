import { TestBed } from '@angular/core/testing';

import { WebdataService } from './webdata.service';

describe('WebdataService', () => {
  let service: WebdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
