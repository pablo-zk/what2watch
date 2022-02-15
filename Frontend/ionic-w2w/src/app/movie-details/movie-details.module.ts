import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovieDetailsPageRoutingModule } from './movie-details-routing.module';
import { TruncateModule } from '@yellowspot/ng-truncate';
import { MovieDetailsPage } from './movie-details.page';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MovieDetailsPageRoutingModule,
    TruncateModule,
    SwiperModule,
  ],
  declarations: [MovieDetailsPage],
})
export class MovieDetailsPageModule {}
