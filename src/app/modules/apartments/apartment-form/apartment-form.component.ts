import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observer } from 'rxjs';
import { FormsService } from '../../core/services/forms.service';
import {
  Apartment,
  PostApartmentForm,
} from '../../core/models/apartment.model';
import { ApartmentsService } from '../../core/services/apartments.service';

@Component({
  selector: 'app-apartment-form',
  templateUrl: './apartment-form.component.html',
  styleUrls: ['./apartment-form.component.scss'],
})
export class ApartmentFormComponent implements OnInit {
  apartmentForm!: FormGroup<PostApartmentForm>;
  errorMessage!: string;
  @Input() editMode = false;
  @Input() apartment!: Apartment;
  @Output() closeDialog = new EventEmitter<void>();
  observer: Observer<unknown> = {
    next: () => {
      this.errorMessage = '';
      if (this.editMode) {
        this.emitCloseDialog();
      }
      this.route.navigate(['/apartamenty']);
    },
    error: () => {
      this.errorMessage = 'Wystąpił błąd';
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    complete: () => {},
  };

  constructor(
    private formsService: FormsService,
    private apartmentsService: ApartmentsService,
    private route: Router,
  ) {}

  get controls() {
    return this.apartmentForm.controls;
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.apartmentForm = new FormGroup({
      name: new FormControl(this.editMode ? this.apartment.name : '', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      location: new FormControl(this.editMode ? this.apartment.location : '', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      image: new FormControl(this.editMode ? this.apartment.image : '', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      area: new FormControl(this.editMode ? this.apartment.area : '', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      floor: new FormControl(this.editMode ? this.apartment.floor : '', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      price: new FormControl(this.editMode ? this.apartment.price : '', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  onAddApartment() {
    if (this.editMode) {
      this.apartmentsService
        .putApartment(this.apartmentForm.getRawValue(), this.apartment.id)
        .subscribe(this.observer);
      return;
    }
    this.apartmentsService
      .postApartment(this.apartmentForm.getRawValue())
      .subscribe(this.observer);
  }

  getErrorMessage(control: FormControl) {
    return this.formsService.getErrorMessage(control);
  }

  emitCloseDialog() {
    this.closeDialog.emit();
  }
}
