import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminControlPage } from './admin-control.page';

const routes: Routes = [
  {
    path: '',
    component: AdminControlPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminControlPageRoutingModule {}
