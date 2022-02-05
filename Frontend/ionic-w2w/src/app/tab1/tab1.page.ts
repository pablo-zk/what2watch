import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Content } from '../shared/content';
import SwiperCore, { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  trendingToday: any = [];
  trendingWeek: any = [];
  movieId: Content;

  /* modelType: 'movie';
  content: any = []; */

  swiperTrending: SwiperOptions = {
    slidesPerView: 2.2,
    spaceBetween: 8,
    speed: 200,
  };

  mainSwiper: SwiperOptions = {
    slidesPerView: 1.2,
    spaceBetween: 10,
    centeredSlides: true,
    grabCursor: true,
    speed: 300,
    effect: 'coverflow',
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

    this.movieService.getWeekTrendingList().subscribe((trendingWeek) => {
      this.trendingWeek = trendingWeek;
      console.log(trendingWeek);
    });

    this.movieService.getTodayTrendingList().subscribe((trendingToday) => {
      this.trendingToday = trendingToday;
      console.log(trendingToday);
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
