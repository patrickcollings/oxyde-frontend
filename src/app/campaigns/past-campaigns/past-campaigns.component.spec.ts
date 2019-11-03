import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastCampaignsComponent } from './past-campaigns.component';

describe('PastCampaignsComponent', () => {
  let component: PastCampaignsComponent;
  let fixture: ComponentFixture<PastCampaignsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastCampaignsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastCampaignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
