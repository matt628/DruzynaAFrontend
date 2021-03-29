import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotsItemComponent } from './bots-item.component';

describe('BotsItemComponent', () => {
  let component: BotsItemComponent;
  let fixture: ComponentFixture<BotsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotsItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BotsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
