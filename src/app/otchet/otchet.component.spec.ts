/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OtchetComponent } from './otchet.component';

describe('OtchetComponent', () => {
  let component: OtchetComponent;
  let fixture: ComponentFixture<OtchetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtchetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtchetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
