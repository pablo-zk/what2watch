import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalEpisodePage } from './modal-episode.page';

const routes: Routes = [
  {
    path: '',
    component: ModalEpisodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalEpisodePageRoutingModule {}
