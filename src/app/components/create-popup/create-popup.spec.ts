import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePopup } from './create-popup';

describe('CreatePopup', () => {
  let component: CreatePopup;
  let fixture: ComponentFixture<CreatePopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePopup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePopup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
