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
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { ContentService } from '../services/content.service';

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
    private contentService: ContentService
  ) {}

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

    this.listService.updateList(this.list).subscribe(
      () => this.onSaveComplete(),
      (error: any) => (this.errorMessage = <any>error)
    );
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

  onSaveComplete(): void {
    this.route.navigate(['./']);
  }
}
