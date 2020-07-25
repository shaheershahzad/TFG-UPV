import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileDeleteConfirmationComponent } from './file-delete-confirmation.component';

describe('FileDeleteConfirmationComponent', () => {
  let component: FileDeleteConfirmationComponent;
  let fixture: ComponentFixture<FileDeleteConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileDeleteConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileDeleteConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
