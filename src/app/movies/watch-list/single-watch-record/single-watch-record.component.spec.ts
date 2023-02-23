import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleWatchRecordComponent } from './single-watch-record.component';

describe('SingleWatchRecordComponent', () => {
  let component: SingleWatchRecordComponent;
  let fixture: ComponentFixture<SingleWatchRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleWatchRecordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleWatchRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
