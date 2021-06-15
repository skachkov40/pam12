import { TestBed } from '@angular/core/testing';

import { MsggetService } from './msgget.service';

describe('MsggetService', () => {
  let service: MsggetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MsggetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
