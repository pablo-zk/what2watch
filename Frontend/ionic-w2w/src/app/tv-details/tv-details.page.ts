import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { SwiperOptions, FreeMode, Swiper } from 'swiper';
import { ListService } from '../core/list.service';
import { ActionsService } from '../services/actions.service';
import { AuthService } from '../services/auth.service';
import { ContentService } from '../services/content.service';
import { MovieService } from '../services/movie.service';
import { Content } from '../shared/content';
import { List } from '../shared/list';
Swiper.use([FreeMode]);

@Component({
  selector: 'app-tv-details',
  templateUrl: './tv-details.page.html',
  styleUrls: ['./tv-details.page.scss'],
})
export class TvDetailsPage implements OnInit {
  errorMessage: string;
  contL: Content = {
    id: 0,
    idContent: 0,
    title: '',
    cover: '',
    media_type: '',
  };
  lists: any = [];
  content: any = [];
  images: any = [];
  episodes: any = [];
  seasons: any = [];
  credits: any = [];
  recommendations: 
  isLoading: boolean = false;
  cont: Content = {
    id: 0,
    idContent: 0,
    title: '',
    cover: '',
    media_type: '',
  };
  id: any;
  truncating = true;
  segmentValue: number = 1;
  segmentChange: boolean = false;
  like: boolean = false;

  swiperCast: SwiperOptions = {
    slidesPerView: 2.2,
    spaceBetween: 8,
    speed: 200,
    freeMode: {
      enabled: true,
      sticky: true,
      minimumVelocity: 0.03,
      momentumVelocityRatio: 0.7,
    },
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
    private authService: AuthService,
    private contentService: ContentService,
    private router: Router,
    private listService: ListService,
    private action: ActionsService,
    private alertCtrl: AlertController
  ) {}

  goBack() {
    this.action.goBack();
  }

  showEpisodeDetails(id, season, episode) {
    this.action.showEpisodeDetails(id, season, episode);
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.id);

    this.movieService.getDetailList('tv', this.id).subscribe((content) => {
      this.content = content;
      console.log(this.content);
    });

    this.movieService.getImagesList('tv', this.id).subscribe((images) => {
      this.images = images;
      this.isLoading = true;
      console.log(this.images);
    });

    this.getSeasons();

    this.authService.getState().subscribe((data) => {
      if (data != 1) {
        //alert('Cuenta no validada');
        this.authService.logout();
        this.router.navigate(['login']);
      } else {
        this.listService.getLists().subscribe((data: List[]) => {
          this.lists = data[0];
          this.contentService
            .getContentByList(this.lists[0].id)
            .subscribe((data: any) => {
              data[0].forEach((movie) => {
                if (movie.idContent == this.content.id) {
                  this.like = true;
                  this.cont.id = movie.id;
                }
              });
            });
        });
        console.log(this.lists);
      }
    });

    this.movieService.getCredits('tv', this.id).subscribe((credit) => {
      this.credits = credit;
      console.log(this.credits);
    });
  }

  showProviders() {
    this.action.showProviders(this.id);
  }

  getSeasons() {
    this.movieService
      .getSeasons(this.id, this.segmentValue)
      .subscribe((season) => {
        this.seasons = season;
        console.log(this.seasons);
      });
  }

  addContent($event) {
    this.cont.idContent = this.content.id;
    this.cont.title = this.content.name;
    this.cont.cover = this.content.poster_path;
    this.cont.media_type = 'tv';
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
    if (this.like == false) {
      this.cont.idContent = this.content.id;
      this.cont.title = this.content.name;
      this.cont.cover = this.content.poster_path;
      this.cont.media_type = 'tv';
      console.log(this.content);

      this.contentService
        .createContent(this.cont, this.lists[0].id)
        .subscribe((data) => {
          //No hace este if. Muestra por cada lista la alerta.
          if (data.message.startsWith('ERROR:')) {
            this.onSaveComplete(data.message);
          }
          this.doRefresh(event);
        });
      this.like = true;
    } else {
      this.contentService
        .deleteContentOfList(this.cont.id)
        .subscribe((data) => {
          console.log(data);
          this.doRefresh(event);
        });
      this.like = false;
    }
  }

  doRefresh(event) {
    console.log('Comienzo de refresh');

    this.listService.getLists().subscribe((data: List[]) => {
      this.lists = data[0];
      this.contentService
        .getContentByList(this.lists[0].id)
        .subscribe((data: any) => {
          data[0].forEach((movie) => {
            if (movie.idContent == this.content.id) {
              this.like = true;
              this.cont.id = movie.id;
            }
          });
        });
    });

    setTimeout(() => {
      console.log('refresh terminado');
    }, 1000);
  }

  //Para mostrarlo por defecto seleccionado. Creo que con el compareWith algo se puede hacer.
  // alreadyInList(list: List): boolean {
  //   let contents = [];
  //   this.contentService.getContentByList(list.id).subscribe((data) => {
  //     contents.push(data);
  //   });
  //   contents.forEach((element) => {
  //     if (element.idContent == this.cont.idContent) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   });

  //   return false;
  // }

  segmentChanged(e) {
    this.segmentChange = true;
    this.segmentValue = e.detail.value;
    this.getSeasons();
  }
}
