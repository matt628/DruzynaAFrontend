import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePathsHelpComponent } from './game-paths-help.component';

describe('GamePathsHelpComponent', () => {
  let component: GamePathsHelpComponent;
  let fixture: ComponentFixture<GamePathsHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamePathsHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamePathsHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
