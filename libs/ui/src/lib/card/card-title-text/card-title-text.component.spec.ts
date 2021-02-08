import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTitleTextComponent } from './card-title-text.component';

describe('CardTitleTextComponent', () => {
  let component: CardTitleTextComponent;
  let fixture: ComponentFixture<CardTitleTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardTitleTextComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardTitleTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
