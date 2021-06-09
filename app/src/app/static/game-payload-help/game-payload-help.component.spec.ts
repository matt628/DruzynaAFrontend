import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePayloadHelpComponent } from './game-payload-help.component';

describe('GamePayloadHelpComponent', () => {
  let component: GamePayloadHelpComponent;
  let fixture: ComponentFixture<GamePayloadHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamePayloadHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamePayloadHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
