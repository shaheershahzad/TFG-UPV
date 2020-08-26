import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebdataManagementComponent } from './webdata-management.component';

describe('WebdataManagementComponent', () => {
  let component: WebdataManagementComponent;
  let fixture: ComponentFixture<WebdataManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebdataManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebdataManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
