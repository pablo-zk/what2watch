import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  FormControlName,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ListService } from 'src/app/core/list.service';
import { List } from 'src/app/shared/list';
import { AlertController, NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { ContentService } from '../services/content.service';
import { ActionsService } from '../services/actions.service';

@Component({
  selector: 'app-list-edit',
  templateUrl: './list-edit.page.html',
  styleUrls: ['./list-edit.page.scss'],
})
export class ListEditPage implements OnInit {
  errorMessage: string = '';
  query: any = [];
  list: List = {
    id: 0,
    title: '',
    icon: '',
    films: '',
  };
  listId: number = 0;
  listTitle = '';

  constructor(
    private fb: FormBuilder,
    public navCtrl: NavController,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private authService: AuthService,
    private listService: ListService,
    private contentService: ContentService,
    private alertCtrl: AlertController,
    private router: Router,
    private action: ActionsService
  ) {}

  goBack() {
    this.action.goBack();
  }

  goDetails(content) {
    this.action.goDetails(content);
  }

  ngOnInit() {
    this.authService.getState().subscribe((data) => {
      if (data != 1) {
        alert('Cuenta no validada');
        this.authService.logout();
        this.route.navigate(['login']);
      }
    });
    this.listId = parseInt(this.activatedRoute.snapshot.params['id']);
    this.listService.getListById(this.listId).subscribe((data) => {
      this.list = data[0];
    });
    this.listTitle = this.list.title;
    this.contentService.getContentByList(this.listId).subscribe((data: any) => {
      data[0].forEach((movie) => {
        this.query.push(movie);
      });
    });
  }

  saveList() {
    this.list.id = this.listId;
    this.list.title = this.listTitle;
    this.list.films = '';
    if (this.list.title == '') {
      this.showAlert('ERROR. El nombre de la lista no puede estar vacio');
    }
    this.listService.updateList(this.list).subscribe((data) => {
      if (data.message.startsWith('ERROR')) {
        this.list.title = '';
        this.showAlert(data.message);
      } else {
        this.router.navigateByUrl('/tabs/tab-user');
      }
    });
  }

  deleteContent(idCon) {
    console.log(idCon);
    this.contentService.deleteContentOfList(idCon).subscribe(
      () => this.doRefresh(event),
      (error: any) => (this.errorMessage = <any>error)
    );
  }

  doRefresh(event) {
    console.log('Comienzo de refresh');

    this.query = [];
    this.contentService.getContentByList(this.listId).subscribe((data: any) => {
      data[0].forEach((movie) => {
        this.query.push(movie);
      });
    });

    setTimeout(() => {
      console.log('refresh terminado');
      // event.target.complete();
    }, 1000);
  }

  showAlert(message): void {
    this.alertCtrl
      .create({
        header: message.startsWith('ERROR') ? 'ERROR' : 'CORRECTO',
        message: message,
        buttons: ['OK'],
      })
      .then((res) => {
        res.present();
      });
    // this.route.navigate(['/tabs/tab-user']);
  }
}
