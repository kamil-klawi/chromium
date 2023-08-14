import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApartmentsComponent } from './apartments.component';
import { ApartmentFormComponent } from './apartment-form/apartment-form.component';
import { ApartmentComponent } from './apartment/apartment.component';
import { AuthActivateGuard } from '../core/guards/auth-activate.guard';

const routes: Routes = [
  {
    path: '',
    component: ApartmentsComponent,
  },
  {
    path: 'dodaj',
    component: ApartmentFormComponent,
    canActivate: [AuthActivateGuard],
  },
  {
    path: 'usun',
    component: ApartmentsComponent,
    canActivate: [AuthActivateGuard],
  },
  {
    path: ':id',
    component: ApartmentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApartmentsRoutingModule {}
