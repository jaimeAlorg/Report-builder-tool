import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskBar } from './nav-bar';

describe('TaskBar', () => {
  let component: TaskBar;
  let fixture: ComponentFixture<TaskBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskBar]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TaskBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
