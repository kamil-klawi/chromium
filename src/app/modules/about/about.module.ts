import { NgModule } from '@angular/core';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { StepsComponent } from './steps/steps.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AboutComponent, StepsComponent],
  imports: [SharedModule, AboutRoutingModule],
})
export class AboutModule {}
