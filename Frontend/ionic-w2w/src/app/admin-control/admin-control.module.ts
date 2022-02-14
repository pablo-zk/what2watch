import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminControlPageRoutingModule } from './admin-control-routing.module';

import { AdminControlPage } from './admin-control.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminControlPageRoutingModule
  ],
  declarations: [AdminControlPage]
})
export class AdminControlPageModule {}
