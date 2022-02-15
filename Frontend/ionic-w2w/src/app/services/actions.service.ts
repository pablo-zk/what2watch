import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { SwiperOptions } from 'swiper';
import { ModalEpisodePage } from '../modal-episode/modal-episode.page';
import { ModalProvidersPage } from '../modal-providers/modal-providers.page';

@Injectable({
  providedIn: 'root',
})
export class ActionsService {
  constructor(
    private router: Router,
    private navCtrl: NavController,
    private modalCtrl: ModalController
  ) {}

  goDetails(content) {
    if (content.idContent == null) {
      this.router.navigate([`${content.media_type}/${content.id}`]);
    } else {
      this.router.navigate([`${content.media_type}/${content.idContent}`]);
    }
  }

  goBack() {
    this.navCtrl.back();
  }

  async showProviders(id) {
    const modal = await this.modalCtrl.create({
      component: ModalProvidersPage,
      cssClass: 'modal-providers',
      animated: true,
      swipeToClose: true,
      componentProps: {
        id: id,
      },
      breakpoints: [0, 0.4],
      initialBreakpoint: 0.4,
    });
    await modal.present();
  }

  async showEpisodeDetails(id, season, episode) {
    const modal = await this.modalCtrl.create({
      component: ModalEpisodePage,
      animated: true,
      swipeToClose: true,
      componentProps: {
        id: id,
        season: season,
        episode: episode,
      },
      breakpoints: [0, 0.4],
      initialBreakpoint: 0.4,
    });
    await modal.present();
  }
}
