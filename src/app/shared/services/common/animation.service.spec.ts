import { TestBed } from '@angular/core/testing';
import { AnimationService } from "@portfolio/shared/services/common/animation.service";

describe('AnimationService', () => {
  let service: AnimationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});