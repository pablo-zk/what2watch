import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalAvatarPageRoutingModule } from './modal-avatar-routing.module';

import { ModalAvatarPage } from './modal-avatar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalAvatarPageRoutingModule
  ],
  declarations: [ModalAvatarPage]
})
export class ModalAvatarPageModule {}
