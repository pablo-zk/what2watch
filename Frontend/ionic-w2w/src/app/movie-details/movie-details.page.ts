import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionsService } from '../services/actions.service';
import { ContentService } from '../services/content.service';
import { MovieService } from '../services/movie.service';
import { Content } from '../shared/content';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  errorMessage: string;
  content: any = [];
  images: any = [];
  isLoading: boolean = false;
  cont: Content = {
    id: 0,
    idContent: 0,
    title: '',
    cover: '',
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
    private contentService: ContentService,
    private router: Router,
    private action: ActionsService
  ) {}

  goBack() {
    this.action.goBack();
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(id);

    this.movieService.getDetailList('movie', id).subscribe((content) => {
      this.content = content;
      console.log(this.content);
    });

    this.movieService.getImagesList('movie', id).subscribe((images) => {
      this.images = images;
      this.isLoading = true;
      console.log(this.images);
    });
  }

  addContent() {
    this.cont.idContent = this.content.id;
    this.cont.title = this.content.original_title;
    this.cont.cover = this.content.poster_path;
    console.log(this.content);

    this.contentService.createContent(this.cont, "18").subscribe(
      (data) => this.onSaveComplete(),
      (error: any) => (this.errorMessage = <any>error)
    );
  }
  onSaveComplete(): void {
    this.router.navigate(['/']);
  }
}
