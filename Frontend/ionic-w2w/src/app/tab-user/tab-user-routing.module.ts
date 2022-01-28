import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabUserPage } from './tab-user.page';

const routes: Routes = [
  {
    path: '',
    component: TabUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabUserPageRoutingModule {}
