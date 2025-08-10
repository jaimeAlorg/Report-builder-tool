import { TestBed } from '@angular/core/testing';
import { ReportService } from './report-service';
import { ReportItemDTO } from '../../models/report-dtos';

describe('ReportService', () => {
  let service: ReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return empty array when no reports in localStorage', (done) => {
    service.getReportList().subscribe(reports => {
      expect(reports).toEqual([]);
      done();
    });
  });

  it('should return null when report not found', () => {
    const result = service.getReportData(999);
    expect(result).toBeNull();
  });

  it('should build mock reports in localStorage when not present', () => {
    service.buildMockReportsInLocalStorage();
    const savedReports = localStorage.getItem('savedReports');
    expect(savedReports).toBeTruthy();
  });

  it('should return empty array when reportDTO is null', (done) => {
    service.buildTableData(null).subscribe(data => {
      expect(data).toEqual([]);
      done();
    });
  });

  it('should save report to localStorage and emit event', (done) => {
    const mockReport: ReportItemDTO = {
      id: 1,
      title: 'Test Report',
      creationDate: '2025-08-10',
      creationTime: '10:00',
      author: 'Test Author'
    };

    service.reportCreated$.subscribe(report => {
      expect(report).toEqual(mockReport);
      done();
    });

    service.saveReportToLocalStorage(mockReport);

    const savedReports = JSON.parse(localStorage.getItem('savedReports') || '[]');
    expect(savedReports).toContain(mockReport);
  });

  it('should generate next available ID', () => {
    const mockReports = [{ id: 1 }, { id: 3 }];
    localStorage.setItem('savedReports', JSON.stringify(mockReports));

    const newId = service.generateReportId();
    expect(newId).toBe(4);
  });
});
