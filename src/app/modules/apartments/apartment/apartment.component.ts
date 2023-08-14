import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apartment } from '../../core/models/apartment.model';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { ApartmentsService } from '../../core/services/apartments.service';
import { DeleteApartmentDialogComponent } from './delete-apartment-dialog/delete-apartment-dialog.component';
import { EditApartmentDialogComponent } from './edit-apartment-dialog/edit-apartment-dialog.component';
import { User } from '../../core/models/user.model';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-apartment',
  templateUrl: './apartment.component.html',
  styleUrls: ['./apartment.component.scss'],
})
export class ApartmentComponent implements OnInit, OnDestroy {
  user: User | null = null;
  sub!: Subscription;
  apartment!: Apartment;

  constructor(
    private apartmentsService: ApartmentsService,
    private authService: AuthService,
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

    this.sub = this.authService.user.subscribe({
      next: (val) => (this.user = val),
    });
  }

  openDeleteDialog() {
    const dialogRef = this.dialog.open(DeleteApartmentDialogComponent, {
      data: {
        apartment: this.apartment,
      },
    });
  }

  openEditDialog() {
    const dialogRef = this.dialog.open(EditApartmentDialogComponent, {
      data: {
        apartment: this.apartment,
      },
      width: '600px',
      maxWidth: '600px',
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
