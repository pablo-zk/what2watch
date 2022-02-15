import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-modal-providers',
  templateUrl: './modal-providers.page.html',
  styleUrls: ['./modal-providers.page.scss'],
})
export class ModalProvidersPage implements OnInit {
  id;
  content: any = [];

  constructor(
    private movieService: MovieService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    console.log(this.id);

    this.movieService
      .getWatchProviders('movie', this.id)
      .subscribe((content) => {
        this.content = content;
        console.log(this.content);
      });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
