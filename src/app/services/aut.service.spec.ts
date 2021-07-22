/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AutService } from './aut.service';

describe('Service: Aut', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutService]
    });
  });

  it('should ...', inject([AutService], (service: AutService) => {
    expect(service).toBeTruthy();
  }));
});
