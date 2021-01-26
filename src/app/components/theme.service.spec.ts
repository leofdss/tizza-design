import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(async () => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get default theme', () => {
    expect(service.getThemeName()).toContain('Light');
  });

  afterEach(async () => {
    localStorage.clear();
    sessionStorage.clear();
  });
});
