import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportListCard } from './report-list-card';

describe('ReportListCard', () => {
  let component: ReportListCard;
  let fixture: ComponentFixture<ReportListCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportListCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportListCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
