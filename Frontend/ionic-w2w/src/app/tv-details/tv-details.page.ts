import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ListService } from '../core/list.service';
import { ActionsService } from '../services/actions.service';
import { AuthService } from '../services/auth.service';
import { ContentService } from '../services/content.service';
import { MovieService } from '../services/movie.service';
import { Content } from '../shared/content';
import { List } from '../shared/list';

@Component({
  selector: 'app-tv-details',
  templateUrl: './tv-details.page.html',
  styleUrls: ['./tv-details.page.scss'],
})
export class TvDetailsPage implements OnInit {
  errorMessage: string;
  lists: any = [];
  content: any = [];
  images: any = [];
  isLoading: boolean = false;
  // prueba: any[] = ["hola","adios"];

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
    private authService: AuthService,
    private contentService: ContentService,
    private router: Router,
    private listService: ListService,
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
    this.authService.getState().subscribe((data) => {
      if (data != 1) {
        //alert('Cuenta no validada');
        this.authService.logout();
        this.router.navigate(['login']);
      } else {
        this.listService.getLists().subscribe((data: List[]) => {
          this.lists = data[0];
        });
        console.log(this.lists)
      }
    });
  }
  cont: Content = {
    id: 0,
    idContent: 0,
    title: '',
    cover: '',
  };
  addContent($event) {
    this.cont.idContent = this.content.id;
    this.cont.title = this.content.name;
    this.cont.cover = this.content.poster_path;
    console.log(this.content);
    $event.target.value.forEach(id => {
      console.log(id)
      this.contentService.createContent(this.cont, id).subscribe(
        (data) => this.onSaveComplete(),
        (error: any) => (this.errorMessage = <any>error)
      );
    });
    
  }

  onSaveComplete(): void {
    this.router.navigate(['/']);
  }
}
