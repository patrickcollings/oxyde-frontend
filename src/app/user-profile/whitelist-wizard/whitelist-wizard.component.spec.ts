import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhitelistWizardComponent } from './whitelist-wizard.component';

describe('WhitelistWizardComponent', () => {
  let component: WhitelistWizardComponent;
  let fixture: ComponentFixture<WhitelistWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhitelistWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhitelistWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
