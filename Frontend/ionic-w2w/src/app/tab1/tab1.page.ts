import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Content } from '../shared/content';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  movies: any = [];
  movieId: Content;

  /* modelType: 'movie';
  content: any = []; */

  slideOpts = {
    initialSlide: 0,
    speed: 200,
    slidesPerView: 1.5,
    spaceBetween: 8,
  };

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    /* this.initializeSliderContainer(); */

    /* this.movieService.getContent().subscribe((data: Content[]) => {
      this.movies = data;
    }); */

    /* this.movieService.getContentById(1).subscribe((data: Content) => {
      this.movieId = data;
    }); */
    this.movieService.getTrendingList().subscribe((data) => {
      this.movies = data;
      console.log(data);
    });
  }

  /* initializeSliderContainer() {
    this.movieService
      .getTrendingList(this.modelType)
      .subscribe((trendingMovies) => {
        trendingMovies.results.forEach((element) => {
          this.content.push({
            id: trendingMovies.id,
            title: trendingMovies.title,
            image: trendingMovies.image,
            modelItem: trendingMovies,
          });
        });
      });
  } */
}
