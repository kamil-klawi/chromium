import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditApartmentDialogComponent } from './edit-apartment-dialog.component';

describe('EditApartmentDialogComponent', () => {
  let component: EditApartmentDialogComponent;
  let fixture: ComponentFixture<EditApartmentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditApartmentDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditApartmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
