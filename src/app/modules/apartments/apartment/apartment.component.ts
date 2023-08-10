import { Component, OnInit } from '@angular/core';
import { Apartment } from '../../core/models/apartment.model';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ApartmentsService } from '../../core/services/apartments.service';
import { DeleteApartmentDialogComponent } from './delete-apartment-dialog/delete-apartment-dialog.component';
import { EditApartmentDialogComponent } from './edit-apartment-dialog/edit-apartment-dialog.component';

@Component({
  selector: 'app-apartment',
  templateUrl: './apartment.component.html',
  styleUrls: ['./apartment.component.scss'],
})
export class ApartmentComponent implements OnInit {
  apartment!: Apartment;

  constructor(
    private apartmentsService: ApartmentsService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params) =>
          this.apartmentsService.getApartment(+params['id']),
        ),
      )
      .subscribe({
        next: (val) => {
          this.apartment = val;
        },
      });
  }

  openDeleteDialog() {
    const dialogRef = this.dialog.open(DeleteApartmentDialogComponent, {
      data: {
        client: this.apartment,
      },
    });
  }

  openEditDialog() {
    const dialogRef = this.dialog.open(EditApartmentDialogComponent, {
      data: {
        client: this.apartment,
      },
      width: '600px',
      maxWidth: '600px',
    });
  }
}
