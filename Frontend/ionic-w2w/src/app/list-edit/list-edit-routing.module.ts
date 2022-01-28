import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListEditPage } from './list-edit.page';

const routes: Routes = [
  {
    path: '',
    component: ListEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListEditPageRoutingModule {}
