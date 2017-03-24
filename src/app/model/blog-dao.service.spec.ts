/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BlogDaoService } from './blog-dao.service';

describe('BlogDaoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlogDaoService]
    });
  });

  it('should ...', inject([BlogDaoService], (service: BlogDaoService) => {
    expect(service).toBeTruthy();
  }));
});
