import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ActionsService } from '../services/actions.service';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-tv-details',
  templateUrl: './tv-details.page.html',
  styleUrls: ['./tv-details.page.scss'],
})
export class TvDetailsPage implements OnInit {
  content: any = [];
  images: any = [];
  isLoading: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
    private action: ActionsService
  ) {}

  goBack() {
    this.action.goBack();
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(id);

    this.movieService.getDetailList('tv', id).subscribe((content) => {
      this.content = content;
      console.log(this.content);
    });

    this.movieService.getImagesList('tv', id).subscribe((images) => {
      this.images = images;
      this.isLoading = true;
      console.log(this.images);
    });
  }
}
