import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TruncateModule } from '@yellowspot/ng-truncate';
import { TvDetailsPageRoutingModule } from './tv-details-routing.module';

import { TvDetailsPage } from './tv-details.page';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TvDetailsPageRoutingModule,
    TruncateModule,
    SwiperModule,
  ],
  declarations: [TvDetailsPage],
})
export class TvDetailsPageModule {}
