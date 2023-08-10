import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Apartment } from 'src/app/modules/core/models/apartment.model';
import { ApartmentsService } from 'src/app/modules/core/services/apartments.service';

@Component({
  selector: 'app-delete-apartment-dialog',
  templateUrl: './delete-apartment-dialog.component.html',
  styleUrls: ['./delete-apartment-dialog.component.scss'],
})
export class DeleteApartmentDialogComponent implements OnInit {
  apartment!: Apartment;
  errorMessage!: string;

  constructor(
    private dialogRef: MatDialogRef<DeleteApartmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { apartment: Apartment },
    private apartmentsService: ApartmentsService,
    private route: Router,
  ) {}

  ngOnInit(): void {
    this.apartment = this.data.apartment;
  }

  onDelete() {
    this.apartmentsService.deleteApartment(this.apartment.id).subscribe({
      next: () => {
        this.errorMessage = '';
        this.dialogRef.close();
        this.route.navigate(['/apartamenty']);
      },
      error: () => {
        this.errorMessage = 'Wystąpił błąd';
      },
    });
  }
}
