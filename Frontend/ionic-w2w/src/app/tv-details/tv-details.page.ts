import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
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
    private action: ActionsService,
    private alertCtrl: AlertController
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
        console.log(this.lists);
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
}
