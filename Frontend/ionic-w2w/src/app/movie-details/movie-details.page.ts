import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { ListService } from '../core/list.service';
import { ModalProvidersPage } from '../modal-providers/modal-providers.page';
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
  runtime: any;
  certification: any = [];
  lists: any = [];
  images: any = [];
  isLoading: boolean = false;
  cont: Content = {
    id: 0,
    idContent: 0,
    title: '',
    cover: '',
    media_type: '',
  };
  id: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private movieService: MovieService,
    private contentService: ContentService,
    private router: Router,
    private action: ActionsService,
    private alertCtrl: AlertController,
    private listService: ListService,
    private modalCtrl: ModalController
  ) {}

  goBack() {
    this.action.goBack();
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.id);

    this.movieService.getDetailList('movie', this.id).subscribe((content) => {
      this.content = content;
      const hour = Math.trunc(content.runtime / 60);
      const minutes = content.runtime % 60;
      this.runtime = `${hour}h ${minutes}m`;
      console.log(this.content);
    });

    this.movieService.getImagesList('movie', this.id).subscribe((images) => {
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

  async showProviders() {
    const modal = await this.modalCtrl.create({
      component: ModalProvidersPage,
      cssClass: 'modal-providers',
      animated: true,
      swipeToClose: true,
      componentProps: {
        id: this.id,
      },
      breakpoints: [0, 0.4],
      initialBreakpoint: 0.4,
    });
    await modal.present();
  }

  addContent($event) {
    this.cont.idContent = this.content.id;
    this.cont.title = this.content.original_title;
    this.cont.cover = this.content.poster_path;
    this.cont.media_type = 'movie';
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

  addLike() {
    this.cont.idContent = this.content.id;
    this.cont.title = this.content.original_title;
    this.cont.cover = this.content.poster_path;
    this.cont.media_type = 'movie';
    console.log(this.content);

    this.contentService
      .createContent(this.cont, this.lists[0].id)
      .subscribe((data) => {
        //No hace este if. Muestra por cada lista la alerta.
        if (data.message.startsWith('ERROR:')) {
          this.onSaveComplete(data.message);
        }
      });
  }
}
