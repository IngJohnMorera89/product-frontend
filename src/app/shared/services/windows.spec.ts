import { TestBed } from '@angular/core/testing';

import { Windows } from './windows';

describe('Windows', () => {
  let service: Windows;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Windows);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
