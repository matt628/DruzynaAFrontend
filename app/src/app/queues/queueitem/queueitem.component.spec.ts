import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueitemComponent } from './queueitem.component';

describe('QueueitemComponent', () => {
  let component: QueueitemComponent;
  let fixture: ComponentFixture<QueueitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueueitemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueueitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
