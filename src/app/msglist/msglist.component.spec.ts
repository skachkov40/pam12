import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsglistComponent } from './msglist.component';

describe('MsglistComponent', () => {
  let component: MsglistComponent;
  let fixture: ComponentFixture<MsglistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsglistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
