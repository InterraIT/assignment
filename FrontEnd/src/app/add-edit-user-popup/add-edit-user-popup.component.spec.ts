import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditUserPopupComponent } from './add-edit-user-popup.component';

describe('AddEditUserPopupComponent', () => {
  let component: AddEditUserPopupComponent;
  let fixture: ComponentFixture<AddEditUserPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditUserPopupComponent]
    });
    fixture = TestBed.createComponent(AddEditUserPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
