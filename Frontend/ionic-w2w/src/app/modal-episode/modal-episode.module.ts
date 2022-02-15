import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalEpisodePageRoutingModule } from './modal-episode-routing.module';

import { ModalEpisodePage } from './modal-episode.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalEpisodePageRoutingModule
  ],
  declarations: [ModalEpisodePage]
})
export class ModalEpisodePageModule {}
