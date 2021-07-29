/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WritemsgComponent } from './writemsg.component';

describe('WritemsgComponent', () => {
  let component: WritemsgComponent;
  let fixture: ComponentFixture<WritemsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WritemsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WritemsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
