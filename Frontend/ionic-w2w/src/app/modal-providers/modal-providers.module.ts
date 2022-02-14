import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalProvidersPageRoutingModule } from './modal-providers-routing.module';

import { ModalProvidersPage } from './modal-providers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalProvidersPageRoutingModule
  ],
  declarations: [ModalProvidersPage]
})
export class ModalProvidersPageModule {}
