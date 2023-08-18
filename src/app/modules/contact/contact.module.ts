import { NgModule } from '@angular/core';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { SharedModule } from '../shared/shared.module';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [ContactComponent, ListComponent],
  imports: [SharedModule, ContactRoutingModule],
})
export class ContactModule {}
