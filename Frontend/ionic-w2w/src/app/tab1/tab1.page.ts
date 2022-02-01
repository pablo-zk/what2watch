import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Content } from '../shared/content';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  movies: Content[] = [];
  movieId: Content;

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    centeredSlides: false,
    slidesPerView: 1.5,
    spaceBetween: 10,
    freeMode: false,
  };

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.movieService.getContent().subscribe((data: Content[]) => {
      this.movies = data;
    });

    this.movieService.getContentById(1).subscribe((data: Content) => {
      this.movieId = data;
    });
  }
}
