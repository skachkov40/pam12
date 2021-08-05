/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CompressorService } from './compressor.service';

describe('Service: Compressor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompressorService]
    });
  });

  it('should ...', inject([CompressorService], (service: CompressorService) => {
    expect(service).toBeTruthy();
  }));
});
