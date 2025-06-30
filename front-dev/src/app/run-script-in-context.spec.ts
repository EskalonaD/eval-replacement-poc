import { TestBed } from '@angular/core/testing';

import { RunScriptInContext } from './run-script-in-context';

describe('RunScriptInContext', () => {
  let service: RunScriptInContext;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RunScriptInContext);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
