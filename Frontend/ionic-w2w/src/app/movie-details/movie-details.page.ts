import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ListService } from '../core/list.service';
import { ActionsService } from '../services/actions.service';
import { AuthService } from '../services/auth.service';
import { ContentService } from '../services/content.service';
import { MovieService } from '../services/movie.service';
import { Content } from '../shared/content';
import { List } from '../shared/list';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  errorMessage: string;
  content: any = [];
  lists: any = [];
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
    private authService: AuthService,
    private movieService: MovieService,
    private contentService: ContentService,
    private router: Router,
    private action: ActionsService,
    private alertCtrl: AlertController,
    private listService: ListService
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
    this.authService.getState().subscribe((data) => {
      if (data != 1) {
        //alert('Cuenta no validada');
        this.authService.logout();
        this.router.navigate(['login']);
      } else {
        this.listService.getLists().subscribe((data: List[]) => {
          this.lists = data[0];
        });
        console.log(this.lists);
      }
    });
  }

  addContent($event) {
    this.cont.idContent = this.content.id;
    this.cont.title = this.content.original_title;
    this.cont.cover = this.content.poster_path;
    console.log(this.content);
    $event.target.value.forEach((id) => {
      console.log('idList: ' + id);
      this.contentService.createContent(this.cont, id).subscribe((data) => {
        //No hace este if. Muestra por cada lista la alerta.
        if (data.message.startsWith('ERROR:')) {
          this.onSaveComplete(data.message);
        }
      });
    });
  }
  onSaveComplete(message): void {
    this.alertCtrl
      .create({
        header: message.startsWith('ERROR:') ? 'ERROR' : 'CORRECTO',
        message: message,
        buttons: ['OK'],
      })
      .then((res) => {
        res.present();
      });
    //Se mantiene en la página por si quiere quedarse mirando los actores o mas info.
    //this.router.navigate(['/tabs/tab3']);
  }
}
