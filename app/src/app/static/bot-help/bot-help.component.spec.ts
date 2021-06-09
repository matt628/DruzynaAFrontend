import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotHelpComponent } from './bot-help.component';

describe('BotHelpComponent', () => {
  let component: BotHelpComponent;
  let fixture: ComponentFixture<BotHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BotHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
