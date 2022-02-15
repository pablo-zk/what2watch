import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-episode',
  templateUrl: './modal-episode.page.html',
  styleUrls: ['./modal-episode.page.scss'],
})
export class ModalEpisodePage implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
