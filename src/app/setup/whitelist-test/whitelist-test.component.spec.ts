import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhitelistTestComponent } from './whitelist-test.component';

describe('WhitelistTestComponent', () => {
  let component: WhitelistTestComponent;
  let fixture: ComponentFixture<WhitelistTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhitelistTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhitelistTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
