/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FileLoadService } from './fileLoad.service';

describe('Service: FileLoad', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileLoadService]
    });
  });

  it('should ...', inject([FileLoadService], (service: FileLoadService) => {
    expect(service).toBeTruthy();
  }));
});
