import { Component } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Content } from '../shared/content';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  movies: Content[] = [];
  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.movieService.getContent().subscribe((data: Content[]) => {
      this.movies = data;
    });
    console.log(this.movies);
  }
}
