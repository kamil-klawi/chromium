import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Apartment } from 'src/app/modules/core/models/apartment.model';

@Component({
  selector: 'app-edit-apartment-dialog',
  templateUrl: './edit-apartment-dialog.component.html',
  styleUrls: ['./edit-apartment-dialog.component.scss'],
})
export class EditApartmentDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<EditApartmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { apartment: Apartment },
  ) {}

  closeEditDialog() {
    this.dialogRef.close();
  }
}
