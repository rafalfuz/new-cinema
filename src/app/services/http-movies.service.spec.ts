import { TestBed } from '@angular/core/testing';

import { HttpMoviesService } from './http-movies.service';

describe('HttpMoviesService', () => {
  let service: HttpMoviesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpMoviesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
