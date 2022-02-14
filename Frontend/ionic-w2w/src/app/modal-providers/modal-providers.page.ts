import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-providers',
  templateUrl: './modal-providers.page.html',
  styleUrls: ['./modal-providers.page.scss'],
})
export class ModalProvidersPage implements OnInit {
  id;

  constructor() {}

  ngOnInit() {
    console.log(this.id);
  }
}
