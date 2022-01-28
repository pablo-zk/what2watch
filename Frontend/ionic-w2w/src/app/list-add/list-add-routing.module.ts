import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListAddPage } from './list-add.page';

const routes: Routes = [
  {
    path: '',
    component: ListAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListAddPageRoutingModule {}
