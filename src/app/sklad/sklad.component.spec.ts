/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SkladComponent } from './sklad.component';

describe('SkladComponent', () => {
  let component: SkladComponent;
  let fixture: ComponentFixture<SkladComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkladComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkladComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
