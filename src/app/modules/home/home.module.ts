import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { AccordionComponent } from './accordion/accordion.component';

@NgModule({
  declarations: [HomeComponent, AccordionComponent],
  imports: [SharedModule, HomeRoutingModule],
  exports: [],
})
export class HomeModule {}
