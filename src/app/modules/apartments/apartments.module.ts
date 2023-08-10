import { NgModule } from '@angular/core';

import { ApartmentsRoutingModule } from './apartments-routing.module';
import { ApartmentsComponent } from './apartments.component';
import { SharedModule } from '../shared/shared.module';
import { ApartmentComponent } from './apartment/apartment.component';
import { DeleteApartmentDialogComponent } from './apartment/delete-apartment-dialog/delete-apartment-dialog.component';
import { EditApartmentDialogComponent } from './apartment/edit-apartment-dialog/edit-apartment-dialog.component';
import { ApartmentFormComponent } from './apartment-form/apartment-form.component';

import { LOCALE_ID } from '@angular/core';
import localePl from '@angular/common/locales/pl';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localePl);

@NgModule({
  declarations: [
    ApartmentsComponent,
    ApartmentComponent,
    DeleteApartmentDialogComponent,
    EditApartmentDialogComponent,
    ApartmentFormComponent,
  ],
  imports: [SharedModule, ApartmentsRoutingModule],
  providers: [{ provide: LOCALE_ID, useValue: 'pl' }],
})
export class ApartamentsModule {}
