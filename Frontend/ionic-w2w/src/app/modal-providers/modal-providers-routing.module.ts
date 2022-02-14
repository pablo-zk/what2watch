import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalProvidersPage } from './modal-providers.page';

const routes: Routes = [
  {
    path: '',
    component: ModalProvidersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalProvidersPageRoutingModule {}
