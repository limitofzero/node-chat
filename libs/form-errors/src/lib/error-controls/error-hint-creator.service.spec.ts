import { TestBed } from "@angular/core/testing";

import { ErrorHintCreatorService } from "./error-hint-creator.service";

describe("ErrorHintCreatorService", () => {
  let service: ErrorHintCreatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorHintCreatorService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
