import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SigninComponent, SignupComponent],
  imports: [SharedModule, AuthRoutingModule],
  exports: [SigninComponent, SignupComponent],
})
export class AuthModule {}
