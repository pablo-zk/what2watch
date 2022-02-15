import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-modal-episode',
  templateUrl: './modal-episode.page.html',
  styleUrls: ['./modal-episode.page.scss'],
})
export class ModalEpisodePage implements OnInit {
  id;
  season;
  episode;
  content: any = [];

  constructor(
    private modalCtrl: ModalController,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    this.movieService
      .getEpisodes(this.id, this.season, this.episode)
      .subscribe((episode) => {
        this.content = episode;
        console.log(this.content);
      });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
