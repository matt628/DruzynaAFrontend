import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotuploadComponent } from './botupload.component';

describe('BotuploadComponent', () => {
  let component: BotuploadComponent;
  let fixture: ComponentFixture<BotuploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotuploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BotuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
