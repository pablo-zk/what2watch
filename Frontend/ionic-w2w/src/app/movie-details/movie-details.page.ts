import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
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
  credits: any = [];
  recommendations: any = [];
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
  truncating = true;
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
    breakpoints: {
      640: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
      1366: {
        slidesPerView: 6,
        spaceBetween: 10,
      },
    },
  };

  swiperRecommendations: SwiperOptions = {
    slidesPerView: 2.2,
    spaceBetween: 8,
    speed: 200,
    freeMode: {
      enabled: true,
      sticky: true,
      minimumVelocity: 0.03,
      momentumVelocityRatio: 0.7,
    },
    breakpoints: {
      640: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
      1366: {
        slidesPerView: 6,
        spaceBetween: 10,
      },
    },
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

  goDetails(content) {
    this.action.goDetails(content);
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

    this.movieService.getCredits('movie', this.id).subscribe((credit) => {
      this.credits = credit;
      console.log(this.credits);
    });

    this.movieService
      .getRecommendations('movie', this.id)
      .subscribe((recommendation) => {
        this.recommendations = recommendation;
        console.log(this.recommendations);
      });

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
  }

  showProviders() {
    this.action.showProviders(this.id);
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
    if (this.like == false) {
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
}
