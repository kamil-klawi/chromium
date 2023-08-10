import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteApartmentDialogComponent } from './delete-apartment-dialog.component';

describe('DeleteApartmentDialogComponent', () => {
  let component: DeleteApartmentDialogComponent;
  let fixture: ComponentFixture<DeleteApartmentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteApartmentDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteApartmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
