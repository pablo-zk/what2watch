import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TvDetailsPageRoutingModule } from './tv-details-routing.module';

import { TvDetailsPage } from './tv-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TvDetailsPageRoutingModule
  ],
  declarations: [TvDetailsPage]
})
export class TvDetailsPageModule {}
