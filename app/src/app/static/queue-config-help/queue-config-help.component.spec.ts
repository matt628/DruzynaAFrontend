import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueConfigHelpComponent } from './queue-config-help.component';

describe('QueueConfigHelpComponent', () => {
  let component: QueueConfigHelpComponent;
  let fixture: ComponentFixture<QueueConfigHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueueConfigHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueueConfigHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
