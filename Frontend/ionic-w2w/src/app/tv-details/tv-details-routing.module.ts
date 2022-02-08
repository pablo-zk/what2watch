import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TvDetailsPage } from './tv-details.page';

const routes: Routes = [
  {
    path: '',
    component: TvDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TvDetailsPageRoutingModule {}
